const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const products = require('./routes/products.route');
const storeUserController = require("./controllers/storeUser.controller");
const cookieSession = require("cookie-session");

const db = require("./models");
const Role = db.role;

const PORT = 5000;
const app = express();

//.env
require('dotenv').config()
const url = process.env.MONGODB_CONNECT_URL

//เป็นการกำหนด Promise library ที่ Mongoose จะใช้เป็น global.Promise เป็น Promise library เริ่มต้น Node.js
//จะใช้ในการจัดการกับ Promise ในการเรียกใช้ database จาก MongoDB ใน Node.js โดยสามารถใช้กับ Mongoose ได้เลย 
//เพื่อให้ mongoose ใช้ promise ที่ตรงกับเวอร์ชั่นของ Node.js ที่กำลังทำงานอยู่ และรับค่า Promise จาก global scope
mongoose.Promise = global.Promise;

//การ connect กับ MongoDB โดยใช้ Mongoose ซึ่งเป็น ODM(Object Data Modeling)
//กำหนด useNewUrlParser และ useUnifiedTopology ให้เป็น true ซึ่งเป็น options ที่ใช้เพื่อกำหนดการเชื่อมต่อและการทำงานของ MongoDB 
//ขณะที่ใช้ Mongoose ใน Node.js ช่วยให้การเชื่อมต่อกับ MongoDB รวดเร็วและมีประสิทธิภาพสูง
mongoose.connect(url, {
    dbName: 'product',
    //เป็นตัวบอกให้ Mongoose ใช้ URI ของ MongoDB ในรูปแบบ URL ในการเชื่อมต่อ แทนการใช้รูปแบบเดิมของการเชื่อมต่อ URI
    useNewUrlParser: true,
    //เป็นตัวบอกให้ Mongoose ใช้การเชื่อมต่อ MongoDB แบบ Unified Topology
    //ช่วยให้ Mongoose ใช้การเชื่อมต่อที่เป็นเวอร์ชันล่าสุดและแนะนำใน MongoDB, ซึ่งมีประสิทธิภาพและความเสถียรมากขึ้น
    useUnifiedTopology: true,
})  
    //เมื่อเชื่อมต่อสำเร็จ จะทำการ log ว่า Successfully connect to MongoDB. และเรียกใช้ฟังก์ชัน initial เพื่อเริ่มต้นการตรวจสอบและสร้าง roles เริ่มต้น
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    //ถ้ามี error ในการเชื่อมต่อ จะทำการ log ว่า Connection error และจบกระบวนการด้วย process.exit
    .catch((error) => {
        console.log("Connection error", error)
        process.exit(); //เป็น method ใน Node.js ที่ใช้ในการสิ้นสุดการทำงาน
    })

//ฟังก์ชัน initial ช่วยให้เราสร้างข้อมูล 3 อย่างใน roles คือ user, moderator, admin
function initial() {
    //การใช้งาน estimatedDocumentCount() ไม่ต้องรับพารามิเตอร์เป็น callback function อีกต่อไป ในเวอร์ชั่นล่าสุดของ Mongoose แต่จะส่งค่าเป็น promise ออกมาแทน
    //เป็นการจำนวน Document ใน Role โดยใช้ Mongoose method estimatedDocumentCount() จะถูกใช้ในการตรวจสอบว่า Role มีข้อมูลหรือไม่
    Role.estimatedDocumentCount() 
        //เริ่มต้น Promise แล้วรับ count จากขั้นตอนก่อนหน้า
        .then((count) => {
            //ถ้าจำนวน roles เท่ากับ 0 หรือไม่มีข้อมูลของ roles เลย ฟังก์ชันจะทำการสร้าง roles เริ่มต้นใหม่ 
            if (count === 0) {
                //สร้างตัวแปร rolesToCreate เป็นอาเรย์ที่มีค่าเป็น roles ที่ต้องการสร้างเริ่มต้น
                const rolesToCreate = ["user", "moderator", "admin"]; 
                //สร้างตัวแปร rolePromises เป็นอาเรย์โดยใช้ map เพื่อสร้าง Promises สำหรับการสร้างแต่ละ roles
                const rolePromises = rolesToCreate.map((roleName) => {
                    //สร้างและบันทึก roles ใหม่โดยใช้ new Role({ name: roleName }).save() และส่ง promise กลับ
                    return new Role({ name: roleName }).save()
                        //เมื่อทำการบันทึก roles สำเร็จ จะ log ว่า added ... to roles collection
                        .then(() => {
                            console.log(`added '${roleName}' to roles collection`);
                        })
                        //ถ้ามี error ในการบันทึก roles จะ log ว่า "error", err
                        .catch((err) => {
                            console.log("error", err);
                        });
                });
                //จะส่งอาเรย์ Promise สำหรับการสร้าง roles ทั้งหมด เพื่อรอให้ promise เสร็จ
                return Promise.all(rolePromises);
            }
        })
        //เมื่อสร้าง roles เริ่มต้นสำเร็จ จะ log ว่า Roles initialization completed.
        .then(() => {
            console.log("Roles initialization completed.");
        })
        //ถ้ามี error ในขั้นตอนการเริ่มต้นของ roles จะ log ว่า Error during roles initialization และ error
        .catch((error) => {
            console.log("Error during roles initialization", error);
        });
}

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1>Hello Wellcome To Mini Project</h1>')
});

//cookieSession ช่วยในการจัดเก็บข้อมูลเซสชันบนไคลเอนต์ภายในคุกกี้โดยไม่ต้องใช้ฐานข้อมูล
app.use(
    cookieSession({
        name: "niti-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
    })
);

//Routes
app.use('/products', products)
require('./routes/auth.route')(app);

app.listen(PORT, () => {
    console.log("Server is runing on http://localhost:" + PORT);
});

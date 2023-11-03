const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const products = require('./routes/products.route');
const storeUserController = require("./controllers/storeUser.controller");
const Role = db.role;

const PORT = 5000;
const app = express();

//.env
require('dotenv').config()
const url = process.env.MONGODB_CONNECT_URL

//เป็นการใช้ mongoose กับ NodePromise 
//Node Promise เป็น native ที่ให้มา
mongoose.Promise = global.Promise;

//connect กำหนด useNewUrlParser และ useUnifiedTopology ให้เป็น true
//เป็น options ที่ใช้เพื่อกำหนดการเชื่อมต่อและการทำงานของ MongoDB ขณะที่ใช้ Mongoose ใน Node.js ช่วยให้การเชื่อมต่อกับ MongoDB รวดเร็วและมีประสิทธิภาพสูง
mongoose.connect(url, {
    dbName: 'product',
    //เป็นตัวบอกให้ Mongoose ใช้ URI ของ MongoDB ในรูปแบบ URL ในการเชื่อมต่อ แทนการใช้รูปแบบเดิมของการเชื่อมต่อ URI
    useNewUrlParser: true, 
    //เป็นตัวบอกให้ Mongoose ใช้การเชื่อมต่อ MongoDB แบบ Unified Topology
    //ช่วยให้ Mongoose ใช้การเชื่อมต่อที่เป็นเวอร์ชันล่าสุดและแนะนำใน MongoDB, ซึ่งมีประสิทธิภาพและความเสถียรมากขึ้น
    useUnifiedTopology: true              
})
    .then(() => console.log('Connection to MongoDB Successfully!'))
    .catch((error) => console.log(error))

//ฟังก์ชัน initial ช่วยให้เราสร้างข้อมูล 3 อย่างใน roles คือ user, moderator, admin
function initial() {
    //ฟังก์ชัน estimatedDocumentCount คือฟังก์ชันของ Mongoose ที่ใช้เพื่อคำนวณ DocumentCountในคอลเลกชัน และคืนค่านั้นผ่าน callback function
    //แต่ละบทบาทที่ถูกสร้าง จะเรียกฟังก์ชัน save โดยผ่าน callback function
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
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
app.post('/user/register', storeUserController)

app.listen(PORT, () => {
    console.log("Server is runing on http://localhost:" + PORT);
});

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//Check username และ email มีการใช้ async/await
checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        //Check Username เพื่อตรวจสอบว่ามีผู้ใช้ที่มีชื่อผู้ใช้หรือยัง ผ่านฟังก์ชัน findOne ที่ถูกส่งมาใน username: req.body.username
        const user = await User.findOne({ username: req.body.username });
        //ถ้ามี user ที่ถูกใช้แล้ว ฟังก์ชันนี้จะส่ง response status 400(Bad Request) และส่ง message ว่า Failed! Username is already in use!
        if (user) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }
        //Check Email เพื่อตรวจสอบว่า email นั้นมีอยู่แล้วในระบบหรือไม่ ผ่านฟังก์ชัน findOne ที่ถูกส่งมาใน email: req.body.email
        await User.findOne({ email: req.body.email });
        //ถ้ามี email ที่ถูกใช้แล้ว ฟังก์ชันนี้จะส่ง response status 400(Bad Request) และส่ง message ว่า Failed! Email is already in use!
        if (user) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }
        //ถ้าไม่มีข้อมูลที่ซ้ำกันใน database จะทำขั้นตอนถัดไป
        next();
    } 
    //ถ้าเกิด error ระหว่างการค้นหาหรือการทำงานของฟังก์ชัน จะส่ง response status 500 และส่ง message: err
    catch (err) {
        res.status(500).send({ message: err });
    }
};

//Check Roles เพื่อตรวจสอบความถูกต้องของ Role 
checkRolesExisted = (req, res, next) => {
    //ตรวจวสอบว่า req.body.roles มีค่าส่งมาหรือไม่
    //ถ้ามีค่าส่งมาจาก req.body.roles จะทำการตรวจสอบความถูกต้องของ roles
    if (req.body.roles) {
        //สร้างตัวแปร invalidRoles เพื่อเก็บค่าของ roles ที่ไม่ถูกต้อง โดยใช้ Array.filter() เพื่อกรอง roles ที่ไม่มีอยู่ใน ROLES ที่กำหนดไว้
        const invalidRoles = req.body.roles.filter(role => !ROLES.includes(role));
        //ตรวจสอบว่าถ้ามี roles ที่ไม่ถูกต้องใน invalidRoles มากกว่า 0 
        if (invalidRoles.length > 0) {
            //จะ return ค่า response status 400(Bad Request) และส่ง message ว่า Failed! Roles ..... do not exist!
            return res.status(400).send({
                message: `Failed! Roles [${invalidRoles.join(', ')}] do not exist!`
            });
        }
    }
    //ถ้า roles ที่ถูกส่งมาถูกต้อง จะทำขั้นตอนถัดไป
    next();
};
//สร้าง Obj ชื่อ verifySignUp และมี 2 ฟังก์ชันที่ใช้ในการตรวจสอบความถูกต้องของข้อมูลที่ถูกส่งมา
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
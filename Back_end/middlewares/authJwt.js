const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

//verifyToken เพื่อตรวจสอบความถูกต้องของโทเคน โดยใช้ JSON Web Token (JWT)
verifyToken = (req, res, next) => {
    let token = req.session.token; //กำหนดตัวแปร token ให้เท่ากับค่าที่ถูกจัดเก็บใน req.session.token คือโทเคนที่ถูกส่งมาในคำข้อความคำขอผ่าน session 
    //ถ้าไม่มี token ถูกส่งมาในคำขอ(ค่า token เป็น undefined) ฟังก์ชันจะส่ง message ว่า No token provided! และ status 403 (Forbidden)
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    //ถ้ามี token ถูกส่งมา ฟังก์ชันนี้จะใช้โมดูล jsonwedtoken(jwt) เพื่อตรวจสอบความถูกต้องของ token 
    //ฟังก์ชัน verify จะรับพารามิเตอร์ 3 ตัว คือ token, secret, callback function ที่จะถูกเรียกเมื่อตรวจสอบเสร็จ
    jwt.verify(token,
        config.secret,
        //ฟังก์ชันนี้จะถูกเรียกเมื่อตรวจสอบ token ไม่สำเร็จในกรณีที่ token ไม่ถูกต้องหรือหมดอายุ 
        //ฟังก์ชันจะส่ง message ว่า Unauthorized! และ status 401 (Unauthorized)
        (err, decoded) => { 
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            //เมื่อ token ถูกตรวจสอบและถูกต้อง ข้อมูลของ user ที่เก็บใน token จะถูก decoded และเก็บใน req.userId เพื่อใช้ในการตรวจสอบสิทธิ์ในการเข้าถึง
            req.userId = decoded.id;
            next();
        });
};

//isAdmin เป็นฟังก์ชัน middleware เพื่อตรวจสอบว่า user ที่ส่ง request มี role เป็น admin หรือไม่ เพื่อตรวจสอบสิทธิ๋ในการเข้าถึง
isAdmin = (req, res, next) => {
    //ฟังก์ชันนี้จะค้นหาและดึงข้อมูล user โดยจะใช้ findById โดยส่ง req.userId ที่ถูกจัดเก็บใน request
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //เมื่อค้นหาผู้ใช้สำเร็จ ฟังก์ชันนี้จะค้นหา Role ของ user โดยใช้ _id ที่อยู่ใน user.roles
        Role.find( 
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                //for loop จะเริ่มที่ i = 0 และลูปไปเรื่อยๆจนกว่า i จะน้อยกว่า roles.length
                //ในแต่ละรอบจะตรวจสอบว่า roles[i].name เท่ากับ admin หรือไม่ ถ้าเป็นจริง คือเจอ role ของ admin และ เรียก next() เพื่อเรียกใช้ middleware ถัดไป
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                //ถ้าเป็นเท็จ คือไม่เจอ role ของ admin ฟังก์ชันจะส่ง response status 403(Forbidden) และ message ว่า Require Admin Role!
                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            }
        );
    });
};

//สร้าง Obj ชื่อ authJwt และมี 3 ฟังก์ชัน middleware เพื่อตรวจสอบสิทธิ์ของ user ที่ส่ง request
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};
module.exports = authJwt;
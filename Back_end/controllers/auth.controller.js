const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

//เป็นการ import ไลบรารี 2 ตัว
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//signup สร้าง user ใหม่ในฐานข้อมูล MongoDB (role คือ user หากไม่ได้ระบุ role)
exports.signup = (req, res) => {
  //สร้าง Obj user เพื่อจัดเก็บข้อมูลของ user ใหม่
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    //.save เป็น method ของ mongoose จะตรวจสอบว่าการบันทึกสำเร็จหรือไม่ 
    user.save()
    //เป็นการใช้ then เพื่อจัดการกับ promise 
    //then จะถูกใช้เพื่อระบุฟังก์ชันที่จะทำงานเมื่อ Promise สิ้นสุด 
    .then(() => {
      //ตรวจสอบว่ามีข้อมูล roles ส่งมาหรือไม่
      //ถ้ามีข้อมูล roles ที่ส่งมาจาก req.body.roles
      if (req.body.roles) {
        //ถ้ามีข้อมูล roles ส่งมาจะใช้ method ของ mongoose เพื่อค้นหา roles ที่ตรงกับข้อมูลที่ส่งมา โดยจะใช้ Role.find
        Role.find({
          //เพื่อค้นหา name ของ role ที่มีค่าตรงกับค่าที่ถูกส่งมาใน req.body.roles
          name: { $in: req.body.roles },
        })
          .then((roles) => {
            //ถ้าค้นหาสำเร็จ จะการกำหนดค่าให้กับฟิลด์ roles ของ Obj user โดยใช้ค่าจาก Obj Roles ที่ถูกค้นหามาจาก database 
            //ใช้ method .map เพื่อสร้างรายใหม่ที่มีค่าเป็น id ของแต่ละ roles โดยนำ role._id มาใส่ในรายการใหม่ 
            //เพื่อแปลง role._id จาก Obj ที่ค้นหามาเป็นรายการของ id ที่จะถูกเก็บไวในฟิลด์ roles ของ user
            user.roles = roles.map((role) => role._id);
             //หลังจากกำหนด roles ให้ user สำเร็จ จะทำการบันทึกข้อมูล user ลงใน database โดยใช้ method .save ของ mongoose
            return user.save();
          })
          //หลังจากที่กำหนด roles ให้กับ user สำเร็จจะส่ง response message ว่า User was registered successfully!
          .then(() => {
            res.send({ message: "User was registered successfully!" });
          })
          //ถ้าที error ระหว่างการบันทึกหรือการกำหนด roles จะส่ง response status 500(Internal Server Error) และส่ง message: err
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      } 
      //ถ้าไม่มีข้อมูล roles ส่งมาจะกำหนดให้ role เป็น user และบันทึกลง database
      else {
        //ค้นหา roles ที่มีชื่อ user จาก database 
        Role.findOne({ name: "user" })
          .then((role) => {
            //ถ้าค้นหา roles สำเร็จ จะกำหนดให้เป็น user โดยใช้ role._id ที่เป็นอาเรย์ที่มี id เดียว
            user.roles = [role._id];
            //จะส่งคืน Promise ที่จะเริ่มการบันทึกข้อมูลลงใน database 
            return user.save();
          })
          //หลังจากที่ทำการกำหนด roles ให้เป็น user เสร็จ จะส่ง response message ว่า User was registered successfully!
          .then(() => {
            res.send({ message: "User was registered successfully!" });
          })
          //ถ้าที error ระหว่างการบันทึกหรือการกำหนด roles จะส่ง response status 500(Internal Server Error) และส่ง message: err
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      }
    })
    //ถ้าที error ระหว่างการตรวจสอบข้อมูลของ roles จะส่ง response status 500(Internal Server Error) และส่ง message: err
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}
//signin ค้นหา username ของ req ในฐานข้อมูล, 
//เปรียบเทียบ password ด้วย password ในฐานข้อมูลที่ใช้ bcrypt ,สร้างโทเค็นโดยใช้ jsonwebtoken, ส่งคืนข้อมูลผู้ใช้และเข้าถึงโทเค็น
exports.signin = (req, res) => {
    //ค้นหา username ใน database โดยใช้ username ที่ส่งมาจาก req.body.username และเก็บไว้ในตัวแปร user 
    User.findOne({
      username: req.body.username,
    })
      //.populate ใน MongoDB หรือ mongoose (เป็น ORM สำหรับ MongoDB สำหรับ Node.Js) ใช้สำหรับการเติมข้อมูลที่เป็น reference
      //.populate คือคำสั่งที่เกี่ยวกับการจับคู่ข้อมูล (join data) ใน MongoDB
    .populate("roles", "-__v") // ใช้เพื่อโหลดข้อมูล roles ที่เกี่ยวข้องกับ user จาก database, -__v ใช้เพื่อไม่รวมฟิลด์ -__v ในการแสดงผล
    //จะใช้ then และ catch สำหรับ promise 
    //then จะถูกใช้เพื่อระบุฟังก์ชันที่จะทำงานเมื่อ Promise สิ้นสุด 
    .then((user) => {
      //ถ้าไม่มี user จะส่ง return ค่า response status 404(Not Found) และส่ง message ว่า User Not found.
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      //bcrypt.compareSync เป็นฟังก์ชันที่ใช้สำหรับการเปรียบเทียบรหัสผ่านที่ user ส่งเข้ามากับที่เก็บใน database โดยการใช้การเข้ารหัสแบบ bcrypt
      //ในที่นี้จะใช้เพื่อตรวจสอบความถูกต้องของรหัสผ่านที่ถูกส่งมาใน req.body.password กับ user.password 
      //ถ้ารหัสผ่านถูกต้อง ค่า passwordIsValid จะเป็น true
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      //ถ้ารหัสผ่านไม่ถูกต้องค่า passwordIsValid จะเป็น false 
      //จะส่ง return ค่า response status 401(Unauthorized) และส่ง message ว่า Invalid Password!.
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      //เมื่อรหัสผ่านถูกต้อง จะทำการสร้าง token โดยใช้ jwt.sign เพื่อสร้าง JWT Token 
      const token = jwt.sign({ id: user.id }, //id: user.id คือข้อมูลที่ต้องการจะเก็บไว้ใน JWT token 
        config.secret, //config.secret คือ secret key ใช้ในการ sign JWT token และยืนยันความถูกต้องของ JWT token
        {
        algorithm: 'HS256', //ระบุอัลกอริทึมที่ใช้ในการเข้ารหัส JWT token ในส่วนนี้จะใช้ HS256 เป็นอัลกอริทึม HMAC SHA-256
        allowInsecureKeySizes: true, //เพื่ออนุญาติให้ใช้ขนาดคีย์ไม่ปลอดภัย 
        expiresIn: config.jwtExpiration, // ระยะเวลาของ JWT token จะใช้งาน (expires) จากค่าที่อยู่ใน config.jwtExpiration
        });
      //สร้าง authorities ให้เป็นอาเรย์ โดยใช้ .map() และ .toUpperCase() เพื่อเปลี่ยนชื่อ roles ให้เป็นตัวใหญ่และเพิ่มคำว่า ROLE_ นำหน้าชื่อ roles
      const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());
      //เก็บ token ที่ถูกสร้างไว้ใน session เพื่อใช้ในการระบุตัวตนของ user ในระบบ
      req.session.token = token;
      //ถ้า user เข้าสู่ระบบสำเร็จและไม่มี error จะส่ง response srarus 200(OK) และส่งข้อมูลของ user 
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    })
    //ถ้ามีข้อผิดพลาดในบล็อค .then จะเข้าบล็อค .cath ทันที และจะส่ง response status 500(Internal Server Error) และส่ง message: err
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

//signout ล้างเซสชันปัจจุบัน
exports.signout = async (req, res) => {
    try {
        //เป็นการลบหรือรีเซต session ของ user ที่อยู่ใน request จะทำให้ user ออกจากระบบ โดยทำให้ข้อมูล session ถูกลบทิ้งทำให้ค่าเป็น null
        req.session = null;
        //เมื่อ session ถูกลบสำเร็จ ฟังก์ชันจะส่ง response status 200(OK) และะส่ง message ว่า You've been signed out!
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err); //เพื่อส่ง err ไปให้ midleware ถัดไป
    }
};
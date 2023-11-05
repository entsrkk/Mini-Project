const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

//สร้างตัวแปร UserSchema ที่ใช้ mongoose.Schema เป็น constructor ของ Mongoose เพื่อระบุโครงสร้างของข้อมูล User.
const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      //กำหนดฟิลด์ roles ใช้เพื่อเก็บข้อมูลบทบาทในรูปแบบของอาร์เรย์ ที่มี type เป็น ObjectId โดยใช้ mongoose.Schema.Types.ObjectId
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,//ObjectId เป็นประเภทข้อมูลที่ใช้ใน MongoDB เพื่ออ้างอิงไปยัง documents ในคอลเลกชันอื่น ๆ
          ref: "Role" //ref เป็นการระบุให้ Mongoose รู้ว่าการเชื่อมต่อไปยัง "Role" เป็นการเชื่อมต่อระหว่าง User และ Role
        }
      ]
    })
  );

// เป็น hash ก่อนที่จะบันทึกข้อมูล
// pre คือ middleware ที่ถูกกำหนดเพื่อทำงานก่อนการบันทึกข้อมูล เป็น method ของ Mongoose ใช้ในการกำหนด middleware สำหรับ model ของ MongoDB
// User.pre('save', function (next) {
//     const user = this //this จะอ้างอิงถึง Obj UserSchema
//     //ดึง bcrypt ใช้ method hash จะใช้ hash กับ password
//     bcrypt.hash(user.password, 10) //ใช้ฟังก์ชัน hash ของ bcrypt เพื่อเข้ารหัสที่เก็บไว้ในตัวแปร user.password จำนวน 10 ที่ส่งฟังก์ชัน hash คือความซับซ้อนของการเข้ารหัส
//     .then(hash =>{
//         user.password = hash //กำหนดค่า user.password ให้เป็นค่าที่ถูก hash
//         next()
//     }).catch(error =>{
//         console.error(error);
//     })
// })

module.exports = User
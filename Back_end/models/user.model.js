const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

//สร้างตัวแปร UserSchema ที่ใช้ mongoose.Schema เป็น constructor ของ Mongoose เพื่อระบุโครงสร้างของข้อมูล User.
const UserSchema = new mongoose.Schema({
    username :{
        type: String,
        require: true
    },
    email :{
        type: String,
        require: true
    },
    password :{
        type: String,
        require: true
    },
    //กำหนดฟิลด์ roles ใช้เพื่อเก็บข้อมูลบทบาทในรูปแบบของอาร์เรย์ ที่มี type เป็น ObjectId โดยใช้ mongoose.Schema.Types.ObjectId
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId, //ObjectId เป็นประเภทข้อมูลที่ใช้ใน MongoDB เพื่ออ้างอิงไปยัง documents ในคอลเลกชันอื่น ๆ
          ref: "Role" //ref เป็นการระบุให้ Mongoose รู้ว่าการเชื่อมต่อไปยัง "Role" เป็นการเชื่อมต่อระหว่าง User และ Role
        }
      ]
})

//เป็นการเข้ารหัสก่อนที่จะบันทึกข้อมูล
//pre คือ middleware ที่ถูกกำหนดเพื่อทำงานก่อนการบันทึกข้อมูล เป็น method ของ Mongoose ใช้ในการกำหนด middleware สำหรับ model ของ MongoDB
UserSchema.pre('save', function (next) {
    const user = this //this จะอ้างอิงถึง Obj UserSchema
    bcrypt.hash(user.password, 10) //ดึง bcrypt ใช้ method hash จะใช้ hash กับ password
    .then(hash =>{
        user.password = hash
        next()
    }).catch(error =>{
        console.error(error);
    })
})
//สร้าง model User โดยใช้ mongoose.model และส่งข้อมูล UserSchema มา
const User = mongoose.model('User' ,UserSchema)
module.exports = User
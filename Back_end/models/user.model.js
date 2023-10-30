const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema ({
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
    role:{
        type: String,
        default:'user'
    }
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
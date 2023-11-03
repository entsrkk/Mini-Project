const mongoose = require('mongoose');

//ตั้งค่า Promise ใน Mongoose เพื่อใช้กับ JavaScript's global Promise implementation
mongoose.Promise = global.Promise;

//สร้าง Obj ชื่อ db เพื่อเก็บข้อมูลและโมดูลที่เกี่ยวข้องกับการเชื่อมต่อ MongoDB
const db = {};

//เป็นการเก็บการเชื่อมต่อ Mongoose ใน db.mongoose
db.mongoose = mongoose;

db.user = require("./user.model"); //เก็บโมดูลของ user ใน db.user โดย require มาจาก user.model เพื่อใช้ในการจัดการข้อมูล userในฐานข้อมูล
db.role = require("./role.model"); //เก็บโมดูลของ role ใน db.role โดย require มาจาก role.model เพื่อใช้ในการจัดการข้อมูล roleในฐานข้อมูล

//เก็บ ROLES ที่ถูกกำหนดไว้ในระบบ คือ "user", "admin", "moderator" เพื่อใช้ในการจัดการสิทธิ์และการเข้าถึง
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
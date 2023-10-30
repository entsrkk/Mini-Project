const express = require('express');
const {verifySignUp} = require("../middieware");
const User = require('../models/user.model');
const router = express.Router();

router.post('/register', async (req, res)=> {
    const user = new User(req.body); //ทำการสร้าง Obj ใหม่จาก User ที่รับข้อมูลมาจาก req.body
    await user.save(); //ใช้ await เพื่อรอให้บันทึกลงใน MongoDB เสร็จ โดยการเรียก Method save บน Obj user
});

module.exports = router;

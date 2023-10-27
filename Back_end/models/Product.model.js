const mongoose  = require("mongoose");


//ประกาศตัวแปร ProductSchema สำหรับเก็บรูปแบบข้อมูล
//การสร้างรูปแบบของข้อมูลใหม่ที่ใช้ mongoose.Schema เป็น constructor ของ Mongoose.
const ProductSchema = new mongoose.Schema({
    product_name:{
        type: String,
        require: true
    },
    product_type:{
        type: String,
        require: true
    },
    product_price:{
        type: String,
        require: true
    },
    product_img:{
        type: String,
        require: true
    },
    updated_at: {
        type:Date,
        default: Date.now
    }

})

//การ exports โดยการใช้ mongoose และมี method  model ที่มีชื่อ Product และจะส่งข้อมูล ProductSchema มา
module.exports = mongoose.model('Product' ,ProductSchema)
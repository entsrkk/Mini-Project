const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: String,
});

//สร้าง model Role โดยใช้ mongoose.model และส่งข้อมูล RoleSchema มา
const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;

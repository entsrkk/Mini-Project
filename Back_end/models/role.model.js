const mongoose  = require("mongoose");

const RoleSchema = new mongoose.Schema ({
    id:{
        type: String,
    },
    name:{
        type: String,
    }
})

module.exports = mongoose.model('Role' ,RoleSchema)
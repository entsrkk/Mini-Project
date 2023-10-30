const User = require("../models/user.model");

module.exports = (req, res) => {
    //สร้าง User ใน MongoDB ที่รับค่าจาก (req.body) 
    User.create(req.body)
    .then((user) => {
        console.log("User was registered successfully!");
        res.status(200).send({ message: "User was registered successfully!", 
        email: user.email,
        username: user.username,
        password: user.password,
        role:user.role
     });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Faill" });
    })

}
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const products = require('./routes/products.route')

const PORT = 5000;
const app = express();

//.env
require ('dotenv').config()
const url = process.env.MONGODB_CONNECT_URL

//เป็นการใช้ mongoose กับ NodePromise 
//Node Promise เป็น native ที่ให้มา
mongoose.Promise = global.Promise;

//connect
mongoose.connect(url, {dbName: 'product', useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connection to MongoDB Successfully!'))
    .catch((error) =>console.log(error))

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res) =>{
    res.send('<h1>Hello Wellcome To Mini Project</h1>')
});

//Routes
app.use('/products' ,products)

app.listen(PORT, () => {
    console.log("Server is runing on http://localhost:" + PORT);
});

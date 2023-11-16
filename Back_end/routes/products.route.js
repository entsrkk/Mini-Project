const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const router = express.Router();

// getAll ใช้ Method find จะเป็นการหาข้อมูลทั้งหมด
//ประกาศตัวแปร products แล้วใช้ฟังก์ชัน Product.find 
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        //ส่ง status 200 และข้อมูล products ในรูปแบบ json
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error:"Failed to getAll Product!"});
    }
});

//getById ใช้ Method findById(req.params.id) จะเป็นการหาข้อมูลทั้งหมด
//ประกาศตัวแปร products แล้วใช้ฟังก์ชัน Product.findById ที่รับค่าจาก (req.params.id)
router.get('/:id',[authJwt.verifyToken], async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.json(products);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Product not found!")
        }else{
            res.status(500).json({error:"Failed to get Product data!"});
        }
    }
});

//Create New Product ใช้ Method create 
//ประกาศตัวแปร createProducts แล้วใช้ฟังก์ชัน Product.create ที่รับค่าจาก (req.body) 
router.post('/', async (req, res) => {
    try {
        const createProducts = await Product.create(req.body);
        res.status(201).json(createProducts);
    } catch (error) {
        res.status(500).json({error:"Failed to Create Product!"});
    }
});

//UpdateById ใช้ Method findByIdAndUpdate(req.params.id, req.body) จะเป็นการหาข้อมูลทั้งหมด
//ประกาศตัวแปร updateProducts แล้วใช้ฟังก์ชัน Product.findByIdAndUpdate ที่รับค่าจาก (req.params.id, req.body)
router.put('/:id',[authJwt.verifyToken,authJwt.isAdmin], async (req, res) => {
    try {
        const updateProducts = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updateProducts);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Product not found!")
        }else{
            res.status(500).json({error:"Failed to Update Product data!"});
        }
    }
});

//DeleteById ใช้ Method findByIdAndDelete(req.params.id) จะเป็นการหาข้อมูลทั้งหมด
//ประกาศตัวแปร products แล้วใช้ฟังก์ชัน Product.findByIdAndDelete ที่รับค่าจาก (req.params.id)
router.delete('/:id', async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id);
        if (products) {
            res.status(200).json({message: "Product ID " +req.params.id+ " is Delete Successfully"});
        }
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("Product not found!")
        }else{
            res.status(500).json({error:"Failed to Delete Product data!"});
        }
    }
});

module.exports = router;

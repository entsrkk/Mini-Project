import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios, { Axios } from 'axios'
import Card from '../components/Card'
import Categories from '../components/Categories'
import Slide from '../components/Slide'
import authHeader from "../service/auth.header";
import { useAuthContext } from '../context/AuthContext'

const URL = import.meta.env.VITE_BASE_URL;

const Product = () => {
    const { user } = useAuthContext();
    //ใช้ Hook useState ใน React เพื่อสร้างตัวแปร state ที่ชื่อว่า products และฟังก์ชัน setProducts เพื่ออัปเดตค่าของ products
    //เมื่อค่าของ products ถูกอัปเดตโดยใช้ setProducts ซึ่งจะถูกใช้เมื่อมีการดำเนินการที่ทำให้ state ต้องเปลี่ยนแปลง
    const [products, setProducts] = useState([])
    const [allCategories, setAllCategories] = useState(['']);
    //ใช้ Hook useEffect เพื่อดึงข้อมูล products และอัปเดต state หลังจากนั้นจะทำเรียกใช้ fetchAllProducts 
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${URL}/products`)
                setProducts(res.data);
                //สร้างตัวแปร categories เป็น array ที่มี All และ new Set เพื่อลบข้อมูลที่ซ้ำออกจาก array ของ product_type ที่ได้จาก res.data
                //ใช้ ...(Spread Operator) เพื่อนำข้อมูลจาก Set มาแทนที่ใน array ใหม่เพื่อให้ข้อมูลไม่ซ้ำกัน
                const categories = ['All',...new Set(res.data.map(item => item.product_type))];
                setAllCategories(categories);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllProducts();
    }, []);
    const handleDelete = async (_id) => {
        try {
            await axios.delete(`${URL}/products/${_id}`)
            window.location.reload();
            alert("Product ID " + _id + " is Delete Successfully");
        } catch (error) {
            console.log(error);
        }
    }
    //กรองรายการสินค้าจาก product_type 
    const filterItems = async (product_type) => {
        //ถ้า product_type เท่ากับ All จะทำการดึงข้อมูลจาก API 
        if (product_type === 'All') {
            const res = await axios.get(`${URL}/products`)
            setProducts(res.data);
        } 
        //ถ้าไม่เท่ากับ all จะใช้ products.filter เพื่อกรองรายการสินค้าที่มีใน product_type และเก็บในตัวแปร newItems
        else {
            const newItems = products.filter(item => item.product_type === product_type);
            setProducts(newItems);
        }
    }
    return (
        <div>
            {user && (
            <div className="">
                {/* ส่ง prop allCategories และ filterItems ไปยัง Categories */}
               <Categories allCategories={allCategories} filterItems={filterItems} />
            </div>
            )}
            <div className='w-auto h-auto mx-auto'>
                <Slide/>
            </div>
            <div className="row">
                <div className="card flex flex-row flex-wrap my-7 mx-16 justify-center items-center ">
                    {/* ทำการ map product ที่มีใน array products เพื่อสร้าง card โดยมี key เป็น product._id 
                    และจะส่ง prop product และ handleDelete ไปยัง card component */}
                    {products.map(product => (
                        <Card key={product._id} product={product} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
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
    const [products, setProducts] = useState([])
    const [allCategories, setAllCategories] = useState(['']);
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${URL}/products`)
                setProducts(res.data);

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
    const filterItems = async (product_type) => {
        if (product_type === 'All') {
            const res = await axios.get(`${URL}/products`)
            setProducts(res.data);
        } else {
            const newItems = products.filter(item => item.product_type === product_type);
            setProducts(newItems);
        }
    }
    return (
        <div>
            {user && (
            <div className="">
                <Categories allCategories={allCategories} filterItems={filterItems} />
            </div>
            )}
            <div>
                <Slide/>
            </div>
            <div className="row">
                <div className="card flex flex-row flex-wrap my-7 mx-16 justify-center items-center ">
                    {products.map(product => (
                        <Card key={product._id} product={product} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
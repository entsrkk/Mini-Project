import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios, { Axios } from 'axios'
import Card from '../components/Card'

const Product = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products`)
                setProducts(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllProducts();
    }, []);
    return (
        <div>
            <h1 className='text-4xl text-center font-extrabold m-2'>MiniProject Shop</h1>
            <div className="row">
                <div className="card flex flex-row flex-wrap my-5 mx-20 justify-around items-center ">
                    {products.map(product => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
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
    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${_id}`)
            window.location.reload();
            alert("Product ID " + _id + " is Delete Successfully");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {/* <h1 className='text-4xl text-center font-extrabold m-2'>MiniProject Shop</h1> */}
            <div className="row">
                <div className="card flex flex-row flex-wrap my-12 mx-16 justify-between items-center ">
                    {products.map(product => (
                        <Card key={product._id} product={product} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
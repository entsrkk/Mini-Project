import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios, { Axios } from 'axios'
import Card from '../components/Card'

const URL = import.meta.env.VITE_BASE_URL;

const Product = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${URL}/products`)
                setProducts(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllProducts();
    }, []);
    return (
        <div>
            <h1>Shop MiniProject</h1>
            <div className="row">
                <div className="products">
                    {products.map(product => {
                        return (
                            <Card product={product}
                                handleDelete={handleDelete}
                                key={product.id} />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Product
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const URL = import.meta.env.VITE_BASE_URL;

const Update = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_type: "",
    product_price: "",
    product_img: "",
  })

  const navigate = useNavigate();
  const [error, setError] = useState();
  //Hook useParams จาก react-router จะช่วยในการดึงค่าพารามิเตอร์ที่ถูกส่งมา
  const {_id} = useParams(); 

  const handleChange = (e) => {
    //ถูกใช้เพื่ออัปเดตค่า state ของ product ที่เก็บค่าของ form
    setProduct((prev) => (
      //ใช้สร้าง obj ใหม่ที่มีค่าเหมือนกับ prev มีการอัปเดตค่าที่มีชื่อ e.target.name ด้วยค่า e.target.value
      { ...prev, [e.target.name]: e.target.value }
      ));
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${URL}/products/${_id}`)
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, [_id]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/products/${_id}`, product)
      console.log("Update ProductData:", product);
      alert("Product ID "+_id +" is Update Successfully");
      navigate("/")
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
  const handleCancel = () => {
    setProduct({
      product_name: "",
      product_type: "",
      product_price: "",
      product_img: "",
    })
    setError(false);
  }

  return (
    <div className='container mt-12 mx-auto w-full max-w-3xl justify-between items-center rounded-[1rem] shadow-2xl border'>
      <h1 className='text-4xl text-center font-extrabold mt-1 py-4'>Update Products</h1>
      <div className="card card-body justify-center items-center py-4 ">
        <div className="error">{error && "somthing went wrong !!"}</div>
        <div className="mx-auto w-full max-w-xl">
          <form className="space-y-3">
            <div>
              <label htmlFor="product_name" className="block text-sm font-medium leading-6 text-gray-900">Product name</label>
              <input name="product_name" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-none" value={product.product_name}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="product_type" className="block text-sm font-medium leading-6 text-gray-900">Product type</label>
              <input name="product_type" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-none" value={product.product_type}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="product_price" className="block text-sm font-medium leading-6 text-gray-900">Product price</label>
              <input name="product_price" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-none " value={product.product_price}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="product_img" className="block text-sm font-medium leading-6 text-gray-900">Product image</label>
              <input name="product_img" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-none" value={product.product_img}
                onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className='join justify-center items-center mt-4'>
          <Link className="btn btn-warning mx-1.5 w-32 hover:bg-yellow-500 hover:text-base-100" onClick={handleClick}>Update</Link>
          <Link className="btn btn-error mx-1.5 w-32 hover:bg-rose-600 hover:text-base-100" onClick={handleCancel}>Cancel</Link>
        </div>
      </div>
    </div>
  )
}

export default Update
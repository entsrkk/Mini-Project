import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

const Card = ({product}) => {
  return (
    <div className="">
      <div className="card w-[20rem] bg-base-100 pb-4 mb-7 shadow-xl  hover:shadow-2xl duration-300 hover:scale-105 " key={product._id}>
        <figure >
          <img src={product.product_img} alt="Guitar"/>
        </figure>
        <div className="card-body p-[1.5rem] ">
          <h2 className="card-title line-clamp-2 hover:line-clamp-3 ">{product.product_name}</h2>
          <div className="card-actions justify-between items-center my-1">
            <span className="text-lg text-red-600">฿{product.product_price}</span>  
            <span className="text-sm ">{product.product_type}</span>
          </div>
          <div className='join justify-center'>
            <button className="btn btn-warning mx-1 w-32 ">Edit</button>
            <button className="btn btn-error mx-1 w-32 ">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
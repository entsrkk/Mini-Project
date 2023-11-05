import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'

const Card = ({ product, handleDelete }) => {
  const { user } = useAuthContext();
  return (
    <div className="drop-shadow-md mx-4 ">
      <div className="card w-[20rem]  bg-base-100 pb-4 mb-7 shadow-xl  hover:shadow-2xl duration-300 hover:scale-105 border " key={product._id}>
        <figure >
          <img src={product.product_img} alt="Guitar" />
        </figure>
        <div className="card-body p-[1.5rem] ">
          <h3 className="card-title mt-4 text-sm text-gray-700 font-semibold ">{product.product_name}</h3>
          <div className="card-actions justify-between items-center my-1">
            <span className=" text-base text-red-600">฿{product.product_price}</span>
            {user && user.roles.includes("ROLE_ADMIN")&& (
            <span className="text-sm">{product.product_type}</span>
            )}
          </div>
          {user && user.roles.includes("ROLE_ADMIN")&& (
            <>
              <div className='join justify-center'>
                <Link to={`/update/${product._id}`} className="btn btn-warning mx-1 w-32 hover:bg-yellow-500 hover:text-base-100">Edit</Link>
                <Link to="" className="btn btn-error mx-1 w-32 hover:bg-rose-600 hover:text-base-100" onClick={() => {
                  handleDelete(product._id)
                }}>Delete</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
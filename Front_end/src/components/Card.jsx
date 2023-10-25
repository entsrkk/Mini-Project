import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

const Card = () => {
  return (
    <div className="card flex flex-row flex-wrap mt-5 justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl pb-4 px-8">
        <figure>
          <img
            src="https://i.pinimg.com/564x/ac/c2/39/acc2392b71728d042b29c831f3c43146.jpg"
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
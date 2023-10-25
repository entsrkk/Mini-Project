import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
      <div className="navbar  bg-neutral text-neutral-content mb-4">
        <div className="flex-1 h-16 ">
          <Link className="btn btn-link no-underline hover:no-underline text-3xl text-white mr-3.5" to="/">
            Project
          </Link>
          <Link className="btn btn-link no-underline hover:no-underline text-lg text-white " aria-current="page" to="/">
            Home
          </Link>
          <Link className="btn btn-link no-underline hover:no-underline text-lg text-white" aria-current="page" to="/add">
            Add
          </Link>
          <Link className="btn btn-link no-underline hover:no-underline text-lg text-white" >
            Secarch
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input border-none w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52"
            >
              <li>
                <a>Login</a>
              </li>
              <li>
                <a>SignUp</a>
              </li>
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default NavBar

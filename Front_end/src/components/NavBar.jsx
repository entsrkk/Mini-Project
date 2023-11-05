import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../service/auth.service';
import { useAuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Signin");
  }

  return (
    <nav className='bg-[#8f262b] p-4'>
      <div className="container mx-auto flex justify-between items-center bg-[#8f262b] text-neutral-content ">
        <div className="navbar-start">
          <Link className="btn btn-link no-underline hover:no-underline text-3xl text-base-100 hover:text-current"
            aria-current="page" to="/">
            Project
          </Link>
        </div>
        <div className="navbar-end flex w-[26rem] ">
          <div className="text-neutral-content tabs mr-4 ">
            <Link className="btn btn-link no-underline hover:no-underline text-lg text-base-300 normal-case w-28 hover:text-base-100 hover:bg-[#671c2165]"
              aria-current="page" to="/">
              Home
            </Link>
            {user && user.roles.includes("ROLE_ADMIN") && (
            <Link className="btn btn-link no-underline hover:no-underline text-lg text-base-300 normal-case w-28 hover:text-base-100 hover:bg-[#671c2165]"
               to="/add">
              Add
            </Link>
            )}
            {user && (
            <Link className="btn btn-link no-underline hover:no-underline text-lg text-base-300 normal-case w-28 hover:text-base-100 hover:bg-[#671c2165]"
              aria-current="page" to="/profile">
              Profile
            </Link>
            )}
          </div>
          <div className="dropdown dropdown-end mr-2 ">
            <label tabIndex={0} className=" btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ">
                <svg className='stroke-base-300 hover:stroke-base-100'
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-5 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
            >
              {user && (
              <span className="badge border-none bg-base-300 myt-1 mb-2">
                <p className='text-[1rem] font-semibold text-black'>Welcome, {user.username}</p>
              </span>
              )}
              {!user && (
                <li>
                  <Link className='text-black' aria-current="page" to="/signup">SignUp</Link>
                </li>
              )}
              {!user && (
                <li>
                  <Link className='text-black' aria-current="page" to="/signin">Login</Link>
                </li>
              )}
              {user && (
                <li>
                  <Link className='text-black' aria-current="page" to="/signin" onClick={handleLogout}>Logout</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;

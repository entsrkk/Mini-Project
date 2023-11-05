import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/auth.service';
import { useAuthContext } from '../context/AuthContext';

const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [error, setError] = useState();
  const handleInputChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault(); //จะยกเลิกการทำงานเริ่มต้นของ event 
    try {
      const currentUser = await AuthService.login(user.username, user.password);//เรียก API
      login(currentUser);
      console.log("SignIn Success", user);
      navigate("/"); //เมื่อ signin successful จะไปหน้าแรก
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  const handleCancel = () => {
    setUser({
      username: "",
      password: "",
    });
    setError(false);
  };

  return (
    <>
      <div className="hero min-h-[90vh]">
        <div className="hero-content flex-col lg:flex-row rounded-lg border bg-base-200">
          <img src="https://i.pinimg.com/564x/f0/e7/00/f0e700b818e5bcfc35d46b652febd7a9.jpg" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className='text-4xl text-center font-extrabold p-4'>Login to your account</h1>
            <div className="card card-body justify-center items-center py-4 ">
              <div className="mx-auto w-full max-w-sm">
                <form className="space-y-3 ">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <input name="username" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-2 ring-inset ring-base-300 focus:border-none"
                      value={user.username} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <input name="password" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-2 ring-inset ring-base-300 focus:border-none "
                      value={user.password} onChange={handleInputChange} />
                  </div>
                </form>
              </div>
              <div className="error text-red-600">{error && "Somthing Went Wrong!!"}</div>
              <div className='join justify-center items-center mt-4'>
                <Link className="btn btn-warning mx-1.5 w-32 hover:bg-yellow-500 hover:text-base-100 normal-case" onClick={handleClick}>Log in</Link>
                <Link className="btn btn-error mx-1.5 w-32 hover:bg-rose-600 hover:text-base-100 normal-case" onClick={handleCancel}>Cancel</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
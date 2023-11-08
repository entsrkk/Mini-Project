import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/auth.service';


function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); 

  const navigate = useNavigate();
  const [error, setError] = useState();

  //handleInputChange จะรับค่าจากฟอร์มและอัปเดต state user
  const handleInputChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  //เมื่อกด handleCancel จะทำการอัปเดต state และกำหนดค่าของทุกฟิลด์ให้เป็นค่าว่าง
  const handleCancel = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError(false);
  };

  const handleClick = async (e) => {
    e.preventDefault(); //จะยกเลิกการทำงานเริ่มต้นของ event 
    try {
      if (user.confirmPassword === user.password) {
        const register = await AuthService.register(user.username,user.email,user.password);
        console.log("SignUp Success", user);
        navigate("/Signin") //เมื่อ signup successful จะไปหน้า Signin
      }
      else{
        alert("")
      }
    } catch (error) {
      console.error(error);
      setError(true);      
    }
  };
  return (
    <>
      <div className="hero min-h-[90vh]">
        <div className="hero-content flex-col lg:flex-row rounded-lg border bg-base-200">
          <img src="https://i.pinimg.com/564x/79/e2/f9/79e2f97ac666f80fd62f3729256cd911.jpg" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className='text-4xl text-center font-extrabold py-4'>Create your account</h1>
            <div className="card card-body justify-center items-center py-4 ">
              <div className="mx-auto w-full max-w-sm">
                <form className="space-y-3 ">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <input name="username" type="text" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-2 ring-inset ring-base-300 focus:border-none"
                    value={user.username}onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                    <input name="email" type="email" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-2 ring-inset ring-base-300 focus:border-none"
                    value={user.email}onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <input name="password" type="password" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-2 ring-inset ring-base-300 focus:border-none "
                    value={user.password} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                    <input name="confirmPassword" type="password" className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-2 ring-inset ring-base-300 focus:border-none "
                    value={user.confirmPassword} onChange={handleInputChange}/>
                  </div>
                </form>
              </div>
              <div className='join justify-center items-center mt-4'>
                <Link className="btn btn-warning mx-1.5 w-32 hover:bg-yellow-500 hover:text-base-100 normal-case" onClick={handleClick}>Sign Up</Link>
                <Link className="btn btn-error mx-1.5 w-32 hover:bg-rose-600 hover:text-base-100 normal-case" onClick={handleCancel}>Cancel</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Signup
import React from 'react'
import AuthService from '../service/auth.service'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout;
        navigate("/signin");
    }
    setTimeout(()=>{
        handleLogout();
        
    },3 * 1000);
  return (
    <div>Logout</div>
  )
}

export default Logout
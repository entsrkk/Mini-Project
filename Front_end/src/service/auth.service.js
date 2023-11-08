import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;
const API_URL = URL +"/api/auth/";

const login =  async (username, password) =>{
    const res = await axios.post(API_URL + "signin",{username,password});
    if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
    }
    return res.data;
};

const register = async (username,email,password) => { 
    return await axios.post(API_URL + "signup", {username,email,password})
}
const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

const AuthService = {
    login,
    register,
    getCurrentUser,
    logout
};

export default AuthService;

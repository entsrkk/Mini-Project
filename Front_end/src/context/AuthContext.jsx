import { useContext, createContext, useState, useEffect} from "react";
import AuthService from "../service/auth.service";
const AuthContext = createContext(null);
//AuthProvider เป็น function component ที่ใช้ useState เพื่อเก็บ state user ที่มีค่าเริ่มต้นจากการเรียก getUser และ setUser เพื่ออัปเดตค่า user
//และเป็น Context Provider ที่ใช้ AuthContext เพื่อรองรับ component ที่จะถูก wrap ด้วย AuthProvider
export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(getUser);
    //รับค่า user และใช้ setUser เพื่ออัปเดตค่า user ใน context
    const login = (user) => setUser(user);
    const logout = () => {
        AuthService.logout();
        setUser(null);
    }
    function getUser() {
        //สร้างตัวแปร temp เพื่อเป็นค่าที่ดึงมาจาก localStorage.getItem("user")
        const temp = localStorage.getItem("user");
        //สร้างตัวแปร savedUser เพื่อเก็บค่า obj ที่ได้จาก JSON.parse(temp)
        //JSON.parse(temp) เปลี่ยน string ในตัวแปร temp เป็น obj 
        const savedUser = JSON.parse(temp);
        return savedUser || null;
    }   
    //ใช้เมื่อมีเปลี่ยนแปลงใน user และเมื่อมีการเปลี่ยนแปลงจะบันทึกข้อมูลลงใน localStorage
    useEffect(()=>{
        //สร้างตัวแปร temp เพื่อเป็นค่าที่ได้จาก JSON.stringify(user)
        //JSON.stringify(user) จะเปลี่ยน obj user เป็น string 
        const temp = JSON.stringify(user);
        localStorage.setItem("user", temp);
    },[user]) //การใส่ [user] ใน useEffect จะทำให้ useEffect ทำงานเมื่อ user มีการเปลี่ยนแปลง
    
    return (
        //ทุก component ที่อยู่ภายใต้ AuthContext.Provider จะสามารถเข้าถึง user, login, logout ได้
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>  
    )
}

export const useAuthContext = () => useContext(AuthContext);
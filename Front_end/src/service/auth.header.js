export default function authHeader() {
    //JSON.parse เป็นการเปลี่ยน string เป็น obj
    const user = JSON.parse(localStorage.getItem("user"));
    //ถ้ามี user และ accessToken จะส่ง x-access-token และ user.accessToken
    if (user && user.accessToken) {
        return {"x-access-token" : user.accessToken};
    }
    //ถ้าไม่มีส่งจะเป็นค่าว่าง
    else {
        return {};
    }
}
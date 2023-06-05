import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const AdminLayout = () => {
    const { token, user,settingUser,settingToken } = useStateContext();
    if (!token) {
        return <Navigate to="/guest/login" />;
    }
    if(user && user.type !== "admin"){
        return <Navigate to="/home" />;
    }
    
   const handleLogout = (e) => {
       e.preventDefault();
       axiosClient.post("/logout").then(() => {
           settingUser(null);
           settingToken(null);
       });
   };


    return (
        <>
            <div>AdminLayout</div>
            <Outlet />
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};
export default AdminLayout;

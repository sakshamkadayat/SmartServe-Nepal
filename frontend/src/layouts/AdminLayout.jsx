import { Outlet ,NavLink} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import adminProfileIamge from "../assets/admin_profile.png";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import "../styles/adminlayout.css"
import {
    FaTachometerAlt,
    FaChartBar,
    FaUserCog,
    FaSignOutAlt,
} from "react-icons/fa";


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
   const sideBarLinks = [
    {
        id: 1,
        name: "Dashboard",
        icon: <FaTachometerAlt />,
        link: "/admin/dashboard",
    },
    {
        id: 2,
        name:'Surveys',
        icon:<FaChartBar />,
        link:'/admin/surveys'
    },
    {
        id: 3,
        name:'Polls',
        icon:<FaChartBar />,
        link:'/admin/polls'
    },
    {
        id: 4,
        name:'Policy Feedbacks',
        icon:<FaChartBar />,
        link:'/admin/policy_feedbacks'
    }
   ]


    return (
        <>
            <div className="dashboard">
                <div className="sidebar">
                    <h3>Admin Dashboard</h3>
                    <ul>
                        {sideBarLinks.map((element) => {
                            return (
                                <li key={element.id}>
                                    <NavLink 
                                    to={element.link}
                                      className={({ isActive }) =>(
                                            isActive ? "active_navlink" : ""
                                      )}
                                    >
                                        {element.icon}
                                        {element.name}
                                    </NavLink>
                               </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="content">
                    <div className="navbar">
                        <div className="profile">
                            <img
                                src={adminProfileIamge}
                                alt="Profile Picture"
                            />
                            <span>Bibek Angdembe</span>
                        </div>
                         
                         <div className="admin_handle">
                            <button href="#">
                            <FaUserCog />
                        </button>
                        <button onClick={handleLogout}>
                            <FaSignOutAlt /> 
                        </button>
                         </div>
                        
                    </div>
                    <div className="dashboard_main_content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdminLayout;

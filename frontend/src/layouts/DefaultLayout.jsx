import { Outlet ,Navigate,NavLink} from 'react-router-dom'
import {useStateContext} from '../context/ContextProvider'
import axiosClient from '../axios-client'
import { useEffect } from 'react'
import '../styles/defaultlayout.css'
import {
    FaTachometerAlt,
    FaChartBar,
    FaSignOutAlt,
} from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { VscFeedback } from "react-icons/vsc";
import dummyProfile from "../assets/admin_profile.webp"

const DefaultLayout = () => {
const {user,settingUser,token,settingToken} = useStateContext();
if(!token){
  return <Navigate to="/guest/login" />
}
if(user && user.type === "admin"){
  return <Navigate to="/admin/dashboard" />
}

const handleLogout = (e) => {
  e.preventDefault();
  axiosClient.post("/logout")
  .then(() => {
    settingUser(null);
    settingToken(null);
});
}
  const sideBarLinks = [
      {
          id: 1,
          name: "Dashboard",
          icon: <FaTachometerAlt />,
          link: "/",
      },
      {
          id: 2,
          name: "Surveys",
          icon: <FcSurvey />,
          link: "/survey",
      },
      {
          id: 3,
          name: "Polls",
          icon: <FaChartBar />,
          link: "/polls",
      },
      {
          id: 4,
          name: "Policy Feedbacks",
          icon: <VscFeedback />,
          link: "/feedbacks",
      },
  ];


  return (
      <>
          <div className="user_dashboard">
              <div className="user_sidebar">
                  <h3>User Dashboard</h3>
                  <ul>
                      {sideBarLinks.map((element) => {
                          return (
                              <li key={element.id}>
                                  <NavLink
                                      // key={element.id}
                                      to={element.link}
                                      className={({ isActive }) =>
                                          isActive ? "active_navlink" : ""
                                      }
                                  >
                                      {element.icon}
                                      {element.name}
                                  </NavLink>
                              </li>
                          );
                      })}
                  </ul>
              </div>
              <div className="user_dashboard_content">
                  <div className="user_navbar">
                      <div className="user_profile">
                          <img src={dummyProfile} alt="Profile Picture" />
                          <span>Hello {user.name}</span>
                      </div>

                      <div className="user_handle">
                          <button onClick={handleLogout}>
                              <FaSignOutAlt />
                          </button>
                      </div>
                  </div>
                  <div className="user_dashboard_main_content">
                      <Outlet />
                  </div>
              </div>
          </div>
      </>
  );
}
export default DefaultLayout
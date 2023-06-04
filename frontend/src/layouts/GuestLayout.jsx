import { Outlet , Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import "../styles/login.css";
import logo from "../../images/goverment_logo.png";
import {useStateContext} from "../context/ContextProvider";
const GuestLayout = () => {
  const {token} = useStateContext();
  if(token){
    return <Navigate to="/" />
  }
    return (
        <>
            <div className="container-upper-design">
                <img src={logo} alt="log" />
                <h5 className="global-font" style={{fontSize:'1rem'}}>Goverment of Nepal <br/><span style={{color:'blue',fontSize:'1rem'}} className="global-font">Unveiling Rules, Uniting Citizens, and Shaping a Better Future.</span><br/><p className="global-font" style={{fontSize:'1rem'}}>Singha Durbar,Kathmandu</p></h5>
                <div className="mountain"></div>
            </div>
            <Outlet />
            <div className="container-buttom-design"  ><p className="global-font"> ©Content Owned By Government of Nepal ||<span style={{color:'green'}}> Designed By Heckor Gang</span></p></div>
        </>
    );
};
export default GuestLayout;

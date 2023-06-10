import { Outlet, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import "../styles/login.css";
import logo from "../../src/images/goverment_logo.png";
import { useStateContext } from "../context/ContextProvider";
import hammer from "../../src/images/hammer.jpg"
import flags from "../../src/images/flg.jpg";
import vote from "../../src/images/vote.png";
import poll from "../../src/images/poll.png";
const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <div className="form-maincontainer">
                <div className="container-upper">
                    <img src={logo} alt="logo" />
                    <p style={{fontSize:'1.2rem'}} className="global-font">"Empowering You with Goverment Notices"</p>
                </div>
                <div className="container-outlet">
                    <Outlet />

                    <div className="login-rightcontainer">
                        <img src={hammer} alt="hammer" />
                        <img src={flags} alt="flags" className="flags"/>
                        <img src={vote} alt="vote" className="vote"/>
                        <img src={poll} alt="poll" className="poll" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default GuestLayout;

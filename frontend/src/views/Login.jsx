import "../styles/Login.css";
import {Link } from "react-router-dom";
import Goverment from "../../images/goverment_logo.png";
import {useRef} from "react";
import namaste from "../../images/namaste.png";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";


const Login = () => {
    const {settingUser,settingToken} = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
      
        axiosClient.post("/login", payLoad)
            .then((response) => {
                settingUser(response.data.user);
                settingToken(response.data.access_token);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
    };



    return (
        <div className="login-maincontainer">
            <div className="login-leftcontainer">
                <h3 className="global-font">
                    Introducing <br /> New rules and regulations{" "}
                </h3>
                <h2 className="global-font"> For a better tomorrow</h2>
                <img src={namaste} alt="flag" />
                <h2 className="global-font">
                    {" "}
                    Stay informed for a brighter future.
                </h2>
            </div>
            <div className="login-rightcontainer">
                <form action="#" onSubmit={handleSubmit} method="post">
                    <div className="form-field">
                        <img
                            src={Goverment}
                            alt="images"
                            className="login-left-image"
                        />
                        <h3 style={{ color: "blue" }} className="global-font">
                            GOVERMENT{" "}
                            <span style={{ color: "red" }}>OF NEPAL</span>
                        </h3>
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email </label>
                        <input ref={emailRef} type="email" required name="email" id="email" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password </label>
                        <input ref={passwordRef} type="password" name="password" id="password" />
                    </div>
                    <div className="button">
                        <input type="submit" value="Login" />
                    </div>
                    <div className="form-field">
                        <p>
                            Not Registered yet ?  <Link to="/guest/register">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;

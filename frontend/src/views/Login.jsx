import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
    const { settingUser, settingToken } = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payLoad)
            .then((response) => {
                settingUser(response.data.user);
                settingToken(response.data.access_token);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login-maincontainer">
            <div className="login-leftcontainer">
                <h3 className="global-font">WELCOME BACK !</h3>
                <form action="#" onSubmit={handleSubmit} method="post">
                    <div className="form-field">
                        <input
                            ref={emailRef}
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-field">
                        <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-field">
                        <a href="#" className="forgot global-font">
                            Forgot password ?
                        </a>
                    </div>
                    <div className="form-field">
                        <input type="submit" value="Login" className="btn" />
                    </div>
                    <div className="form-field">
                        <p className="global-font">
                            Don't have an account ?{" "}
                            <Link to="/guest/register" style={{color:'red'}} className="global-font">Signup</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;

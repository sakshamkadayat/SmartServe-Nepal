import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useRef ,useEffect} from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { handleSuccess ,handleError } from './../utils/globalFunctions';
import { ToastContainer } from "react-toastify";


const Login = () => {
    const { settingUser, settingToken ,toastMessage,settingToastMessage} = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if(toastMessage !== null){
            handleSuccess(toastMessage);
            settingToastMessage(localStorage.removeItem("toastMessage"));
        }
    }, [])


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
                settingToastMessage("Login Successfull");
            })
            .catch((error) => {
               // console.log(error.response.data.errors);
                handleError(error.response.data.errors);
            });
    };
    
    return (
        <div className="login-maincontainer">
        <ToastContainer />
            <div className="login-leftcontainer">
                <h3>WELCOME BACK !</h3>
                <form action="#" onSubmit={handleSubmit} method="post">
                    <div className="form-field">
                        <input
                            ref={emailRef}
                            type="email"
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
                        <a href="#" className="forgot_password">
                            Forgot password ?
                        </a>
                    </div>
                    <div className="form-field">
                        <input type="submit" value="Login" className="btn" />
                    </div>
                    <div className="form-field">
                        <p >
                            Don't have an account ?{" "}
                            <Link to="/guest/register">Signup</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;


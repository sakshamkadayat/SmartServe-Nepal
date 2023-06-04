import "../styles/Login.css";
import {Link } from "react-router-dom";
import Goverment from "../../images/goverment_logo.png";


import namaste from "../../images/namaste.png";
const Login = () => {
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
                <form action="#" method="post">
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
                        <label htmlFor="username">Username </label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password </label>
                        <input type="text" name="password" id="password" />
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

import "../styles/Login.css";
import Goverment from "../../images/goverment_logo.png";
const Login = () => {
    return (
        <div className="login-maincontainer">
            <div className="login-leftcontainer">
                <img
                    src={Goverment}
                    alt="images"
                    className="login-left-image"
                />
            </div>
            <div className="login-rightcontainer">
                <form action="#" method="post">
                    <div className="form-field">
                        <h3 style={{ color: "blue" }}>
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
                    <div className="form-field">
                        <input type="submit" value="Login" />
                    </div>
                    <div className="form-field">
                        <p>
                            Forgot Password or <a href="#">Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;

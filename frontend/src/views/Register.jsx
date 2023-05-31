import "../styles/register.css";
import Rightimage from "../../images/leftimg.jpg";
const Register = () => {
    return (
        <div className="registration-main-container">
            <div className="register-left-container">
                <h3
                    style={{
                        color: "blue",
                        textAlign: "center",
                        marginTop: "22px",
                        fontWeight: "900",
                    }}
                >
                    Empowering{" "}
                    <span style={{ color: "red" }}>Nepal's Digital Future</span>{" "}
                </h3>
                <form action="#" method="post">
                    <div className="form-area">
                        <label htmlFor="fname">Full Name</label>
                        <input type="text" className="box" />
                    </div>
                    <div className="form-area">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="box" />
                    </div>
                    <div className="form-area">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" className="box" />
                    </div>
                    <div className="form-area">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="box" />
                    </div>
                    <div className="form-area">
                        <label htmlFor="cpassword"> Confirm Password</label>
                        <input type="password" className="box" />
                    </div>
                    <div className="form-area">
                        <button>Submit</button>
                    </div>
                </form>
            </div>
            <div className="register-right-container">
                <img src={Rightimage} alt="image" />
            </div>
        </div>
    );
};
export default Register;

import "../styles/register.css";
import { useRef,useState } from "react";
import {Link} from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client"

const Register = () => {
    const {settingUser,settingToken} = useStateContext();
    const nameRef = useRef();
    const citizenshipRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const addressRef = useRef();
    const [gender,setGender] = useState("male");

    const onOptionChange = (e) => {
        setGender(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payLoad  = {
            name: nameRef.current.value,
            citizenship_no: citizenshipRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
            gender: gender,
            address: addressRef.current.value,
        }
        axiosClient.post('/register',payLoad)
        .then(()=>{
           window.location.href = "/guest/login";
        })
        .catch((error)=>{
            console.log(error.response.data.errors);
        })
    }

    return (
        <div className="container">
            <div className="title">Registration</div>
            <div className="content">
                <form action="#" onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Full Name</span>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Citizenship Number</span>
                            <input
                                ref={citizenshipRef}
                                type="text"
                                placeholder="Enter your citizenship number"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Address</span>
                            <input
                                ref={addressRef}
                                type="text"
                                placeholder="Enter your address"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input
                                ref={phoneRef}
                                type="number"
                                maxLength={15}
                                min={10}
                                placeholder="Enter your contact number"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="New Password"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input
                                ref={confirmPasswordRef}
                                type="password"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>
                    <div className="gender-details">
                        <span className="gender-title">Gender</span>
                        <div className="category">
                            <label>
                        <input  type="radio" name="gender" value="male" checked={gender ==="male"} onChange={ onOptionChange} />
                                <span className="gender">Male</span>
                            </label>
                            <label>
                        <input   type="radio" name="gender" value="female" checked={ gender==="female"} onChange={ onOptionChange}/>
                                <span className="gender">Female</span>
                            </label>
                            <label>
                        <input type="radio" name="gender" value="other" checked={gender==="other" } onChange={onOptionChange} />
                                <span className="gender">Other</span>
                            </label>
                        </div>
                    </div>
                      <p>Already Registered ? <Link to="/guest/login">Login Here</Link></p>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

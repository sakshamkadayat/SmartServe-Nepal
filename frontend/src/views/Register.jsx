import "../styles/register.css";
import { useRef,useState } from "react";
const Register = () => {
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
                                type="text"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input
                                ref={phoneRef}
                                type="number"
                                maxLength={15}
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
                    {/* <div className="gender-details">
                        <span className="gender-title">Gender</span>
                        <div className="category">
                            <label htmlFor="dot-1">
                        <input  type="radio" name="gender" value="male" id="dot-1" checked={gender ==="male"} onChange={ onOptionChange} />
                                <span className="gender">Male</span>
                            </label>
                            <label htmlFor="dot-2">
                        <input   type="radio" name="gender" value="female" id="dot-2" checked={ gender==="female"} onChange={ onOptionChange}/>
                                <span className="dot two"></span>
                                <span className="gender">Female</span>
                            </label>
                            <label htmlFor="dot-3">
                        <input type="radio" name="gender" value="other" id="dot-3" checked={gender==="other" } onChange={onOptionChange} />
                                <span className="dot three"></span>
                                <span className="gender">Other</span>
                            </label>
                        </div>
                    </div> */}
                      <label htmlFor="dot-1">
                        <input  type="radio" name="gender" value="male" id="dot-1" checked={gender ==="male"} onChange={ onOptionChange} />
                                <span className="gender">Male</span>
                            </label>
                            <label htmlFor="dot-2">
                        <input   type="radio" name="gender" value="female" id="dot-2" checked={ gender==="female"} onChange={ onOptionChange}/>
                                <span className="dot two"></span>
                                <span className="gender">Female</span>
                            </label>
                            <label htmlFor="dot-3">
                        <input type="radio" name="gender" value="other" id="dot-3" checked={gender==="other" } onChange={onOptionChange} />
                                <span className="dot three"></span>
                                <span className="gender">Other</span>
                            </label>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

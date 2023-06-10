import "../styles/page404.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import error from "../../src/images/dribbble-1.gif";
const Page404 = () => {
    const [counter, setCounter] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const countInterval = setTimeout(() => {
            if (counter === 1) {
                navigate("/guest/login");
            } else {
                setCounter(counter - 1);
            }
            return clearTimeout(countInterval);
        }, 1000);
    }, [counter, navigate]);

    return (
        <div className="timer-container">
            <h1>404 Page Not Found</h1>
            <img src={error} alt="error" />
            <div className="stylish">
                <p>Redirecting to Login Page in </p>
                <h2>{counter}sec</h2>
            </div>
        </div>
    );
};
export default Page404;

import "../styles/preloader.css";
import HashLoader from "react-spinners/HashLoader";
const PreLoader = ({ text }) => {
    return (
        <>
            <div className="pre-loader-for-all">
                <HashLoader color="#36d7b7" />
                <p>{text}</p>
            </div>
        </>
    );
};
export default PreLoader;

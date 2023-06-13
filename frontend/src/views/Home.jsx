import '../styles/home.css'
import { useEffect } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { ToastContainer } from 'react-toastify';
import { handleError,handleSuccess } from '../utils/globalFunctions';
const Home = () => {
     const { user, toastMessage, settingToastMessage } = useStateContext();
     useEffect(() => {
         if (toastMessage !== null) {
             handleSuccess(toastMessage);
             settingToastMessage(localStorage.removeItem("toastMessage"));
         }
     }, []);
  return (
    <>
    <div className="user_main_section">
    <ToastContainer />
        <div className='user_dash_hero'>
          <h1>
              Welcome {user.name}
          </h1>
      </div>
    </div>
    </>
  );
}
export default Home
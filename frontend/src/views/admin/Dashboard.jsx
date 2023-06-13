import { useStateContext } from "../../context/ContextProvider"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../utils/globalFunctions";
const Dashboard = () => {
  const { user, toastMessage,settingToastMessage} = useStateContext();
  useEffect(() => {
    if(toastMessage !== null){
      handleSuccess(toastMessage);
      settingToastMessage(localStorage.removeItem("toastMessage"));
    }
  }, [])

  return (
    <div>
      <ToastContainer />
    This is admin dashboard
    </div>
  )
}
export default Dashboard
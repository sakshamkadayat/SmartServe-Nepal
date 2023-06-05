import { Outlet ,Navigate} from 'react-router-dom'
import {useStateContext} from '../context/ContextProvider'
import axiosClient from '../axios-client'
import { useEffect } from 'react'
const DefaultLayout = () => {
const {user,settingUser,token,settingToken} = useStateContext();
if(!token){
  return <Navigate to="/guest/login" />
}
if(user && user.type === "admin"){
  return <Navigate to="/admin/dashboard" />
}

const handleLogout = (e) => {
  e.preventDefault();
  axiosClient.post("/logout")
  .then(() => {
    settingUser(null);
    settingToken(null);
});
}

  return (
    <>
    <div>DefaultLayout</div>
    <Outlet />
    <p>{user.name}</p>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}
export default DefaultLayout
import { Outlet ,Navigate} from 'react-router-dom'
import {useStateContext} from '../context/ContextProvider'
import axiosClient from '../axios-client'
const DefaultLayout = () => {
const {user,token} = useStateContext();
if(!token){
  return <Navigate to="/guest/login" />
}
  return (
    <>
    <div>DefaultLayout</div>
    <Outlet />
    </>
  )
}
export default DefaultLayout
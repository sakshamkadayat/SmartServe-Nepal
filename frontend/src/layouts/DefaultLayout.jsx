import { Outlet } from 'react-router-dom'
const DefaultLayout = () => {
  return (
    <>
    <div>DefaultLayout</div>
    <Outlet />
    </>
  )
}
export default DefaultLayout
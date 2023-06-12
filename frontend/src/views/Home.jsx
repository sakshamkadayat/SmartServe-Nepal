import '../styles/home.css'
import { useStateContext } from '../context/ContextProvider';
const Home = () => {
    const {user} = useStateContext();
  return (
    <>
    <div className="user_main_section">
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
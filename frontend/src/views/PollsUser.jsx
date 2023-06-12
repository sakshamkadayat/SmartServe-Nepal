import { ToastContainer  } from 'react-toastify';
import {useEffect,useState} from 'react'
import axiosClient from './../axios-client';
import { useStateContext } from '../context/ContextProvider';
import '././../styles/userpoll.css'
const PollsUser = () => {
  const {handleSuccess , handleError} = useStateContext();
  //states to store polldata 
 const [activePollData,setActivePollData] = useState(
     {
       voted:[],
      not_voted : [],
     })

  //get initial data
  const fetchData = async () => {
      try {
          const response = await axiosClient.get("/polls");
          setActivePollData((prev) => {
              return {
                  ...prev,
                  voted: response.data.user_voted,
                  not_voted: response.data.user_not_voted,
              };
          });
          //  console.log(activePollData.voted);
          //  console.log(activePollData.not_voted);
      } catch (err) {
          console.log(err.response.data.message);
      }
  };



  useEffect(()=>{
    fetchData()   
  },[])

  const handleVoteSubmit = async (e,poll_id,poll_option_id) =>{
    e.preventDefault();
    const payload = {
      poll_id,
      poll_option_id
    }
    try{
      const response = await axiosClient.post('/polls/vote',payload);
      handleSuccess("Your vote has been successfully counted");
      fetchData();
    }catch(err){
      handleError('Sorry something went wrong')
      console.log(err.response.data.message)
    }
    
  }

  return (
      <>
          <div className="user_poll_container">
              <div className="user_notvoted_polls">
                  <h3>New Polls</h3>
                  {activePollData.not_voted.length === 0 ? (
                      <h4>No any active polls</h4>
                  ) : (
                      activePollData.not_voted.map((poll) => (
                          <div className="active_polls_box" key={poll.id}>
                              <p>{poll.question}</p>
                              {poll.poll_options.map((innerVal) => (
                                  <div
                                      onClick={(e)=>handleVoteSubmit(e,poll.id,innerVal.id)}
                                      key={innerVal.id}
                                      className="active_polls_options"
                                  >
                                      <p>{innerVal.option}</p>
                                  </div>
                              ))}
                          </div>
                      ))
                  )}
              </div>
              <div className="user_notvoted_polls">
                  <h3>Active voted Polls</h3>
                  {activePollData.voted.length === 0 ? (
                      <h4>You have not voted in any polls</h4>
                  ) : (
                      activePollData.voted.map((poll) => (
                          <div className="active_polls_box" key={poll.id}>
                              <p>{poll.question}</p>
                              {poll.poll_options.map((innerVal) => (
                                  <div
                                      key={innerVal.id}
                                      className="active_polls_options"
                                  >
                                      <p>{innerVal.option}</p>
                                  </div>
                              ))}
                          </div>
                      ))
                  )}
              </div>
              <ToastContainer />
          </div>
      </>
  );
}
export default PollsUser
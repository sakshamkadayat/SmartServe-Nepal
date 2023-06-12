import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axiosClient from "./../axios-client";
import {
    handleError,
    handleSuccess,
    updateRemainingTimes,
} from "../utils/globalFunctions";
import "././../styles/userpoll.css";
import PreLoader from "../components/Preloader";
import { PieChart } from "../components/PieChart";
import { GrPieChart } from "react-icons/gr";

const PollsUser = () => {
    const [showChart, setShowChart] = useState(false);
    const [selectedChartIndex, setSelectedChartIndex] = useState(null);

    const [loading, setLoading] = useState(false);

    //states to store polldata
    const [userVotedPolls, setUserVotedPolls] = useState([]);
    const [userNotVotedPolls, setUserNotVotedPolls] = useState([]);

    //get initial data
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/polls");
            setLoading(false);
            setUserVotedPolls(response.data.user_voted);
            setUserNotVotedPolls(response.data.user_not_voted);
            updateRemainingTimes(setUserNotVotedPolls);
            updateRemainingTimes(setUserVotedPolls);
        } catch (err) {
            setLoading(false);
            console.log(err.response.data.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVoteSubmit = async (e, poll_id, poll_option_id) => {
        e.preventDefault();
        const payload = {
            poll_id,
            poll_option_id,
        };
        try {
            const response = await axiosClient.post("/polls/vote", payload);
            handleSuccess("Your vote has been successfully counted");
            fetchData();
        } catch (err) {
            handleError("Sorry something went wrong");
        }
    };

    return (
        <>
            <div className="user_poll_container">
                <div className="user_notvoted_polls">
                    <h3>New Polls</h3>

                    {loading && <PreLoader text="Fetching polls for you" />}
                    {!loading &&
                        (userNotVotedPolls.length === 0 ? (
                            <h4>No any active polls</h4>
                        ) : (
                            userNotVotedPolls.map((poll) => (
                                <div className="active_polls_box" key={poll.id}>
                                    <h4>{poll.question}</h4>
                                    <div className="poll_descriptions">
                                        <h5 className="active_poll_total_votes">
                                            Total votes : {poll.totalVotes}
                                        </h5>
                                        <h5 className="vote_info_user">
                                            Click on the option to vote
                                        </h5>
                                        <h5 className="active_poll_total_votes">
                                            Poll ends in : {poll.remainingTime}
                                        </h5>
                                    </div>
                                    {poll.poll_options.map((innerVal) => (
                                        <div
                                            onClick={(e) =>
                                                handleVoteSubmit(
                                                    e,
                                                    poll.id,
                                                    innerVal.id
                                                )
                                            }
                                            key={innerVal.id}
                                            className="active_polls_options"
                                        >
                                            <p>{innerVal.option}</p>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ))}
                </div>
                <div className="user_notvoted_polls">
                    <h3>Active voted Polls</h3>
                    {loading && <PreLoader text="Fetching polls for you" />}
                    {!loading &&
                        (userVotedPolls.length === 0 ? (
                            <h4>You have not voted in any polls</h4>
                        ) : (
                            userVotedPolls.map((poll, index) => (
                                <div
                                    className="active_polls_box voted_active_poll_box"
                                    key={poll.id}
                                >
                                    <div className="piechat_svg">
                                        <GrPieChart
                                            onClick={() => {
                                                setShowChart(true);
                                                setSelectedChartIndex(
                                                    selectedChartIndex === index
                                                        ? null
                                                        : index
                                                );
                                            }}
                                        />
                                    </div>
                                    <h4>{poll.question}</h4>
                                    <div className="poll_descriptions">
                                        <h5 className="active_poll_total_votes">
                                            Total votes : {poll.totalVotes}
                                        </h5>
                                        <h5 className="already_voted">
                                            You alredy Voted
                                        </h5>
                                        <h5 className="active_poll_total_votes">
                                            Poll ends in: {poll.remainingTime}
                                        </h5>
                                    </div>
                                    {showChart &&
                                        selectedChartIndex === index && (
                                            <div className="piechart_contianer">
                                                <p>Piechart</p>
                                                <PieChart
                                                    poll={poll.poll_options}
                                                />
                                            </div>
                                        )}
                                    {poll.poll_options.map((innerVal) => (
                                        <>
                                            <div
                                                className="poll_option_container"
                                                key={innerVal.id}
                                            >
                                                {innerVal.option}{" "}
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress"
                                                        style={{
                                                            width: `${innerVal.percentage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="poll_data_details">
                                                    <p>
                                                        Vote_count:{" "}
                                                        {innerVal.votes_count}
                                                    </p>
                                                    <p>
                                                        Percentage:{" "}
                                                        {innerVal.percentage}%
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            ))
                        ))}
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
export default PollsUser;

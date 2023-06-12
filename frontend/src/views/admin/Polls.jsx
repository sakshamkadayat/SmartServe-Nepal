import { useState, useEffect } from "react";
import "../../styles/polls.css";
import { v4 as uuid } from "uuid";
import axiosClient from "../../axios-client";
import PreLoader from "../../components/Preloader";
import { FaRegTrashAlt, FaPlus, FaRegPaperPlane } from "react-icons/fa";
import { handleError,handleSuccess,updateRemainingTimes } from "../../utils/globalFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {motion, AnimatePresence} from 'framer-motion'

const Polls = () => {
    const [allPolls, setAllPolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: "",
        description: "",
        end_date: "",
        poll_options: [
            { poll_option_id: uuid(), option: "" },
            { poll_option_id: uuid(), option: "" },
        ],
    });
    const [submitCount, setSubmitCount] = useState(0);

    const [formIsOpen, setFormIsOpen] = useState(false);
    const handleCreateNewPoll = () => {
        setFormIsOpen(!formIsOpen);
    };
      

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get("/all_polls");
                setLoading(false);
                const allPolls = response.data.data;
                setAllPolls(allPolls);
                updateRemainingTimes(setAllPolls);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchData();

        //if you want to update the timer every minute for expiry date
        //  const timer = setInterval(() => {
        //      updateRemainingTimes();
        //  }, 60000);
        //  return () => clearInterval(timer);

    }, [submitCount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { question, description, end_date, poll_options } = formData;
        const pollData = {
            question: question,
            description: description,
            end_date: end_date,
            poll_options: poll_options,
        };
        try {
            const response = await axiosClient.post("/polls", pollData);
            // console.log(response.data.message);
            handleSuccess("Poll created successfully and is live now");
            setFormData({
                question: "",
                description: "",
                end_date: "",
                poll_options: [
                    { poll_option_id: uuid(), option: "" },
                    { poll_option_id: uuid(), option: "" },
                ],
            });
            setSubmitCount(submitCount + 1);
        } catch (error) {
            handleError(error.response.data.message);
            //console.log(error.response.data.message);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "end_date") {
            const formattedDate = value.replace("T", " ") + ":00";
            setFormData((prev) => ({
                ...prev,
                [name]: formattedDate,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleOptionChange = (e, optionId) => {
        e.preventDefault();
        const { value } = e.target;
        setFormData((prev) => {
            const updatedOptions = prev.poll_options.map((option) => {
                if (option.poll_option_id === optionId) {
                    return { ...option, option: value };
                }
                return option;
            });
            return { ...prev, poll_options: updatedOptions };
        });
    };
    const handleAddOption = (e) => {
        e.preventDefault();
        setFormData((prev) => ({
            ...prev,
            poll_options: [
                ...prev.poll_options,
                { poll_option_id: uuid(), option: "" },
            ],
        }));
    };
    const handleRemoveOption = (e, optionId) => {
        e.preventDefault();
        setFormData((prev) => ({
            ...prev,
            poll_options: prev.poll_options.filter(
                (option) => option.poll_option_id !== optionId
            ),
        }));
    };

    const handleDeletePoll = async (pollId) => {
        try {
            const response = await axiosClient.delete(`/polls/${pollId}`);
            //console.log(response.data.message);\
            handleSuccess(response.data.message);
            setSubmitCount(submitCount + 1);
        } catch (error) {
            handleError(error.response.data.message);
            // console.log(error.response.data.message);
        }
    };


    
    //framer_moiton
    const sectionVariants = {
        initial : {
            x : '200%',
            opacity:0,
        },
        animate:{
            x : 0,
            opacity: 1,
            transition:{
                duration: 0.3,
            }
        },
        exit: {
            x: '200%',
            opacity: 0,
        }
    };
    
    const activePolls = allPolls.filter((poll) => poll.status === "active");
    const expiredPolls = allPolls.filter((poll) => poll.status === "off");

    return (
        <div className="polls_main_container">
            <h2>Create and Manage Polls</h2>
            <button
                className="create_new_poll_btn"
                onClick={handleCreateNewPoll}
            >
                Create a new poll
            </button>
            <AnimatePresence>
                {formIsOpen && (
                    <motion.div
                        className="poll_form_container"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h3>Add a new poll</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    Enter the Poll question or opinion
                                </label>
                                <br />
                                <input
                                    type="text"
                                    required
                                    name="question"
                                    value={formData.question}
                                    onChange={handleInputChange}
                                    placeholder="Poll question"
                                />
                            </div>
                            <div>
                                <label>Enter the Description</label>
                                <br />
                                <input
                                    type="text"
                                    required
                                    value={formData.description}
                                    name="description"
                                    onChange={handleInputChange}
                                    placeholder="Poll description"
                                />
                            </div>
                            <div>
                                <label>Select the poll Deadline</label>
                                <br />
                                <input
                                    type="datetime-local"
                                    required
                                    value={formData.end_date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().slice(0, 16)}
                                    name="end_date"
                                    placeholder="Enter the end date"
                                />
                            </div>
                            {formData.poll_options.map((value, index) => (
                                <div key={value.poll_option_id}>
                                    <label>
                                        Enter the poll option - {index + 1}
                                    </label>
                                    <br />
                                    <input
                                        onChange={(e) => {
                                            handleOptionChange(
                                                e,
                                                value.poll_option_id
                                            );
                                        }}
                                        type="text"
                                        value={value.option}
                                        required
                                        name="poll_option"
                                        placeholder="Enter the poll option"
                                    />
                                    {formData.poll_options.length > 2 && (
                                        <button
                                            className="remove_option_btn"
                                            onClick={(e) => {
                                                handleRemoveOption(
                                                    e,
                                                    value.poll_option_id
                                                );
                                            }}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                className="add_more_option_btn"
                                onClick={handleAddOption}
                            >
                                Add more option <FaPlus />
                            </button>

                            <button className="poll_submit_btn">
                                Create Poll <FaRegPaperPlane />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="all_poll_container">
                <h2>All polls</h2>
                {loading && <PreLoader text="fetching data from server" />}
                {!loading && (
                    <>
                        <h4 className="active_poll_title">
                            Active Polls &#128293;
                        </h4>
                        {activePolls.length === 0 ? (
                            <h4 className="no_polls">No active polls</h4>
                        ) : (
                            activePolls.map((value) => (
                                <>
                                    <div
                                        key={value.id}
                                        className="active_poll_div"
                                    >
                                        <h4>{value.question}</h4>
                                        <div className="poll_descriptions">
                                            <h5 className="active_poll_total_votes">
                                                Total votes : {value.totalVotes}
                                            </h5>
                                            <h5 className="active_poll_total_votes">
                                                Time remaining :{" "}
                                                {value.remainingTime}
                                            </h5>
                                        </div>
                                        {value.poll_options.map((innerVal) => (
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
                                                            {
                                                                innerVal.votes_count
                                                            }
                                                        </p>
                                                        <p>
                                                            Percentage:{" "}
                                                            {
                                                                innerVal.percentage
                                                            }
                                                            %
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>
                            ))
                        )}
                    </>
                )}

                {!loading && (
                    <>
                        <h4 className="expired_poll_title">
                            Expired Polls &#128128;
                        </h4>
                        {expiredPolls.length === 0 ? (
                            <h4 className="no_polls">No expired polls</h4>
                        ) : (
                            expiredPolls.map((value) => (
                                <>
                                    <div
                                        key={value.id}
                                        className="inactive_poll_div"
                                    >
                                        <div className="inactive_poll_delete_btn">
                                            <button
                                                className="remove_option_btn"
                                                onClick={() => {
                                                    handleDeletePoll(value.id);
                                                }}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                        <h4>{value.question}</h4>
                                        <h5 className="active_poll_total_votes">
                                            Total votes : {value.totalVotes}
                                        </h5>
                                        {value.poll_options.map((innerVal) => (
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
                                                            {
                                                                innerVal.votes_count
                                                            }
                                                        </p>
                                                        <p>
                                                            Percentage:{" "}
                                                            {
                                                                innerVal.percentage
                                                            }
                                                            %
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>
                            ))
                        )}
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};
export default Polls;

import { useState, useEffect } from "react";
import "../../styles/polls.css";
import { v4 as uuid } from "uuid";
import axiosClient from "../../axios-client";
import PreLoader from "../../components/Preloader";
import { FaRegTrashAlt, FaPlus, FaRegPaperPlane } from "react-icons/fa";

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
                console.log(allPolls);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchData();
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
        console.log(pollData);
        try {
            const response = await axiosClient.post("/polls", pollData);
            console.log(response.data.message);
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
            console.log(error.response.data.message);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "end_date") {
            const formattedDate = new Date(value)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

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

    return (
        <div className="polls_main_container">
            <h2>Create and Manage Polls</h2>
            <button
                className="create_new_poll_btn"
                onClick={handleCreateNewPoll}
            >
                Create a new poll
            </button>
            {formIsOpen && (
                <div className="poll_form_container">
                    <h3>Add a new poll</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Enter the Poll question or opinion</label>
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
                                    <button className="remove_option_btn"
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

                        <button className="add_more_option_btn" onClick={handleAddOption}>
                            Add more option <FaPlus />
                        </button>

                        <button className="poll_submit_btn">
                            Create Poll <FaRegPaperPlane />
                        </button>
                    </form>
                </div>
            )}
            <div className="all_poll_container">
                <h2>All polls</h2>
                {loading && <PreLoader text="fetching data from server" />}
                {!loading && (
                    <>
                        {allPolls.map((value) => (
                            <>
                                <p key={value.id}>
                                    Question: {value.question} status:{" "}
                                    {value.status}
                                </p>
                                {value.poll_options.map((innerVal) => (
                                    <>
                                        <p key={innerVal.id}>
                                            Option: {innerVal.option}{" "}
                                            Vote_count: {innerVal.votes_count}{" "}
                                        </p>
                                    </>
                                ))}
                            </>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
export default Polls;

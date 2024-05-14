import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate()
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const addTaskHandler = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You must be logged in to add a task.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/v1/tasks/add-task', {
                content
            }, {
                headers: {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            });

            if (response.status === 200) {
                setSuccess("Task added successfully!");
                setContent("");
                setError("");
            }
        } catch (error) {
            setError("An error occurred while adding the task. Please try again.");
            setSuccess("");
        }
        
    };

    return (
        <div className='bg-slate-200 h-screen'>
            <div className="container mx-auto px-4 py-6 w-4/5">
            <h1 className="text-2xl font-bold mb-4">Add Task</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md mb-4"
                placeholder="Task content"
            />
            <button
                onClick={addTaskHandler}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                Add Task
            </button>
            <button
                onClick={() => navigate(-1)}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                Go Back
            </button>
            
        </div>
        </div>
    );
};

export default AddTask;

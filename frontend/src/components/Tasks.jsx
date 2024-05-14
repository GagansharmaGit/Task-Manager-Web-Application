import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Taskitem from './Taskitem';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/tasks/allTasks', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (taskId, updatedContent) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/tasks/${taskId}`, {
        content: updatedContent 
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      const updatedTask = response.data.task;

      setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const redirectToAddTask = () => {
    navigate('/AddTask');
  };

  return (
    <div className='bg-slate-200 h-screen'>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            onClick={handleLogout}
            className="text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-600 focus:text-white font-medium rounded-full px-4 py-2"
          >
            Logout
          </button>
        </div>
        <button
          onClick={redirectToAddTask}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add Task
        </button>
        {tasks.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-5xl font-bold text-black">No Tasks Found</p>
          </div>
        ) : (
          tasks.map(task => (
            <Taskitem key={task._id} task={task} onDelete={() => handleDelete(task._id)} onEdit={(updatedContent) => handleEdit(task._id, updatedContent)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;

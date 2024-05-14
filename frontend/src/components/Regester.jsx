import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const Register = () => {
    const navigate = useNavigate()
    const regesterHandler = async ()=>{

        const response = await axios.post('http://localhost:3000/api/v1/user/register',{
            username,
            email,
            password
        })
        const token = response.data.token
        localStorage.setItem('token', token);
        navigate("/tasks")

    }
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-500 to-slate-700">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={regesterHandler}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                >
                    Register
                </button>
                <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                    Already a User?
                </Link>
            </div>
        </div>
    </div>
        
    );
}

export default Register;

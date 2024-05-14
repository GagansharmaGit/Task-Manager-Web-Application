import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        const response = await axios.post("http://localhost:3000/api/v1/user/login",{
            email,
            password
        })
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/tasks')


    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-600 to-slate-800">
        <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Login</h2>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <Link to="/regester" className="text-sm text-blue-500 hover:text-blue-700">
                    New User
                </Link>
            </div>
        </div>
    </div>
    );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import '../../index.css';
import licet from '../../assets/licet.png';
import licetcollege from '../../assets/licetcollege.png';
import { urls } from '../authentication/urls'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Define the regex for student email
        const studentEmailRegex = /^[a-z]+(\.\d{2}[a-z]{2,3})?@licet\.ac\.in$/;
        console.log('studentEmailRegex:', studentEmailRegex.test(email));

        // Define the appropriate URL based on the email type
        const loginUrl = studentEmailRegex.test(email)
            ? `${urls.BASE_URL}/student/signin/`
            : `${urls.BASE_URL}/login/`;
        
        try {
            const response = await axios.post(loginUrl, { email, password });
            const { session, data } = response.data;
            console.log('Login response:', response.data.session);
            // Handle the response based on the role and email type
            if (studentEmailRegex.test(email)) {
                if (data.role === 'student' || data.role === 'OB') {
                    localStorage.setItem('authToken', session.token);
                    localStorage.setItem('studentId', data.id);
                    localStorage.setItem('clubId', data.ClubId);
                    window.location.href = data.role === 'student' ? '/studentpage' : '/obfaculty';
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            } else {
                if (data.role === 'HOC') {
                    localStorage.setItem('authToken', session.token);
                    window.location.href = '/adminhome';
                } else if (data.role === 'faculty') {
                    localStorage.setItem('authToken', session.token);
                    localStorage.setItem('facultyId', data.id);
                    localStorage.setItem('clubId', data.clubId);
                    window.location.href = '/obfaculty';
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please check your credentials.');
        }
    };  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center mb-8">
                <img src={licet} alt="Logo" className="w-30 h-16" />
                <h1 className="text-4xl font-bold text-gray-800 mt-4">LICET STUDENTS WELFARE</h1>
            </div>
            <div className="bg-yellow-200 p-8 rounded shadow-md flex w-full max-w-4xl">
                <form onSubmit={handleLogin} className="flex-1 pr-8">
                    <h2 className="text-2xl font-bold mb-6">Sign in</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email/Username:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="mb-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Forgot Password</a>
                    </div>
                    <div className="mb-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Don't have an account? Click to create one</a>
                    </div>
                    <button type="submit" className="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SIGN IN
                    </button>
                </form>
                <div className="flex-1">
                    <img src={licetcollege} alt="College" className="rounded w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import '../../index.css';
import licet from '../../assets/licet.png';
import licetcollege from '../../assets/licetcollege.png';
import { urls } from '../authentication/urls';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for show/hide password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/signup');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const studentEmailRegex = /^[a-z]+(\.\d{2}[a-z]{2,3})@licet\.ac\.in$/;
        const facultyEmailRegex = /^[a-z]+(\.[a-z]{1,4})?@licet\.ac\.in$/;
        console.log('studentEmailRegex:', studentEmailRegex.test(email));

        let loginUrl;
        if (studentEmailRegex.test(email)) {
            loginUrl = `${urls.BASE_URL}/student/signin/`;
        } else if (facultyEmailRegex.test(email)) {
            loginUrl = `${urls.BASE_URL}/login/`;
        } else {
            setError('Invalid email format. Please enter a valid LICET email.');
            return;
        }

        try {
            const response = await axios.post(loginUrl, { email, password });
            const { session, data } = response.data;
            console.log('Login response:', response.data.session);

            if (studentEmailRegex.test(email)) {
                if (data.role === 'student' || data.role === 'OB') {
                    localStorage.setItem('authToken', session.token);
                    localStorage.setItem('studentId', data.id);
                    localStorage.setItem('clubId', data.ClubId);
                    navigate(data.role === 'student' ? '/studentpage' : '/obfaculty');
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            } else {
                if (data.role === 'HOC') {
                    localStorage.setItem('authToken', session.token);
                    navigate('/adminhome');
                } else if (data.role === 'faculty') {
                    localStorage.setItem('authToken', session.token);
                    localStorage.setItem('facultyId', data.id);
                    localStorage.setItem('clubId', data.clubId);
                    navigate('/obfaculty');
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
                <h1 className="text-4xl font-bold text-gray-800 mt-4">LICET STUDENT WELFARE</h1>
            </div>
            <div className="bg-yellow-200 p-8 rounded shadow-md flex w-full max-w-4xl">
                <form onSubmit={handleLogin} className="flex-1 pr-8">
                    <h2 className="text-2xl font-bold mb-6">Sign in</h2>
                    <div className="mb-4">
                        <label className="block text-gray-900 text-sm font-bold mb-2">Email/Username:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-900 text-sm font-bold mb-2">Password:</label>
                        <input 
                            type={showPassword ? 'text' : 'password'} // Toggle input type
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button 
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items- text-sm text-black"
                        >
                            {showPassword ? 'Hide' : 'Show'} {/* Show/hide text */}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="mb-4">
                        <button onClick={handleNavigation} className="text-sm text-blue-950 hover:text-gray-800">
                            Don't have an account? Click to create one
                        </button>
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

import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import licet from '../../assets/licet.png';
import licetcollege from '../../assets/licetcollege.png';
import { urls } from './urls';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[a-z]+(\.\d{2}[a-z]{2,3})@licet\.ac\.in$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear email error if the user starts typing
    if (name === 'email') {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (emailRegex.test(formData.email)) {
      localStorage.setItem('email', formData.email);
      localStorage.setItem('FormData', JSON.stringify(formData));
      try {
        const response = await axios.post(`${urls.BASE_URL}/otp/`, formData);
        if (response.status === 200) {
          navigate('/otp');
        } else {
          console.error('OTP failed:', response.data);
        }
      } catch (error) {
        console.error('OTP error:', error.response?.data || error.message);
      } finally {
        setIsSubmitting(false);
      } } else {
        try {
          const response = await axios.post(`${urls.BASE_URL}/faculty/signup/`, formData);
    
          if (response.status === 201) {
            navigate('/'); // Redirect to the home page or another route
          } else {
            console.error('Signup failed:', response.data);
          }
        } catch (error) {
          console.error('Signup error:', error.response?.data || error.message);
        } finally {
          setIsSubmitting(false);
        } }
    console.log(emailRegex.test(formData.email));
    setIsSubmitting(true);
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center mb-8">
        <img src={licet} alt="Logo" className="w-30 h-16" />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">LICET STUDENTS WELFARE</h1>
      </div>
      <div className="bg-yellow-200 p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        <div className="flex-1 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${emailError ? 'border-red-500' : ''}`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name:</label>
              <input 
                type="text" 
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name:</label>
              <input 
                type="text" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>
          <div className="mb-4">
                        <a href="/otp" className="text-sm text-gray-600 hover:text-gray-800">Verify Otp</a>
                    </div>
        </div>
        <div className="flex-1 p-4 hidden md:block">
          <img src={licetcollege} alt="College" className="rounded-lg w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

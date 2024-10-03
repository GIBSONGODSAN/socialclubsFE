import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import licet from '../../assets/licet.png';
import licetcollege from '../../assets/licetcollege.png';
import { urls } from './urls';

const Otp = () => {
    const email = localStorage.getItem('email');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const storedFormData = JSON.parse(localStorage.getItem('FormData'));
  
    const handleOtpChange = (e) => {
      setOtp(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // const encodedEmail = encodeURIComponent(email);
        const encodedOtp = encodeURIComponent(otp);
        const encodedFirstName = encodeURIComponent(storedFormData.first_name || '');
        const encodedLastName = encodeURIComponent(storedFormData.last_name || '');
        const encodedPassword = encodeURIComponent(storedFormData.password || '');
        const response = await axios.get(`${urls.BASE_URL}/otpverify/`, {
          params: {
            email: email,
            otp: encodedOtp,
            first_name: encodedFirstName,
            last_name: encodedLastName,
            password: encodedPassword
          },
        });

        if (response.status === 200) {
          // Handle the response as needed
          localStorage.setItem('id', response.data.data.id);
          navigate('/registerstudent');
        }
  
        // Handle the response as needed
        console.log(response.data);
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center mb-8">
        <img src={licet} alt="Logo" className="w-30 h-16" />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">LICET STUDENTS WELFARE</h1>
      </div>
      <div className="bg-yellow-200 p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify OTP</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email || ''}
          readOnly
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Verify OTP
      </button>
    </form>
        </div>
        <div className="flex-1 p-4 hidden md:block">
          <img src={licetcollege} alt="College" className="rounded-lg w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Otp;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urls } from './urls';
import { useNavigate } from 'react-router-dom';

const RegisterStudent = () => {
  const storedFormData = JSON.parse(localStorage.getItem('FormData'));
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    id: localStorage.getItem('id'),
    email: storedFormData.email,
    password: storedFormData.password,
    first_name: storedFormData.first_name,
    last_name: storedFormData.last_name,
    ClubId: '', 
    BatchId: '',
    rollNo: '',
    registerNumber: '',
    department: '',
    dob: '', // Date of Birth in yyyy-mm-dd format
    phoneNumber: '',
    bloodGroup: '',
    gender: ''
  });

  const [batchOptions, setBatchOptions] = useState([]);
  const [departments] = useState(['CSE', 'IT', 'MECH', 'ECE', 'EEE', 'AIDS']);
  const [bloodGroups] = useState([
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ]);
  const [genders] = useState(['Male', 'Female', 'Others']);
  const [clubs, setClubs] = useState([]); // State for clubs
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch batch options
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${urls.BASE_URL}/batch/`);
        setBatchOptions(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch batches:', error);
      }
    };

    fetchBatches();
  }, []);

  useEffect(() => {
    // Fetch clubs if both department and batch are selected
    if (formData.department && formData.BatchId) {
      const fetchClubs = async () => {
        try {
          const response = await axios.get(`${urls.BASE_URL}/quota/?batchId=${formData.BatchId}&department=${formData.department}`);
          setClubs(response.data.data || []);
        } catch (error) {
          console.error('Failed to fetch clubs:', error);
        }
      };

      fetchClubs();
    } else {
      // Clear clubs if department or batch is not selected
      setClubs([]);
    }
  }, [formData.department, formData.BatchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format date of birth
    const formattedDob = formatDate(formData.dob);

    // Update formData with the formatted DOB
    const updatedFormData = {
      ...formData,
      dob: formattedDob
    };

    try {
      console.log(updatedFormData);
      await axios.put(`${urls.BASE_URL}/student/signup/`, updatedFormData);
      // Handle successful response (e.g., show a success message or redirect)
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Student Registration</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="space-y-4">
          {/* Existing fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              readOnly
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
              readOnly
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
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll No:</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Register Number:</label>
            <input
              type="text"
              name="registerNumber"
              value={formData.registerNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Batch:</label>
            <select
              name="BatchId"
              value={formData.BatchId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <option value="">Select Batch</option>
              {batchOptions.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.batchYear}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Club:</label>
            <select
              name="ClubId"
              value={formData.ClubId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <option value="">Select Club</option>
              {clubs.map(club => (
                <option key={club.clubId__id} value={club.clubId__id}>{club.clubId__clubname}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group:</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <option value="">Select Gender</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStudent;

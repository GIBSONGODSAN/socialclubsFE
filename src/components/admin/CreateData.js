import React, { useState } from 'react';
import axios from 'axios';

const CreateData = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [facultyID, setFacultyID] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = '';
    let data = {};

    switch (selectedOption) {
      case 'year':
        url = 'http://127.0.0.1:8000/api/yeardata/';
        data = { year: parseInt(inputValue, 10) };
        break;
      case 'club':
        url = 'http://127.0.0.1:8000/api/club/';
        data = { clubname: inputValue, facultyID };
        break;
      case 'batch':
        url = 'http://127.0.0.1:8000/api/batch/';
        data = { batchYear: inputValue };
        break;
      default:
        setError('Please select a valid option');
        return;
    }
    console.log('Data to be submitted:', data);
    axios.post(url, data)
      .then(response => {
        // console.log('Response:', response.status);
        if (response.status === 201) {
          setSuccess('Data submitted successfully!');
          setError(null);
        } else {
          setSuccess(null);
          setError('Failed to submit data');
        }
      })
      .catch(error => {
        setSuccess(null);
        setError('An error occurred while submitting data');
      });
  };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-500 max-h-full mx-auto mt-8">
        <h1 className="text-2xl font-semibold text-blue-900 mb-4">Create Year/Batch/Club</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block text-lg mb-2">Select an Option:</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Choose an option--</option>
            <option value="year">Create Year</option>
            <option value="club">Create Club</option>
            <option value="batch">Create Batch</option>
          </select>
  
          {selectedOption === 'year' && (
            <div className="mb-4">
              <label className="block text-lg mb-2">Year:</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
  
          {selectedOption === 'club' && (
            <div className="mb-4">
              <label className="block text-lg mb-2">Club Name:</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-lg mb-2">Faculty ID:</label>
              <input
                type="text"
                value={facultyID}
                onChange={(e) => setFacultyID(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
  
          {selectedOption === 'batch' && (
            <div className="mb-4">
              <label className="block text-lg mb-2">Batch Year:</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
  
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

export default CreateData;

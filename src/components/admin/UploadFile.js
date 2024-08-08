import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
  const [batches, setBatches] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [selectedClubId, setSelectedClubId] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch batch data
    axios.get('http://127.0.0.1:8000/api/batch/')
      .then(response => {
        if (response.data.status.code === 200) {
          setBatches(response.data.data);
        } else {
          setError('Failed to fetch batches');
        }
      })
      .catch(error => {
        setError('An error occurred while fetching batches');
      });

    // Fetch club data
    axios.get('http://127.0.0.1:8000/api/club/')
      .then(response => {
        if (response.data.status.code === 200) {
          setClubs(response.data.data);
        } else {
          setError('Failed to fetch clubs');
        }
      })
      .catch(error => {
        setError('An error occurred while fetching clubs');
      });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedBatchId || !selectedClubId || !file) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('BatchId', selectedBatchId);
    formData.append('ClubId', selectedClubId);
    formData.append('file', file);

    axios.post('http://127.0.0.1:8000/api/uploadfile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        if (response.status === 201) {
          setSuccess('File uploaded successfully!');
          setError(null);
        } else {
          setSuccess(null);
          setError('Failed to upload file');
        }
      })
      .catch(error => {
        setSuccess(null);
        setError('An error occurred while uploading file');
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-h-full mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-blue-900 mb-4">Upload Students Data</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label className="block text-lg mb-2">Select Batch:</label>
        <select
          value={selectedBatchId}
          onChange={(e) => setSelectedBatchId(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Choose a batch--</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.batchYear}
            </option>
          ))}
        </select>

        <label className="block text-lg mb-2">Select Club:</label>
        <select
          value={selectedClubId}
          onChange={(e) => setSelectedClubId(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Choose a club--</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.clubname}
            </option>
          ))}
        </select>

        <label className="block text-lg mb-2">Upload File:</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
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

export default UploadFile;

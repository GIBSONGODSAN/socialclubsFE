import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
  const [batches, setBatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clubId = localStorage.getItem('clubId');

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
      .catch(() => {
        setError('An error occurred while fetching batches');
      });
  
    // Fetch event data only if selectedBatchId is available
    if (selectedBatchId) {
      axios.get(`http://127.0.0.1:8000/api/event/?clubId=${clubId}&batchId=${selectedBatchId}`)
        .then(response => {
          if (response.data.status.code === 200) {
            setEvents(response.data.data);
          } else {
            setError('Failed to fetch events');
          }
        })
        .catch(() => {
          setError('An error occurred while fetching events');
        });
    } else {
      setEvents([]); // Clear events if no batch is selected
    }
  }, [clubId, selectedBatchId]);  // Adding selectedBatchId to the dependency array
  

  const fetchStudents = (batchId) => {
    axios.post('http://127.0.0.1:8000/api/studentlist/', { ClubId: clubId, BatchId: batchId })
      .then(response => {
        if (response.data.status.code === 200) {
          setStudents(response.data.data);
        } else {
          setError('Failed to fetch students');
        }
      })
      .catch(() => {
        setError('An error occurred while fetching students');
      });
  };

  const handleBatchChange = (e) => {
    const batchId = e.target.value;
    setSelectedBatchId(batchId);
    fetchStudents(batchId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedBatchId || !selectedEventId || selectedStudents.length === 0) {
      setError('All fields are required');
      return;
    }

    const data = {
      ClubId: clubId,
      BatchId: selectedBatchId,
      EventId: selectedEventId,
      StudentIds: selectedStudents
    };

    axios.post('http://127.0.0.1:8000/api/markattendance/', data)
      .then(response => {
        if (response.status === 200) {
          setSuccess('Attendance marked successfully!');
          setError(null);
        } else {
          setSuccess(null);
          setError('Failed to mark attendance');
        }
      })
      .catch(() => {
        setSuccess(null);
        setError('An error occurred while marking attendance');
      });
  };

  const handleStudentSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStudents([...selectedStudents, value]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== value));
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Select Batch:</span>
          <select
            value={selectedBatchId}
            onChange={handleBatchChange}
            className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Choose a batch--</option>
            {batches.map(batch => (
              <option key={batch.id} value={batch.id}>{batch.batchYear}</option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Select Event:</span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Choose an event--</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.eventName}</option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Select Students:</span>
          {students.map(student => (
            <div key={student.id} className="flex items-center mt-2">
              <input
                type="checkbox"
                value={student.id}
                onChange={handleStudentSelection}
                className="form-checkbox"
              />
              <span className="ml-2">{student.first_name} {student.last_name}</span>
            </div>
          ))}
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
  
};

export default MarkAttendance;

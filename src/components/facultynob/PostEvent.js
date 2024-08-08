import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostEvent = () => {
  const [years, setYears] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [numberOfHours, setEventHours] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clubId = localStorage.getItem('clubId');

  useEffect(() => {
    // Fetch year data
    axios.get('http://127.0.0.1:8000/api/yeardata/')
      .then(response => {
        if (response.data.status.code === 200) {
          setYears(response.data.data);
        } else {
          setError('Failed to fetch years');
        }
      })
      .catch(() => {
        setError('An error occurred while fetching years');
      });

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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedYearId || !selectedBatchId || !eventName || !eventDate || !eventTime || !eventVenue || !eventDescription) {
      setError('All fields are required');
      return;
    }

    const data = {
      clubId: clubId,
      yearId: selectedYearId,
      batchID: selectedBatchId,
      eventName: eventName,
      eventDate: eventDate,
      eventTime: eventTime,
      eventVenue: eventVenue,
      numberOfHours: numberOfHours,
      eventDescription: eventDescription
    };

    axios.post('http://127.0.0.1:8000/api/event/', data)
      .then(response => {
        if (response.status === 201) {
          setSuccess('Event posted successfully!');
          setError(null);
        } else {
          setSuccess(null);
          setError('Failed to post event');
        }
      })
      .catch(() => {
        setSuccess(null);
        setError('An error occurred while posting the event');
      });
  };

  return (
    <div className="bg-yellow-50 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Post Event</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Year:
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={selectedYearId}
                onChange={(e) => setSelectedYearId(e.target.value)}
              >
                <option value="">--Choose a year--</option>
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Batch:
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
              >
                <option value="">--Choose a batch--</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batchYear}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Event Name:
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Event Venue:
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={eventVenue}
                onChange={(e) => setEventVenue(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Event Date:
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Event Time:
              </label>
              <input
                type="time"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Event Hours:
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={numberOfHours}
              onChange={(e) => setEventHours(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Event Description:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;

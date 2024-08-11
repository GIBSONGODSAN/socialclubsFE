import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostAnnouncement = () => {
  const [batches, setBatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [announcement, setAnnouncement] = useState('');
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
      .catch(error => {
        setError('An error occurred while fetching batches');
      });

    // Fetch event data
    if(selectedBatchId) {
    axios.get(`http://127.0.0.1:8000/api/event/?clubId=${clubId}&batchId=${selectedBatchId}`)
      .then(response => {
        if (response.data.status.code === 200) {
          setEvents(response.data.data);
        } else {
          setError('Failed to fetch events');
        }
      })
      .catch(error => {
        setError('An error occurred while fetching events');
      });
  } else {
    setEvents([]);
  } 
  }, [clubId, selectedBatchId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedBatchId || !selectedEventId || !announcement) {
      setError('All fields are required');
      return;
    }

    const data = {
      clubId: clubId,
      batchId: selectedBatchId,
      eventId: selectedEventId,
      announcement: announcement
    };

    axios.post('http://127.0.0.1:8000/api/announcements/', data)
      .then(response => {
        if (response.status === 201) {
          setSuccess('Announcement posted successfully!');
          setError(null);
        } else {
          setSuccess(null);
          setError('Failed to post announcement');
        }
      })
      .catch(error => {
        setSuccess(null);
        setError('An error occurred while posting the announcement');
      });
  };

  return (
    <div className="bg-yellow-50 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Post Announcement</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Event:
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              <option value="">--Choose an event--</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Announcement:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
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

export default PostAnnouncement;

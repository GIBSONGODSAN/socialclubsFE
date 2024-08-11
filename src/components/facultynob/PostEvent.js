import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostEvent = () => {
  const [years, setYears] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState('');
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [numberOfHours, setEventHours] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clubId = localStorage.getItem('clubId');

  useEffect(() => {
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

    axios.get('http://127.0.0.1:8000/api/club/')
      .then(response => {
        if (response.data.status.code === 200) {
          setCollaborators(response.data.data);
        } else {
          setError('Failed to fetch collaborators');
        }
      })
      .catch(() => {
        setError('An error occurred while fetching collaborators');
      });

    axios.get('http://127.0.0.1:8000/api/batch/')
      .then(response => {
        if (response.data.status.code === 200) {
          setAllBatches(response.data.data);
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

    if (!selectedYearId || !selectedCollaborators.length || !selectedBatches.length || !eventName || !eventDate || !eventTime || !eventVenue || !eventDescription || !numberOfHours || eventType === '') {
      setError('All fields are required');
      return;
    }

    const data = {
      clubId: clubId,
      yearId: selectedYearId,
      eventName: eventName,
      eventType: eventType,
      eventDate: eventDate,
      eventTime: eventTime,
      eventVenue: eventVenue,
      numberOfHours: numberOfHours,
      eventDescription: eventDescription,
      collaborators: selectedCollaborators,
      allBatches: selectedBatches
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

  const handleCollaboratorChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCollaborators(selected);
  };

  const handleBatchChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedBatches(selected);
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
                Select Clubs:
              </label>
              <select
                multiple
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={selectedCollaborators}
                onChange={handleCollaboratorChange}
              >
                {collaborators.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.clubname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Batches:
            </label>
            <select
              multiple
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedBatches}
              onChange={handleBatchChange}
            >
              {allBatches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batchYear}
                </option>
              ))}
            </select>
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
                Event Type:
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              >
                <option value="">--Choose an event type--</option>
                <option value="Training">Training</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Community Service">Community Service</option>
                <option value="Volunter Service">Volunter Service</option>
                <option value="Camp">Camp</option>
                <option value="Outreach">Outreach</option>
              </select>
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
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Post Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;

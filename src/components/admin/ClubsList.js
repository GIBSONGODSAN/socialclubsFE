import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventsList from './EventsList';

const ClubsList = () => {
    const [clubs, setClubs] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch clubs data on component mount
        axios.get('http://127.0.0.1:8000/api/club/')
            .then(response => {
                console.log('Clubs fetched successfully:', response.data);
                setClubs(response.data.data);
            })
            .catch(err => {
                console.error('Error fetching clubs:', err);
                setError('Error fetching clubs.');
            });
    }, []);

    const handleClubClick = (clubID) => {
        // Clear previous events and error before making a new request
        setSelectedEvents([]);
        setError('');

        // Fetch events data when a club is clicked
        axios.get(`http://127.0.0.1:8000/api/event/?clubId=${clubID}`)
            .then(response => {
                if (response.status === 200 && response.data) {
                    console.log('Events fetched successfully:', response.data.data);
                    setSelectedEvents(response.data.data);
                } else {
                    console.error('Unexpected response structure:', response);
                    setError('Unexpected response from server.');
                }
            })
            .catch(err => {
                console.error('Error fetching events:', err);
                if (err.response) {
                    // Server responded with a status other than 200 range
                    console.error('Server responded with:', err.response);
                    setError(`Error fetching events: ${err.response.statusText}`);
                } else if (err.request) {
                    // Request was made but no response was received
                    console.error('No response received:', err.request);
                    setError('No response received from server.');
                } else {
                    // Something happened in setting up the request
                    console.error('Error in request setup:', err.message);
                    setError('Error setting up request.');
                }
            });
    };

    return (
        <div className="p-4 border border-blue-500 rounded-md bg-white">
            <h2 className="text-xl font-bold mb-4">Clubs and Events</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap space-x-2 mb-4">
                {clubs.map(club => (
                    <button
                        key={club.id}
                        onClick={() => handleClubClick(club.id)}
                        className="bg-blue-900 text-white px-4 py-2 rounded-md mb-2"
                    >
                        {club.clubname}
                    </button>
                ))}
            </div>

            {selectedEvents.length > 0 && <EventsList events={selectedEvents} />}
        </div>
    );
};

export default ClubsList;

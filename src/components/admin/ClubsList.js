import React, { useState, useEffect } from 'react';

import axios from 'axios';
import EventsList from './EventsList';
import { urls } from '../authentication/urls'

const ClubsList = () => {
    const token = localStorage.getItem('authToken');
    const [clubs, setClubs] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch clubs data on component mount
        axios.get(`${urls.BASE_URL}/club/`, {
            headers: { Authorization: `Bearer ${token}`}
          })
            .then(response => {
                console.log('Clubs fetched successfully:', response.data);
                setClubs(response.data.data);
            })
            .catch(err => {
                console.error('Error fetching clubs:', err);
                setError('Error fetching clubs.');
            });
    }, [token]);

    const handleClubClick = (clubID) => {
        setSelectedEvents([]);
        setError('');
        setEventTypes([]);
    
        const handleError = (err, defaultErrorMessage) => {
            console.error(defaultErrorMessage, err);
            if (err.response) {
                setError(`Error: ${err.response.statusText}`);
            } else if (err.request) {
                setError('No response received from server.');
            } else {
                setError('Error setting up request.');
            }
        };
    
        // Execute both requests concurrently
        Promise.all([
            axios.get(`${urls.BASE_URL}/event/?clubId=${clubID}`, {
                headers: { Authorization: `Bearer ${token}`}
              }),
            axios.get(`${urls.BASE_URL}/eventtypes/?clubId=${clubID}`, {
                headers: { Authorization: `Bearer ${token}`}
              })
        ])
        .then(([eventsResponse, eventTypesResponse]) => {
            if (eventsResponse.status === 200 && Array.isArray(eventsResponse.data.data)) {
                setSelectedEvents(eventsResponse.data.data);
                console.log('Events fetched successfully:', eventsResponse.data.data);
            } else {
                setError('Unexpected response from server for events.');
            }
    
            if (eventTypesResponse.status === 200 && Array.isArray(eventTypesResponse.data.data)) {
                setEventTypes(eventTypesResponse.data.data);
                console.log('Event types fetched successfully:', eventTypesResponse.data.data);
            } else {
                setError('Unexpected response from server for event types.');
            }
        })
        .catch(err => handleError(err, 'Error fetching data:'));
    };

    return (
        <div>
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

                {eventTypes.length > 0 ? (
                    <ul>
                        {eventTypes.map((eventType, index) => (
                            <li key={index}>
                                {eventType.eventType}: {eventType.count}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No event types available.</p>
                )}
                {error && <p className="error">{error}</p>}

                {selectedEvents.length > 0 && <EventsList events={selectedEvents} />}
            </div>
        </div>
    );
};

export default ClubsList;

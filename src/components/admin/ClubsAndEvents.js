import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubsAndEvents = () => {
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch clubs data on component mount
        axios.get('http://127.0.0.1:8000/api/club/')
            .then(response => {
                setClubs(response.data.data);
            })
            .catch(err => {
                console.error('Error fetching clubs:', err);
                setError('Error fetching clubs.');
            });
    }, []);

    const handleClubClick = (clubID) => {
        // Clear previous events and error before making a new request
        setEvents([]);
        setError('');

        // Fetch events data when a club is clicked
        axios.get(`http://127.0.0.1:8000/api/event/?clubID=${clubID}`)
            .then(response => {
                setEvents(response.data.data);
            })
            .catch(err => {
                console.error('Error fetching events:', err);
                setError(`Error fetching events for club ID ${clubID}. Please try again.`);
            });
    };

    return (
        <div>
            <h2>Clubs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {clubs.map(club => (
                    <button key={club.id} onClick={() => handleClubClick(club.id)}>
                        {club.clubname}
                    </button>
                ))}
            </div>

            <h2>Events</h2>
            {events.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Event Time</th>
                            <th>Event Venue</th>
                            <th>Event Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>{event.eventName}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.eventTime}</td>
                                <td>{event.eventVenue}</td>
                                <td>{event.eventDescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClubsAndEvents;

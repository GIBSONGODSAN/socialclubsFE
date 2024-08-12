import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from '../authentication/urls'

const EventStudentsList = () => {
    const [events, setEvents] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const clubId = localStorage.getItem('clubId'); // Retrieve clubId from local storage
            try {
                const eventResponse = await axios.get(`${urls.BASE_URL}/eventclubs/?clubId=${clubId}`);
                setEvents(eventResponse.data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            if (selectedEventId) {
                const clubId = localStorage.getItem('clubId'); // Retrieve clubId from local storage
                try {
                    const studentResponse = await axios.get(`${urls.BASE_URL}/eventstudents/?eventId=${selectedEventId}&clubId=${clubId}`);
                    setStudents(studentResponse.data.data);
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            }
        };

        fetchStudents();
    }, [selectedEventId]);

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Students List</h2>
            <div className="mb-6">
                <label htmlFor="event-select" className="block text-lg font-medium text-gray-700 mb-2">
                    Select an Event
                </label>
                <select
                    id="event-select"
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    value={selectedEventId}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select an Event</option>
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.eventName}
                        </option>
                    ))}
                </select>
            </div>
    
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Participants:</h3>
            <ul className="space-y-2">
                {students.map((student) => (
                    <li key={student.id} className="p-3 bg-gray-100 rounded-md shadow-sm">
                        <span className="font-medium text-gray-800">{student.first_name} {student.last_name}</span>
                        <span className="block text-sm text-gray-600">
                            {student.department} ({student.rollNo})
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default EventStudentsList;

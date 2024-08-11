import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clubId = localStorage.getItem('clubId');

    axios.get(`http://127.0.0.1:8000/api/upcomingevents/?clubId=${clubId}`)
      .then(response => {
        if (response.data.status.code === 200) {
          setEvents(response.data.data);
        } else {
          setError('Failed to fetch announcements');
        }
      })
      .catch(error => {
        setError('An error occurred while fetching announcements');
      });
  }, []);

  return (
    <div className="p-4 border border-yellow-200 rounded-md bg-white">
            <h1 className="text-xl font-bold mb-4">Upcoming Events</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-300">Event Name</th>
                        <th className="px-4 py-2 border-b border-gray-300">Event Date</th>
                        <th className="px-4 py-2 border-b border-gray-300">Event Type</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((events) => (
                        <tr key={events.id} className="even:bg-gray-100">
                            <td className="px-4 py-2 border-b border-gray-300">{events.eventName}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{events.eventDate}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{events.eventType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default UpcomingEvents;

import React from 'react';

const EventsList = ({ events }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Events</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Event Name</th>
                        <th className="px-4 py-2 border-b">Event Date</th>
                        <th className="px-4 py-2 border-b">Event Time</th>
                        <th className="px-4 py-2 border-b">Event Venue</th>
                        <th className="px-4 py-2 border-b">Event Description</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id} className="even:bg-gray-100">
                            <td className="px-4 py-2 border-b">{event.eventName}</td>
                            <td className="px-4 py-2 border-b">{event.eventDate}</td>
                            <td className="px-4 py-2 border-b">{event.eventTime}</td>
                            <td className="px-4 py-2 border-b">{event.eventVenue}</td>
                            <td className="px-4 py-2 border-b">{event.eventDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventsList;

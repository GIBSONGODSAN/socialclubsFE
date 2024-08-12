import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from '../authentication/urls'

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clubId = localStorage.getItem('clubId');

    axios.get(`${urls.BASE_URL}/upcomingannouncements/?clubId=${clubId}`)
      .then(response => {
        if (response.data.status.code === 200) {
          setAnnouncements(response.data.data);
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
            <h1 className="text-xl font-bold mb-4">Announcements</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-300">Announcement</th>
                        {/* <th className="px-4 py-2 border-b border-gray-300">Event Name</th> */}
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement) => (
                        <tr key={announcement.id} className="even:bg-gray-100">
                            <td className="px-4 py-2 border-b border-gray-300">{announcement.announcement}</td>
                            {/* <td className="px-4 py-2 border-b border-gray-300">{announcement.event_name}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default StudentAnnouncements;

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import profileIcon from '../../assets/profile-icon.jpg';
import { urls } from '../authentication/urls'

const ViewAttendance = () => {
  const token = localStorage.getItem('authToken');
  const [studentData, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clubId = localStorage.getItem('clubId');
    const studentId = localStorage.getItem('studentId');

    if (clubId && studentId) {
      const fetchData = async () => {
        try {
          const studentResponse = await axios.get(`${urls.BASE_URL}/studentdata/?studentId=${studentId}`, {
            headers: { Authorization: `Bearer ${token}`}
          });
          if (studentResponse.data.status.code === 200) {
            setStudentData(studentResponse.data.data);
          } else {
            setError('Failed to fetch student data');
          }

          const attendanceResponse = await axios.post(`${urls.BASE_URL}/viewattendance/`, { clubId, studentId }, {
            headers: { Authorization: `Bearer ${token}`}
          });
          if (attendanceResponse.data.status.code === 200) {
            setAttendanceData(attendanceResponse.data.data);
          } else {
            setError('Failed to fetch attendance data');
          }
        } catch (error) {
          setError('An error occurred while fetching data');
        }
      };

      fetchData();
    } else {
      setError('Missing clubId or studentId in localStorage');
    }
  }, [token]);

  const pieData = attendanceData ? {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [attendanceData.attendancePercentage, 100 - attendanceData.attendancePercentage],
      backgroundColor: ['#FFCE56', '#36A2EB'],
      hoverBackgroundColor: ['#FFCE56', '#36A2EB']
    }]
  } : null;

  return (
    <div className="p-8 bg-yellow-100">
      <div className="flex flex-col items-center bg-white p-6 shadow-md rounded-lg">
        <div className="flex flex-row w-full">
          <div className="w-1/3">
            <img src={profileIcon} alt="Profile" className="rounded-full w-32 h-32 mb-4" />
          </div>
          <div className="w-2/3">
            <h2 className="text-red-500 text-xl font-bold">Role: Student</h2>
            {studentData && (
              <div className="mt-4">
                <p className="text-gray-700"><strong>Name:</strong> {studentData.first_name} {studentData.last_name}</p>
                <p className="text-gray-700"><strong>Roll No:</strong> {studentData.rollNo}</p>
                <p className="text-gray-700"><strong>Register Number:</strong> {studentData.registerNumber}</p>
                <p className="text-gray-700"><strong>Department:</strong> {studentData.department}</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-8">
          <h2 className="text-blue-900 text-lg font-bold">Attendance</h2>
          {error && <p className="text-red-500">{error}</p>}
          {attendanceData && (
            <div className="mt-4">
              <div className="w-64 h-64 mx-auto">
                <Pie data={pieData} />
              </div>
              <p className="mt-2 text-gray-700 text-center"><strong>No. Of Hours Completed:</strong> {attendanceData.hoursCompleted}</p>
              <table className="min-w-full bg-white border mt-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Volunteered</th>
                    <th className="py-2 px-4 border-b">Non-Volunteered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">
                      <ul>
                        {attendanceData.present.map(event => (
                          <li key={event} className="text-gray-700">{event}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <ul>
                        {attendanceData.absent.map(event => (
                          <li key={event} className="text-gray-700">{event}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;

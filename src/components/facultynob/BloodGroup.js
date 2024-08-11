import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodGroup = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('');
    const [bloodGroups, setBloodGroups] = useState(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch batch options
        axios.get('http://127.0.0.1:8000/api/batch/')
            .then(response => {
                setBatches(response.data.data);
            })
            .catch(err => {
                setError('Error fetching batch data');
            });
    }, []);

    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
    };

    const handleBloodGroupChange = (e) => {
        const bloodGroup = e.target.value;
        setSelectedBloodGroup(bloodGroup);

        const clubId = localStorage.getItem('clubId'); // Get clubId from localStorage

        if (selectedBatch && clubId && bloodGroup) {
            const encodedBloodGroup = encodeURIComponent(bloodGroup);
            // Fetch student data based on selected batch, club, and blood group
            axios.get(`http://127.0.0.1:8000/api/bloodgroups/?batchId=${selectedBatch}&clubId=${clubId}&bloodGroup=${encodedBloodGroup}`)
                .then(response => {
                    setStudentData(response.data.data);
                })
                .catch(err => {
                    setError('Error fetching student data');
                });
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Blood Group</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
    
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Batch:</label>
                <select
                    onChange={handleBatchChange}
                    value={selectedBatch}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">--Select Batch--</option>
                    {batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                            {batch.batchYear}
                        </option>
                    ))}
                </select>
            </div>
    
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Blood Group:</label>
                <select
                    onChange={handleBloodGroupChange}
                    value={selectedBloodGroup}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">--Select Blood Group--</option>
                    {bloodGroups.map((group, index) => (
                        <option key={index} value={group}>
                            {group}
                        </option>
                    ))}
                </select>
            </div>
    
            {studentData.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information:</h2>
                    <ul className="space-y-4">
                        {studentData.map((student, index) => (
                            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-700">
                                    <strong className="font-medium">Name:</strong> {student.first_name} {student.last_name}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium">Roll No:</strong> {student.rollNo}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium">Register Number:</strong> {student.registerNumber}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium">Department:</strong> {student.department}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium">Date of Birth:</strong> {student.dob}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium">Phone Number:</strong> {student.phoneNumber}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium">Gender:</strong> {student.gender}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
    
};

export default BloodGroup;

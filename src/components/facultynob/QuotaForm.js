import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../authentication/urls";

const QuotaForm = () => {
  const [batchId, setBatchId] = useState("");
  const [quotas, setQuotas] = useState([
    { department: "CSE", quota: 0 },
    { department: "ECE", quota: 0 },
    { department: "EEE", quota: 0 },
    { department: "MECH", quota: 0 },
    { department: "IT", quota: 0 },
    { department: "AIDS", quota: 0 },
  ]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${urls.BASE_URL}/batch/`);
        setBatches(response.data.data);
        if (response.data.data.length > 0) {
          setBatchId(response.data.data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch batches:", err);
        setError("Failed to fetch batches");
      }
    };

    fetchBatches();
  }, []);

  const handleQuotaChange = (index, value) => {
    const newQuotas = [...quotas];
    newQuotas[index].quota = value;
    setQuotas(newQuotas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clubId = localStorage.getItem("clubId");

    try {
      const response = await axios.post(`${urls.BASE_URL}/quota/`, {
        clubId,
        batchId,
        quotas,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Quota successfully updated!");
        setError(null);
      }
    } catch (err) {
      console.error("Failed to submit quotas:", err);
      setError("Failed to submit quotas");
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quota Form</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <div className="mb-4">
        <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
          Batch
        </label>
        <select
          id="batch"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.batchYear}
            </option>
          ))}
        </select>
      </div>

      {quotas.map((quota, index) => (
        <div key={quota.department} className="mb-4">
          <label
            htmlFor={`quota-${quota.department}`}
            className="block text-sm font-medium text-gray-700"
          >
            {quota.department} Quota
          </label>
          <input
            type="number"
            id={`quota-${quota.department}`}
            value={quota.quota}
            onChange={(e) => handleQuotaChange(index, parseInt(e.target.value, 10))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default QuotaForm;

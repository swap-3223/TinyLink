import React, { useEffect, useState } from "react";
import axios from "axios";

const HealthPage = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/healthz");
      setHealth(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch system health.");
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading)
    return <p className="p-6 text-lg font-semibold">Checking system health...</p>;

  if (error)
    return (
      <div className="p-6">
        <p className="text-red-500 font-bold mb-3">{error}</p>
        <button
          onClick={fetchHealth}
          className="bg-[#D8A35D] px-4 py-2 rounded-md font-semibold hover:bg-[#A0937D]"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6 bg-[#F9F6EF] min-h-screen">
      <h1 className="text-3xl font-bold text-[#1B1B1D] mb-6">System Health</h1>

      <div className="bg-white p-6 rounded-md shadow max-w-lg">
        <p className="mb-2">
          <span className="font-semibold">Status:</span>{" "}
          {health.ok ? "Healthy ✔️" : "Unhealthy ❌"}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Version:</span> {health.version}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Uptime:</span>{" "}
          {Math.floor(health.uptime)} seconds
        </p>

        <p className="mb-2 break-all">
          <span className="font-semibold">Timestamp:</span> {health.timestamp}
        </p>

        <button
          onClick={fetchHealth}
          className="mt-4 bg-[#D8A35D] px-4 py-2 rounded-md font-semibold hover:bg-[#A0937D]"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default HealthPage;

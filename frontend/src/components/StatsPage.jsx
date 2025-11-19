import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StatsPage = () => {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/links/${code}`);
      setData(res.data);
    } catch (err) {
      toast.error("Stats not found");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    const fullLink = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(fullLink);
    toast.success("Copied!");
  };

  useEffect(() => {
    fetchStats();
  }, [code]);

  if (loading)
    return <p className="p-6 text-lg font-medium">Loading stats...</p>;

  if (!data)
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold mb-4">Stats not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to Dashboard
        </Link>
      </div>
    );

  return (
    <div className="p-6 bg-[#F9F6EF] min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-[#1B1B1D] mb-4">
        Stats for "{code}"
      </h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl">
        <p className="mb-2">
          <span className="font-semibold">Short Code:</span> {data.code}
        </p>
        <p className="mb-2 break-all">
          <span className="font-semibold">Target URL:</span> {data.url}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Total Clicks:</span> {data.clicks}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Last Clicked:</span>{" "}
          {data.last_clicked || "-"}
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={copyLink}
            className="bg-[#D8A35D] px-4 py-2 rounded-md font-semibold hover:bg-[#A0937D] transition"
          >
            Copy Short Link
          </button>

          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="bg-[#1B1B1D] text-[#F9F6EF] px-4 py-2 rounded-md font-semibold hover:bg-black transition"
          >
            Open URL
          </a>
        </div>

        <Link
          to="/"
          className="inline-block mt-6 text-blue-600 underline font-medium"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default StatsPage;

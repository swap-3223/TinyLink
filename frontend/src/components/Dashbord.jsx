import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [customCode, setCustomCode] = useState("");

const fetchLinks = async () => {
  setLoading(true);
  try {
    const res = await axios.get('http://localhost:5000/api/links');
    // Extract the links array from response
    setLinks(Array.isArray(res.data.links) ? res.data.links : []);
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch links.");
    setLinks([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchLinks();
  }, []);

const handleAddLink = async () => {
  if (!newUrl) return toast.error("Enter a URL.");
  try {
    await axios.post(`http://localhost:5000/api/links`, {
      url: newUrl,
      code: customCode || undefined,
    });
    toast.success("Link added!");
    setNewUrl("");
    setCustomCode("");
    fetchLinks();
  } catch (err) {
    console.error(err);
    toast.error("Failed to add link.");
  }
};


  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:5000/api/links/${code}`);
      toast.success("Deleted successfully!");
      fetchLinks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete link.");
    }
  };

  return (
    <div className="p-6 bg-[#F9F6EF] min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-[#1B1B1D] mb-4">Dashboard</h1>

      {/* Add new link */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Enter URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="flex-1 p-2 border border-[#A0937D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8A35D]"
        />
        <input
          type="text"
          placeholder="Custom short code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="flex-1 p-2 border border-[#A0937D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8A35D]"
        />
        <button
          onClick={handleAddLink}
          className="bg-[#D8A35D] px-4 py-2 rounded-md font-semibold hover:bg-[#A0937D] transition"
        >
          Add
        </button>
      </div>

      {/* Links Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full divide-y divide-[#A0937D]">
          <thead className="bg-[#1B1B1D] text-[#F9F6EF]">
            <tr>
              <th className="px-4 py-2 text-left">Short Code</th>
              <th className="px-4 py-2 text-left">Target URL</th>
              <th className="px-4 py-2 text-left">Total Clicks</th>
              <th className="px-4 py-2 text-left">Last Clicked</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A0937D]">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : links.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No links found.
                </td>
              </tr>
            ) : (
               links.map((link) => (
  <tr key={link.code}>
    <td className="px-4 py-2">{link.code}</td>
    <td className="px-4 py-2 wrap-break-words">{link.url}</td>
    <td className="px-4 py-2">{link.clicks}</td>
    <td className="px-4 py-2">{link.last_clicked || "-"}</td>
    <td className="px-4 py-2">
      <button
        onClick={() => handleDelete(link.code)} // use code as identifier
        className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 transition"
      >
        Delete
      </button>
    </td>
  </tr>
))

            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
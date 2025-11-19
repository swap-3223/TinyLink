import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) {
      toast.error("Please enter a URL!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/shorten`, {
        original_url: url,
      });

      setShortUrl(res.data.shortUrl);
      toast.success("URL shortened!");
      setUrl("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to shorten URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F6EF] p-4">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-[#1B1B1D] mb-6">tinyLink</h1>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL"
          className="flex-1 p-3 rounded-md border border-[#A0937D] focus:outline-none focus:ring-2 focus:ring-[#D8A35D]"
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className="bg-[#D8A35D] text-[#1B1B1D] font-semibold px-6 py-3 rounded-md hover:bg-[#A0937D] transition"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 flex flex-col md:flex-row items-center gap-4 bg-[#1B1B1D] text-[#F9F6EF] p-4 rounded-md w-full max-w-xl">
          <p className="wrap-break-word">{shortUrl}</p>
          <button
            onClick={handleCopy}
            className="bg-[#D8A35D] text-[#1B1B1D] px-4 py-2 rounded-md hover:bg-[#A0937D] transition"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

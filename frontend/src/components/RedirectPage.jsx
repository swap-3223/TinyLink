import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
const API = "https://tinylink-1-xshp.onrender.com";

  const { code } = useParams();

  useEffect(() => {
    window.location.href = `${API}/${code}`;
  }, [code]);

  return <p className="p-6">Redirecting...</p>;
};

export default RedirectPage;

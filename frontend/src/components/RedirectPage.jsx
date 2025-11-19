import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  const { code } = useParams();

  useEffect(() => {
    window.location.href = `http://localhost:5000/${code}`;
  }, [code]);

  return <p className="p-6">Redirecting...</p>;
};

export default RedirectPage;

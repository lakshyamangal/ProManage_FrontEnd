import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
function DashboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const item = localStorage.getItem("token");
    if (!item) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default DashboardPage;

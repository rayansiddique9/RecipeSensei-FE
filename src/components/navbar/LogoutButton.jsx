import React from "react";
import "./navbar.css";

const LogoutButton = ({ handleLogout }) => {
  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;


import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  

  // Function to handle logout
  const handleLogout = async () => {
    console.log("Logout button clicked"); // Log to check if button click works
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are included in the request
      });

      if (response.ok) {
        console.log("Logged out successfully");
        // Use navigate to redirect to the login page after successful logout
        navigate("/login");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

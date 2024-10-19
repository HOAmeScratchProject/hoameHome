import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // Import routing components
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 const handleLogout = () => {
   setIsLoggedIn(false); // This will handle updating the state to reflect logged out status
 };
  // return (
  //   <div>
  //     {isLoggedIn ? (
  //       <Dashboard onLogout={handleLogout} />
  //     ) : (
  //       <Login onLogin={setIsLoggedIn} />
  //     )}
  //   </div>
  // );
  return (
    <Routes>
      {/* Redirect to dashboard if logged in, else redirect to login */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* Define the login route */}
      <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />

      {/* Define the dashboard route, with logout handling */}
      <Route
        path="/dashboard"
        element={<Dashboard onLogout={() => setIsLoggedIn(false)} />}
      />
    </Routes>
  );
};

export default App;

// try {
//   const response = await fetch(`http://localhost:3000/api/announcements`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: newTitle,
//       message: newMessage,
//     }),
//   });

// import Dashboard from "./components/Dashboard";
// const App = () => {
//   return (
//   <div>
//       <Dashboard/>
//   </div>
//   )
// };

// export default App;

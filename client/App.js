// import Dashboard from "./components/Dashboard";
// const App = () => {
//   return (
//   <div>
//       <Dashboard/>
//   </div>
//   )
// };

// export default App;

import React from 'react';
import Dashboard from "./components/DashBoard";

const App = () => {
  // Define the logout function
  const handleLogout = () => {
    console.log('User logged out');
    // Implement actual logout functionality here, like clearing user data or redirecting
  };

  return (
    <div>
      <Dashboard onLogout={handleLogout} /> {/* Pass the function as a prop */}
    </div>
  );
};

export default App;

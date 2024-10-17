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
// import { useState } from 'react';

const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); //login state


  // Define the logout function
  const handleLogout = () => {
    console.log('User logged out');
    // Implement actual logout functionality here, like clearing user data or redirecting
    //////// set isLoggedIn back to false
  };

  // //conditional rendering of Dashboard container if isLoggedIn = true.
  // {isLoggedIn ? (
  //   render Dashboard component
  // ) : (
  //   render Login component passing setIsLogged setter function as props
  // )}


  return (
    <div>

      <Dashboard onLogout={handleLogout} /> {/* Pass the function as a prop */}
    </div>
  );
};

export default App;

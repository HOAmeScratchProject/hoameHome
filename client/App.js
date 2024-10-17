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
<<<<<<< HEAD
import Dashboard from "./components/DashBoard";
// import { useState } from 'react';

const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); //login state


=======
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
>>>>>>> 2e18c88ba4b37816294cebd19577d2d4761e9d59
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
<<<<<<< HEAD

      <Dashboard onLogout={handleLogout} /> {/* Pass the function as a prop */}
=======
      {isLoggedIn ? (
        <Dashboard onLogout={setIsLoggedIn} />
      ) : (
        <Login onLogin={setIsLoggedIn} />
      )}
>>>>>>> 2e18c88ba4b37816294cebd19577d2d4761e9d59
    </div>
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

import React from 'react';
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={setIsLoggedIn} />
      ) : (
        <Login onLogin={setIsLoggedIn} />
      )}
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

// import Dashboard from "./components/Dashboard";
// const App = () => {
//   return (
//   <div>
//       <Dashboard/>
//   </div>
//   )
// };

// export default App;

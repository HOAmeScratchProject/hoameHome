import React, { useState, useEffect } from 'react';
import DirectoryCard from './DirectoryCard.jsx';

/*
  Component fetchs and displays a list of users
  from backend as cards using DirectoryCard
*/
const Directory = () => {
  // state to store list of users
  const [users, setUsers] = useState([]);

  // function to fetch users
  const getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`);
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data); // insert data into state
    } catch (error) {
      console.log('error fetching users:', error);
    }
  };

  return (
    <div className='cardContainer'>
      {/* if users exist, map through and render a DirectoryCard for each user */}
      {users.length > 0
        ? users.map((user) => (
            <DirectoryCard
              key={user.id} // unique key
              first_name={user.first_name} // prop
              street_address={user.street_address} // prop
              phone={user.phone}
              prop
            />
          ))
        : (getUsers(), (<p> LoadingUsers... </p>))}
    </div>
  );
};

export default Directory;

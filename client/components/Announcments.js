import React, { useState } from 'react';

const Annoucements = () => {
  const [annoucements] = useState([
    {
      date: 'October 5, 2024',
      message: 'Water main will be shut off for repairs starting at 7pm',
    },
    {
      date: 'October 8, 2024',
      message: 'Please note there will be maintenance on the UGLY PEDRAM',
    },
  ]);
  return (
    <div>
      {annoucements.map((annoucements, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};

export default Annoucements;

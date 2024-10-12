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
  // use map to make sure annoucements has date,message
  return (
    <div>
      {/* {annoucements.map((annoucements, index) => (
        <div key={index}></div>
      ))} */}
      <p>Did this appear???? WOW!!!</p>
    </div>
  );
};

export default Annoucements;

import React from 'react';

/*
  Displays individual user detials in card format
  It recives firstname, streetaddress, phone as props
  Designed to be used with directory 
*/

const DirectoryCard = ({ first_name, street_address, phone }) => {
  return (
    <div className='memberCard'>
      {/* display user's first name as card title */}
      <h2 className='messageTitle'>{first_name}</h2>
      <p>Unit Number: {street_address}</p>
      <p>Phone:{phone}</p>
    </div>
  );
};

export default DirectoryCard;

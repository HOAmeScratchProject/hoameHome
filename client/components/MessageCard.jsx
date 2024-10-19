import React from 'react';

/*
  Display message with title and datetime of creation
*/

const MessageCard = ({ message, datetime, title }) => {
  return (
    <>
      <h2 className='messageTitle'>{title}</h2>
      <p className='message'>{message}</p>
      <p className='messageDate'>{datetime}</p>
    </>
  );
};

export default MessageCard;

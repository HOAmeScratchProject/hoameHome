import React from 'react';
const MessageCard = ({ message, datetime, title }) => {
  return (
    <>
      <h2 className='messageTitle'>{title}</h2>
      <p>{message}</p>
      <p>{datetime}</p>
    </>
  );
};

export default MessageCard;

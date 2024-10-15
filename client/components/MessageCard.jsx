import React from 'react';
const MessageCard = ({message, datetime, title})=>{
    return(
        <div className='messageCard'>
          <h2>{title}</h2>
          <p>{datetime}</p>
          <p>{message}</p>
        </div>
    )
}

export default MessageCard;
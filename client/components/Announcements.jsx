import React, { useState,useEffect } from 'react';
import MessageCard from './MessageCard'


const Announcements = () => {

  const [announcements, setAnnouncements] = useState([])
  const getAnnouncements = async ()=> {
    console.log('get messages is working!!');
   try{
       const response = await fetch(`http://localhost:3000/api/announcements`);
       const data = await response.json();
       console.log('Fetched users:', data); 
       setAnnouncements(data);
   }
   catch (error) {
       console.log('error fetching users:', error );
   }
}

// const postMessage = async ()=>{
//   try{
    
//   }
//   catch{

//   }
// }

return (
  <div>
     <button>Add New Announcement</button>
     {announcements.length > 0 ? (announcements.map((message) => <MessageCard message={message.message} title={message.title} datetime={message.datetime}/>)
            ) : (
                getAnnouncements(),
                <p> Loading Announcements... </p>
            
            )}
    </div>
  );
};

export default Announcements;
// const [announcements] = useState([
//   {
//     date: 'October 5, 2024',
//     message: 'Water main will be shut off for repairs starting at 7pm',
//   },
//   {
//     date: 'October 8, 2024',
//     message: 'Please note there will be maintenance on the UGLY PEDRAM',
//   },
// ]);
// use map to make sure announcements has date,message

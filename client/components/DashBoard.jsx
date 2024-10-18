import React, { useState } from 'react';

import Announcements from './Announcements';
import Directory from './Directory';
//import BidsQuotes from './BidsQuotes';
import Documents from './Documents';
import Bids from './Bids';

const Dashboard = ({ onLogout }) => {
  //handle signout
  // state to track current active tab, default is announcements
  // buttons to switch tabs, upon switching making them the active tab
  const [activeTab, setActiveTab] = useState('Announcements');
  // const [users, setUsers] = useState([]);

  const handleClick = (e) => {
    // console.log(e.target.innerHTML)
    const currentTab = e.target.innerHTML;
    //getUsers();
    setActiveTab(currentTab);
  };

  const handleOptions = (e) => {
    console.log(e.target.value);
    setActiveTab(e.target.value);
  };
  const handleLogout = () => {
    onLogout(false);
  };

  return (
    <div className='dashboard'>
      <header>
        <h1 className='pageTitle'>Welcome HOAme Brian!</h1>
        <button onClick={handleLogout}>Sign Out</button>
      </header>

      <nav className='navigation'>
        <button className='tab' onClick={handleClick}>
          Announcements
        </button>
        <select onChange={handleOptions} className='select'>
          <option value='Announcement'>Select Tab</option>
          <option value='Documents'>Documents</option>
          <option value='MeetingMinutes'>Meeting Minutes</option>
          <option value='Bids'>Bids/Quotes</option>
        </select>

        <button onClick={handleClick} className='tab'>
          Directory
        </button>
      </nav>

      <div className='window'>
        {activeTab === 'Announcements' && <Announcements />}
        {activeTab === 'Documents' && <Documents />}
        {activeTab === 'Directory' && <Directory />}
        {activeTab === 'Bids' && <Bids />}
      </div>
    </div>
  );
};

export default Dashboard;

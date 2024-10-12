import React, { useState } from 'react';

import Annoucements from './Announcments';
import BidsQuotes from './BidsQuotes';
import Documents from './Documents';
import Meeting from './Meeting';

const Dashboard = (onLogout) => { //hande signout
    // state to track current active tab, defult is annoucements
    // buttons to switch tabs, upon switching making them the active tab
    const [activeTab, setActiveTab] = useState('annoucements');
    
    return (
        <div>
            <header>
                <h1>Welcome HOAme Brian!</h1>
                <button onClick= {onLogout}>Sign Out</button>
                    </header>

                <div>
                <button onClick= {() => setActiveTab('annoucements')}>Annoucements</button>
                <button onClick= {() => setActiveTab('documents')}>Documents</button>
                <button onClick= {() => setActiveTab('mintues')}>Meeting Minutes</button>
                <button onClick= {() => setActiveTab('bids')}>Bids/Quotes</button>
                    </div>

                    <div>
                        {activeTab === 'annoucements' && <Annoucements />}
                        {activeTab === 'documents' && <Documents />}
                        {activeTab === 'mintues' && <Meeting />}
                        {activeTab === 'bids' && <BidsQuotes />}
                        </div>
            </div>
    );
};

export default Dashboard;

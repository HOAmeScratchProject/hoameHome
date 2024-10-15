import React, { useState,useEffect } from 'react';
import DirectoryCard from './DirectoryCard.jsx'

const Directory = () =>{
   const [users, setUsers] = useState([]);
     const getUsers = async ()=>{

        try{
            const response = await fetch(`http://localhost:3000/api/users`);
            const data = await response.json();
            console.log('Fetched users:', data); 
            setUsers(data);
        }
        catch (error) {
            console.log('error fetching users:', error );
        }
    }

    
    return (
        <div>
            {users.length > 0 ? (users.map((user) => <DirectoryCard key={user.id} first_name={user.first_name} street_address={user.street_address} phone = {user.phone}/>)
            ) : (
                getUsers(),
                <p> LoadingUsers... </p>
            
            )}
        </div>
        // <p>{users}</p>
        
    )
};

export default Directory;

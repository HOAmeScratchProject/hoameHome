import React from 'react';
const DirectoryCard = ({first_name, street_address, phone})=>{
    return(
        <div className = 'memberCard'>
            <h2>{first_name}</h2>
            <p>Unit Number: {street_address}</p>
            <p>Phone:{phone}</p>
        </div>
    )
}

export default DirectoryCard;
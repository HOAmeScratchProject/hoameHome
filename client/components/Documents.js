import React, { useState } from 'react';

const Documents = () => {
    const [documents,setDocuments] = useState([]); // state for documents from SQL
    const [file, setFile] = useState(null) // state for file

    // function for file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // get chosen file
    }
    // function for upload to server
    const handleUpload = async () => {
        if(!file) {
            alert('Please select a file first!')
            return;
        }
         const formData = new FormData();
         formData.append('file', file);

        // send file to server (replace URL with the endpoint later)
         try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });
            // check resonse
            if(response.ok) { 
                alert('File uploaded successfully');
            } else {
                alert('Failed to upload file');
            }
         } catch (error) {
            console.error('error uploading files', error);
            alert('Error uploading file');
         }
    };

         // function to load documents from the db
         const loadDocuments = async () => {
            try{
                const response = await fetch('http://localhost:3000/documents');
                const docs = await response.json();
                setDocuments(docs);
            } catch (error) {
                console.error('error fetching docuemetns', error)
            }
         };
        
         return (
            <div>
                <h2>Documents HOAme</h2>
                </div>
         );
    }

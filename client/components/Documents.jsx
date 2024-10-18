import React, { useState, useEffect } from 'react';

const Documents = () => {
  const [documents, setDocuments] = useState([]); // state for documents from SQL
  const [file, setFile] = useState(null); // state for file

  // function for file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // get chosen file
  };
  // function for upload to server
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
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
      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('error uploading files', error);
      alert('Error uploading file');
    }
  };

  //when View Doc button is clicked in Documents component - renders the doc
  const viewDocuments = async (filename) => {
    console.log('CLICKED VIEW DOCS', filename);
    window.open(`http://localhost:3000/upload/${filename}`, '_blank');
  };

  // function to load documents from the db
  const loadDocuments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getDocs');
      const docs = await response.json();
      // console.log('HERE ARE THE DOCS', docs);
      // console.log('Did I capture the Doc Name?', docs[0].filename, docs[0].content_type, docs[0].file_size);
      const docsList = [];
      for (let i = 0; i < docs.length; i++) {
        docsList.push(
          <div key={i} className='documentCard'>
            <p>File Name: {docs[i].filename}</p>
            <p>Content Type: {docs[i].content_type},</p>
            <p>File Size: {docs[i].file_size}</p>
            <button
              onClick={() => viewDocuments(docs[i].filename)}
              className='viewButton'
            >
              View File
            </button>
          </div>
        );
      }
      // console.log('DOCSLIST??', docsList);
      setDocuments(docsList);
    } catch (error) {
      console.error('error fetching documents', error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div>
      <h2>Documents HOAme</h2>
      {/* {documents} */}
      {documents.length > 0 ? documents : <p>No Documents Available</p>}
    </div>
  );
};

export default Documents;

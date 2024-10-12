import { use } from 'bcrypt/promises';
import React, { useState } from 'react';

const Bids = () => {
    // to store title of the bid (ex: pothole)
    const [title, setTitle] = useState('');
    // to store a detailed description of the bid (ex: south side parking entrance pothole)
    const [description, setDescription] = useState('');
    // to store the amount of the bid (ex:$599)
    const [amount, setAmount] = useState('');
    //to store the uploaded file (ex: pdf or image)
    const [file, setFile] = useState(null);

    // stores the first file from input in the file state
    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    }
    //trigger when user submit the form
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
      <div>
        <h1>Submit a Bid/Quote</h1>
        <form>
          <div>
            <label>Title:</label>
            {/* //when input changes use setTitle to update title state */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Upload Quote (PDF/Image):</label>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="application/pdf, image/*"
              required
            />
          </div>
          <button type="submit">Submit Bid</button>
        </form>
      </div>
    );
}

export default Bids
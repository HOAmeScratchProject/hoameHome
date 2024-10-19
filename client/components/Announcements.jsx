import React, { useState, useEffect } from 'react';
import MessageCard from './MessageCard';

/*
  Manage and display a list of announcements, its does CRUD
  and displays them in the UI using a child component MessageCard
*/

const Announcements = () => {
  // state variables
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  // Function to fetch announcements from backend
  const getAnnouncements = async () => {
    // console.log('get messages is working!!');
    try {
      const response = await fetch(`http://localhost:3000/api/announcements`);
      const data = await response.json();
      console.log('Fetched users:', data);
      setAnnouncements(data); // insert the fetch into state
    } catch (error) {
      console.log('error fetching users:', error);
    } finally {
      setLoading(false); // change to false after fetch
    }
  };

  // use useEffect to fetch announcements when first render
  useEffect(() => {
    getAnnouncements();
  }, []);

  // function to handle adding new announcment
  const postMessage = async (e) => {
    e.preventDefault(); // prevent from from refresh

    if (!newTitle || !newMessage) {
      setError('Title & Message are required!'); // check for validation of both fields
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request for session management
        body: JSON.stringify({
          title: newTitle,
          message: newMessage,
        }),
      });

      // Log raw response for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (response.ok) {
        // resfresh announcements again to ensure the latest list is loaded
        getAnnouncements();
        //clear feilds and error after succesful post
        setNewTitle('');
        setNewMessage('');
        setError('');
      } else {
        console.log('Failed to post new Announcment');
        setError('Failed t post new annoucement, try again');
      }

      // update announcement stat to add new announcement(""""
      setError('');
    } catch (error) {
      console.log('error adding annoucement:', error);
      setError('Failed to add announcement, try again.');
    }
  };

  // Function to delete an announcement
  const deleteAnnouncement = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/announcements/${id}`, {
        method: 'DELETE',
      });

      // update state to remove deleted announcement from UI
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
    } catch (error) {
      console.log('Error deleting announcement:', error);
      setError('Failed to delete announcement. Please try again.');
    }
  };

  return (
    <div>
      <h1>Announcements</h1>
      {/* form to add new announcement */}
      <div className='announcementsBar'>
        <form onSubmit={postMessage}>
          <input
            type='text'
            placeholder='Title'
            value={newTitle}
            className='titleInput'
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder='Message'
            value={newMessage}
            className='messageArea'
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type='submit' className='submitButton'>
            Submit
          </button>
        </form>
      </div>

      {/* display error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* loading state of announcements */}
      <div className='messageWindow'>
        {loading ? (
          <p>Loading Announcements...</p>
        ) : announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className='messageCard'>
              {/* display message with MessageCard */}
              <MessageCard
                title={announcement.title}
                message={announcement.message}
                datetime={announcement.datetime}
              />
              {/* delete button for each announcement */}
              <button
                onClick={() => deleteAnnouncement(announcement.id)}
                className='deleteButton'
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;

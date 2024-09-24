import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './ReplyPage.css';

const Reply = () => {
  const [query, setQuery] = useState({});
  const [replyMessage, setReplyMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/queryHandle/getQueries/${id}`);
        if (result) {
          setQuery(result.data);
          console.log(JSON.stringify(query));
        }
      } catch (error) {
        console.log({ message: error.message });
        setResponseMessage('Failed to fetch the query. Please try again later.');
      }
    };
    fetchQuery();
  }, []);

  const sendNotify = async (e) => {
    e.preventDefault();
    if (replyMessage.trim() === '') {
      setResponseMessage('Reply message cannot be empty.');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3000/Admin-access/replyNotification', {
        userId: query.userId
      });

      if (result.data === "success") {
        setResponseMessage("Notification sent successfully!");
        setReplyMessage(''); // Clear the reply message after successful submission
      } else {
        setResponseMessage('Failed to send notification. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setResponseMessage('Failed to send notification. Please try again later.');
    }
  };

  return (
    <div className='message-box'>
      <div className='message-card'>
        <h2>From:</h2>
        <p>{query.email}</p>
        <h2>Subject:</h2>
        <p>{query.subject}</p>
        <h2>Message:</h2>
        <p>{query.message}</p>
        <form onSubmit={sendNotify}>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type your reply here..."
            required
          />
          <button type="submit">Reply</button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </div>
  );
}

export default Reply;


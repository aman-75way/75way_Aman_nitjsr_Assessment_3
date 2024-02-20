// MessageSender.tsx

import React, { useState } from 'react';
import axios from 'axios';
import './sendData.style.css'

export const SendData: React.FC = () => {
  const [chatName, setChatName] = useState('');
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/group/sendMessage', {
        chatName: chatName,
        message: [
          {
            sender: userName,
            content: content,
            timestamp: timestamp,
          },
        ],
      });

      console.log('Message sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-sender">
      <label htmlFor="chatId">Chat Name:</label>
      <input
        type="text"
        id="chatName"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        required
      />

      <label htmlFor="userId">User Name:</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <label htmlFor="timestamp">Timestamp:</label>
      <input
        type="text"
        id="timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        required
      />

      <button className='sbt-btn' type="button" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

// export default MessageSender;

// MessageSender.tsx

import React, { useState } from 'react';
import axios from 'axios';
import './sendData.style.css'

export const CreateChat: React.FC = () => {
  const [chatName, setChatName] = useState('');
  const [userName, setUserName] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/createChat', {
        chatName: chatName,
        userName : userName
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


      <button className='sbt-btn' type="button" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

// export default MessageSender;

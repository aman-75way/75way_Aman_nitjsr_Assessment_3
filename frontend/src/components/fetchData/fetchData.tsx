import React, { useState } from 'react';
import axios from 'axios';
import './fetchData.style.css'

export const FetchMessages: React.FC = () => {
  const [chat, setChat] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<any[]>([]); // Adjust the type as per your message structure
  const [messages , setMessage] = useState<any[]>([]);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchChatMessage', {
        chat: chat
      });
  
      const Messages = response.data.groupChat[0].messages;
      
      // console.log(Messages);
      setMessage(Messages);
      // Messages.forEach((message : any, index : number) => {
      //   console.log(`Message ${index + 1}: ${message.content}`);
      // });
      
      // setChatMessages(data); // Uncomment this line if you want to set state with the retrieved data
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };
  



  return (
    <div className="container">
    <label htmlFor="chatId">Chat Name :</label>
    <input
      type="text"
      id="chatId"
      name="chatId"
      value={chat}
      onChange={(e) => setChat(e.target.value)}
      required
      className="input-field"
    />
    <button type="button" onClick={fetchChatMessages} className="fetch-button">
      Fetch Messages
    </button>

    <div className="messages-container">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <p>{message.content}</p>
          <span className="sender-info">Sent by: {message.sender}</span>
          <span className="timestamp">{message.timestamp}</span>
        </div>
      ))}
    </div>
  </div>
  );
};

// export default FetchChatMessages;

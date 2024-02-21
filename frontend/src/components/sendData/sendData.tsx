// MessageSender.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sendData.style.css'
import { useSend_MessageMutation } from '../../Api/messageApi';

export const SendData: React.FC = () => {
  const [chatName, setChatName] = useState('');
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  // const [timestamp, setTimestamp] = useState('');
  const [send_Message , send_MessageResult] = useSend_MessageMutation();

  const sendMessage = async () => {
    try {
      // const response = await axios.post('http://localhost:5000/api/group/sendMessage', {
      //   chatName: chatName,
      //   message: [
      //     {
      //       sender: userName,
      //       content: content,
      //       timestamp: timestamp,
      //     },
      //   ],
      // });

      send_Message({
        chatName: chatName,
        message: [
          {
            sender: userName,
            content: content
          },
        ],
      })

      // console.log('Message sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  useEffect(()=>{
    if(send_MessageResult.isLoading === false && send_MessageResult.isSuccess === true){
      
      console.log(send_MessageResult);
      setChatName('');
      setUserName('');
      setContent('');
      
    }
  } , [send_MessageResult])

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

      {/* <label htmlFor="timestamp">Timestamp:</label>
      <input
        type="text"
        id="timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        required
      /> */}

      <button className='sbt-btn' type="button" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

// export default MessageSender;

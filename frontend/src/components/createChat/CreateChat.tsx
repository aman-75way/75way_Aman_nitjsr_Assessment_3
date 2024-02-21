import React, { useState } from 'react';
import axios from 'axios';
import './createChat.style.css'
import { NavbarLeft } from '../../navbar/leftPannel/leftSideNavbar';

const CreateChatForm: React.FC = () => {
  const [chatName, setChatName] = useState<string>('');
  const [participantNames, setParticipantNames] = useState<string>('');


  const handleCreateChat = async () => {
    try {
      // Validate chatName and participantNames here if needed
  
      // Convert participantNames to an array
      const participantArray = participantNames.split(',').map((name) => name.trim());
  
      console.log(participantArray);
  
      // Send a POST request to create the chat
      const response = await axios.post('http://localhost:5000/api/createChat', {
        chatName,
        participants: participantArray,
      });
  
      console.log(response.data);
  
      // Reset the form after successful creation
      setChatName('');
      setParticipantNames('');
      alert(`Chat With Name - ${chatName} created Successfully`)
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
  


  return (
    <>
      <div className='main-Chat-container'>
        <h2 className='heading'>Create Chat</h2>
        <form className='input-form'>
          <label htmlFor="chatName">Chat Name:</label>
          <input
            type="text"
            id="chatName"
            name="chatName"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            required
            />

          <label htmlFor="participantNames">Participant Names (comma-separated):</label>
          <input
            type="text"
            id="participantNames"
            name="participantNames"
            value={participantNames}
            onChange={(e) => setParticipantNames(e.target.value)}
            required
            />

          <button type="button" onClick={handleCreateChat}>
            Create Chat
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateChatForm;

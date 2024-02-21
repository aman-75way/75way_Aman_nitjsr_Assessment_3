// frontend/components/UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './grouplist.style.css';

export const GroupList = () => {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/group/groupName');
        console.log('Response Data:', response.data.response);
        setGroups(response.data.response);
        // setUsers(response.data.users);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchGroups();
  }, []);
  

  return (
    <div>
      <h2>Group List</h2>
   

    <div className="messages-container">
      {groups.map((group , index) => (
        <div key={index} className="message">
          <span className="sender-info">{index+1}  - Group Name :  {group.chatName}  </span>
        </div>
      ))}
    </div>

    </div>
  );
};


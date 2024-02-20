// frontend/components/UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userList.style.css';

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        console.log('Response Data:', response.data.response);
        setUsers(response.data.response);
        // setUsers(response.data.users);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div>
      <h2>User List</h2>
      
      {/* <div className="user-list-container">
      <ul>
        {users.map((user , index) => (
          <li key={index}>{user.name} </li>
        ))}
      </ul>
    </div> */}

    <div className="messages-container">
      {users.map((user, index) => (
        <div key={index} className="message">
          <span className="sender-info">{index+1}  - Name :   {user.name} </span>
          <span className="timestamp">Mobile - {user.mobile}</span>
        </div>
      ))}
    </div>

    </div>
  );
};

export default UserList;

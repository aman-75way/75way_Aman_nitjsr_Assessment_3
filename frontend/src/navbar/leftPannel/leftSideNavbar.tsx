// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const NavbarLeft: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/group/groupName'); // Replace with your actual endpoint
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/groupChat">Group Chat</Link>
        </li>
        <li>
          <Link to="/otherPage">Other Page</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>

      <div className="group-list">
        <h3>Group List</h3>
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <Link to={`/groupChat/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



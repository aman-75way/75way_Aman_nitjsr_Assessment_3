// src/components/Navbar.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.style.css';
import { NavbarLeft } from './leftPannel/leftSideNavbar';

const Navbar: React.FC = () => {
  const navigate =useNavigate()
  const[token,setToken]=useState<string | null>(null)


  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const logout= ()=>{
    localStorage.removeItem('token');
    console.log("current Token is : ")
    navigate('/login')
  }

  const rootStyles = document.documentElement.style;

  useEffect(() => {
    // Dynamically set CSS variables based on dark mode
    rootStyles.setProperty('--background-color', darkMode ? '#9290C3' : '#97BC62');
    rootStyles.setProperty('--header-color', darkMode ? '#535C91' : '#2C5F2D');
  }, [darkMode]);

  const authToken = localStorage.getItem("token")
  return (
    <>
      <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {authToken
          ?
          <>
            <li><Link to="/userList">UserList</Link></li>
            <li><Link to="/groupList">Group List</Link></li>
            <li><Link to="/createChat">Create Chat</Link></li>
            <li><Link to="/fetch">FetchData</Link></li>
            <li><Link to="/sendData">Send Data</Link></li>
            <li className='logout-list' onClick={logout}>Logout</li>
          </>
          :
          <>
            <li><Link to="/signUp">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
          }

        </ul>
      </nav>
    </>
  );
};

export default Navbar;

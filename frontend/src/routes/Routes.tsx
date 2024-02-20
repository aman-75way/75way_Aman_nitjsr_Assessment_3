// src/components/Routes.tsx
import React, { Children, Component, useEffect, useState } from 'react';
import {  Route, Routes as ReactRoutes , Navigate} from 'react-router-dom'; // Use a different name for the import
import { FetchMessages } from '../components/fetchData/fetchData';
import { SendData } from '../components/sendData/sendData';
import Home from '../components/home/home';
import About from '../components/about/about';
import Login from '../components/login/Login';
import { Signup } from '../components/register/Register';
import UserList from '../components/userList/userList';
import { CreateChat } from '../components/createChat/CreateChat';
// import ProtectedRoute from './ProtectedRoute.tsx';


const Routes_: React.FC = () => {
  
  return (

      <ReactRoutes> {/* Use the imported name here */}
        
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fetch" element={<FetchMessages />} />
        <Route path="/sendData" element={<SendData />} />
        <Route path="/userList" element={<UserList />} />


      </ReactRoutes> 

  );
};

export default Routes_;

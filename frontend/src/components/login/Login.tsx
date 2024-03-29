// src/components/Login.tsx
import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './login.style.css'; 
import { useNavigate , Link } from 'react-router-dom';


const Login: React.FC = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  // const { storeTokenInLocalStorage , userAuthentication } = useContext(UserContext);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        name,
        mobile,
        password
      });

      if(response){
        const data = await response.data;
         console.log("Responsed from login : " , data);
        
        // if(!localStorage.getItem("token")){
          const Usertoken = data.token;
          // userAuthentication(Usertoken);

          //  storeTokenInLocalStorage(Usertoken);
          localStorage.setItem('token' , Usertoken);
          //  setUserData({userDetails : "Hello"});
  
          console.log('Successful login');
          //  navigate('/success')
        // }
        // navigate('/profile');
        navigate('/about');
        
        //  console.log(response);

         setIsLogin(true);
        //  alert("Login Successful");
      }
      else{
        console.log("error",response)
        // alert(`${response.message}`)
      }
    } 
    
    catch (error: any) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
    
        if (responseData.message) {
          // Handle error with message
          console.error('Error with message:', responseData.message);
          alert(responseData.message);
        } else if (responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          // Handle validation errors
          const validationError = responseData.errors[0];
          console.error('Validation Error:', validationError);
          // You can extract information like validation error type, message, etc.
          const fieldPath = validationError.path;
          const errorMsg = validationError.msg;
          alert(`${fieldPath} :: ${errorMsg}`);
        } else {
          // Handle other types of errors in the response
          console.error('Unexpected error in response:', responseData);
          alert('Unexpected error occurred');
        }
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred');
      }
    }
    
    
    
  };

  return (
    <div className="login-container">
      
        <h2> Login </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className='form-component'
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className='form-component'
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="password"
            className='form-component'
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='form-component'>Login</button>
          <br></br>
        </form>
    </div>
  );
};

export default Login;

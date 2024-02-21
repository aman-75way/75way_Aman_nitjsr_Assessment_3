// src/components/Login.tsx
import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './login.style.css'; 
import { useNavigate , Link } from 'react-router-dom';
import { useLoginUserMutation } from '../../Api/authApi';


const Login: React.FC = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const [token , setToken] = useState<string>("");
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser , loginUserResult] = useLoginUserMutation();

  // const { storeTokenInLocalStorage , userAuthentication } = useContext(UserContext);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {

      // const response = await axios.post('http://localhost:5000/api/login', {
      //   name,
      //   mobile,
      //   password
      // });

      loginUser({name , mobile , password});

      // if(response){
      //   const data = await response.data;
      //    console.log("Responsed from login : " , data);
        
      //   // if(!localStorage.getItem("token")){
      //     const Usertoken = data.token;
      //     // userAuthentication(Usertoken);

      //     //  storeTokenInLocalStorage(Usertoken);
      //     localStorage.setItem('token' , Usertoken);
      //     //  setUserData({userDetails : "Hello"});
  
      //     console.log('Successful login');
      //     //  navigate('/success')
      //   // }
      //   // navigate('/profile');
      //   navigate('/about');
        
      //   //  console.log(response);

      //    setIsLogin(true);
      //   //  alert("Login Successful");
      // }
      // else{
      //   console.log("error",response)
      //   // alert(`${response.message}`)
      // }
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


  useEffect(()=>{
    if(loginUserResult.isLoading === false && loginUserResult.isSuccess === true){
        console.log("Login Successful " , loginUserResult.data);
        // console.log("Token is :  " , loginUserResult.data.token);
        const currToken = loginUserResult.data.token;
        console.log("Token : " , currToken);
        setToken(currToken);
        localStorage.setItem("token" , currToken);
         
          setName("");
          setMobile("");
          setPassword("");
          navigate('/about'); 
    }
  } , [loginUserResult])



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

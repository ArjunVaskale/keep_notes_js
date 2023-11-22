import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";
import { url } from '../config'


const SignupPage = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState('arjun');
  const [email, setEmail] = useState('arjun02@gmail.com');
  const [password, setPassword] = useState('Test@123');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    console.log(username , email , password);
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username" : username ,
        "email" : email , 
        "password" : password 
    })
    });
    const result = await response.json();
    console.log(JSON.stringify(result));
    if(result.message){
      alert(result.message);
    }else{
      localStorage.setItem('token' , JSON.stringify(result.token));
      navigate('/home')
    }
  }catch(e){
    alert(e.message);
  }
    
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
        <div style={{ marginTop : 10 }} onClick={()=>{navigate('/login')}}>
          <a style={{color : 'blue'}} >login</a>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;

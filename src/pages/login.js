import React, { useState  , useEffect } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import { url } from '../config'


const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      // console.log("login useEffect" , token);
     setItems(token);
     navigate("/home");
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      alert('Please Enter Username And Password.');
      return;
    }
    // Add your login logic here
    try{
      const data = await fetch(`${url}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": username,
          "password": password
        })
      })
      const result = await data.json();
      if(result.message){
        alert(result.message)
      }else{
        // console.log('result' , result.token);
        localStorage.setItem('token', JSON.stringify(result.token));
        navigate("/home");
      }
    }catch(err){
      alert(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
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
        <button type="submit">Login</button>
        <div style={{ marginTop : 10 }} onClick={()=>{navigate('/signup')}}>
          <a style={{color : 'blue'}} >new user ?</a>
        </div>
      </form>

    </div>
  );
};

export default LoginPage;

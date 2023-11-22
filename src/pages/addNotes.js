import React, { useEffect , useState } from 'react';
import { Navigate , useNavigate } from 'react-router-dom';
import './addNotes.css';
import { url } from '../config'

const AddNotesPage = () => {


  const navigate = useNavigate()
  const [token, setToken] = useState("");
  const [notes , setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log("list useEffect token" , token);
    if (token) {
     setToken(token);
    }
  }, [token]);

  const handleLogout = () => {
    // Handle logout button click
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToHome = () => {
    navigate('/home');
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTitle = async  () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${url}`, {
      method : 'POST' , 
      headers : {
        "token" : token , 
        'Content-Type' : 'application/json' 
      },
      body : JSON.stringify({
        item : inputValue
      })
    });
    const result = await response.json();
    alert(result.message);
    setInputValue(''); // Clear the input field after adding title
  };

  return (
    <div className="data-list-container">
      <h2>Add Notes</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter title"
          className="title-input"
        />
        <button className="add-button" onClick={handleAddTitle}>Add</button>
      </div>
      <div className="top-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="top-right">
        <button className="logout-button" onClick={goToHome}>Go To Home</button>
      </div>
    </div>
  );
};
export default AddNotesPage;
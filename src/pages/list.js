import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './list.css';
import { url } from '../config'
import { Oval } from 'react-loader-spinner'


const DataListPage = () => {
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' }
  ];
  const navigate = useNavigate()
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoader] = useState(false);


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log("list useEffect token", token);
    setLoader(true);
    if (token) {
      setToken(token);
      fetchData();
    }else{
      setLoader(false);
      navigate('/');
    }
    
  },[token]);

  const fetchData = async () => {
    try {
      // console.log("fetch Function ...", token);
      const res = await fetch(`${url}/user`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': token
        }
      });
      const data = await res.json();
      setNotes(data)
      setLoader(false);
      // console.log("fetched all the notes", data);
    } catch (err) {
      // console.log("fetched data error", err);
    }

  }

  const handleEdit = async (itemId, note) => {
    // Handle edit button click for the item with the given itemId
    const token = localStorage.getItem('token')
    // console.log(token);
    const newNote = prompt('Please enter new note', note)
    setNewNotes(newNote);
    const response = await fetch(`${url}/update`, {
      method: 'PUT',
      headers: {
        "token": token,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        "itemId": itemId,
        "newNote": newNote
      })
    });
    const result = await response.json();
    // console.log(`Edit item with ID: ${itemId}`);
    alert(result.message);
    fetchData();
  };

  const handleDelete = async (itemId) => {
    // console.log(itemId);
    // console.log(token);
    // Handle delete button click for the item with the given itemId
    const response = await fetch(`${url}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "delId": itemId
      })
    });
    const result = await response.json();
    // console.log(`Delete item with ID: ${itemId}`);
    alert(result.message);
    fetchData();
  };

  const handleLogout = () => {
    // Handle logout button click
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToAddNotes = () => {
    navigate('/addNotes');
  };

  return (
    <div className="data-list-container">

      {isLoading ? <Oval
        height={70}
        width={70}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      /> : <>
        <h2>Data List</h2>
        <ul>
          {notes.length > 0 ? notes.map(item => (
            <li key={item._id}>
              {item.note}
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEdit(item._id, item.note)}>Edit</button>
                <button className="delete-button" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(item._id) }}>Delete</button>
              </div>
            </li>
          )) : <p>No data</p>}
        </ul>
        <div className="top-right">
          <button onClick={goToAddNotes}>add new notes</button>
        </div>
        <div className="top-right">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </>}

    </div>
  );
};

export default DataListPage;

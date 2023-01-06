import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material';

import "./home.css"
const Home = () => {
    const [noteTxt, setNoteTxt] = useState('');
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch('https://keepnotesnode-production.up.railway.app/');
        const data = await res.json()
        setFetchedData(data)
        console.log(data);
    }

    const addNotes = async () => {
        await fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "item": noteTxt
            })
        }).then((res) => {
            console.log("Added API Response...", res)
            alert('Added successfully!!!')
            getData();
            setNoteTxt('')
        }).catch((err) => { console.log(err) })
    }

    const delNotes = async (id) => {
        await fetch('https://keepnotesnode-production.up.railway.app/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "delId": id
            })
        }).then((data) => {
            alert('deleted successfully!!!')
            console.log('Delete API Response...', data);
            getData();
        }).catch((err) => { alert(err) })
    }

    const updateNote = async (id) => {
        const newData = prompt('please enter new value here');
        await fetch('https://keepnotesnode-production.up.railway.app/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "itemId": id,
                "newNote": newData,
            })
        }).then((data) => {
            alert('updated successfully!!!')
            console.log('Delete API Response...', data);
            getData();
        }).catch((err) => { alert(err) })
    }



    // let navigate = useNavigate()
    // const goToContactPage = () => {
    //     navigate("Contact")
    // }
    return (
        <div className='container'>
            <div className='headingContainer'>
            <p className='header'>Home page</p>
            </div>
            {
                fetchedData.length > 0 ?
                    fetchedData.map((item, key) => (
                        <div key={key}>
                            <p >{item.note}</p>
                            <button onClick={() => { updateNote(item._id) }}>Edit</button>
                            <button onClick={() => { delNotes(item._id) }}>Delete</button><br />
                            <p>___________</p>
                        </div>

                    )) : <p>No data</p>

            }

            <TextField type='text'
                value={noteTxt}
                onChange={(e) => { setNoteTxt(e.target.value) }}
                id="standard-basic"
                label="Add New Notes"
                variant="standard" />
            <Button onClick={() => { addNotes() }} variant="contained">Add</Button>

            {/* <button onClick={()=>{goToContactPage()}}>Contact Me</button> */}
        </div>
    )
}

export default Home;
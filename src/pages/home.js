import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./home.css"
const Home = () => {

    const [noteTxt, setNoteTxt] = useState('');
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        getData();
    }, [])



    const getData = async () => {
        // const res = await fetch('https://keepnotesnode-production.up.railway.app/');  
        const res = await fetch('http://localhost:8080/');  
        const data = await res.json()
        setFetchedData(data)
        // console.log(data);
    }

    const addNotes = async () => {
        if (!noteTxt.length) {
            // console.log('length is ...', noteTxt.length);
            alert("Empty input!");
            return;
        }
        await fetch('https://keepnotesnode-production.up.railway.app/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "item": noteTxt
            })
        }).then((res) => {
            // console.log("Added API Response...", res)
            // alert('Added successfully!!!')
            toast("Added successfully!!!")
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
            toast('deleted successfully!!!')
            // console.log('Delete API Response...', data);
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
            toast('updated successfully!!!')
            // console.log('Delete API Response...', data);
            getData();
        }).catch((err) => { alert(err) })
    }

    // const notify = () => ;

    // let navigate = useNavigate()
    // const goToContactPage = () => {
    //     navigate("Contact")
    // }
    return (
        <div className='container'>
            <div className='headingContainer'>
                <text className='header'>KEEP NOTES</text>
            </div>
            
            {
                fetchedData.length > 0 ?
                    fetchedData.map((item, index) => (
                        <div key={index} style={{backgroundColor : index % 2 === 0 ? "#EFEDED" : "#DCDCDC" ,  padding : ".5%"}} >
                            <text>{index + 1} - {item.note}</text>
                            <button style={{margin :7 }} onClick={() => { updateNote(item._id) }}>Edit</button>
                            <button onClick={() => { delNotes(item._id) }}>Delete</button><br />
                        </div>

                    )) : <p>No data</p>

            }

            <TextField type='text'
                value={noteTxt}
                onChange={(e) => { setNoteTxt(e.target.value) }}
                id="standard-basic"
                label="Add New Notes"
                variant="standard" />
            
            {/* <Button style={{margin : 10}}  onClick={() => { addNotes() }} variant="contained">Add</Button> */}
            <button  onClick={() => { addNotes() }}  style={{ margin : 10 , width : '6%' , height : 36  , backgroundColor : 'yellow', borderRadius : 7 }} >ADD</button>
            <ToastContainer autoClose={3000} />

            {/* <button onClick={()=>{goToContactPage()}}>Contact Me</button> */}
        </div>
    )
}

export default Home;
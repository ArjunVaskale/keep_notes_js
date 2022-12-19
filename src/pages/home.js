import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Home =  () =>{

    useEffect( ()=>{
        getData()
    },[])

    const getData = async () =>{
        const res = await fetch('http://localhost:8080/' , {
            mode : 'no-cors',
            
        });
        const data = await res.json()

        
        console.log(data);
    }



//     fetch('http://localhost:8080/example', {
//         mode: 'no-cors',
//         method: "post",
//         headers: {
//              "Content-Type": "application/json"
//         },
//         body: JSON.stringify(ob)
// })

    const [noteTxt , setNoteTxt] = useState('')
    
    let navigate = useNavigate()
    const goToContactPage = () =>{
        navigate("Contact")
    }
    return(
        <>
        <p>Home page</p>
        <input 
            type='text' 
            value={noteTxt}
            onChange={(e)=>{setNoteTxt(e.target.value)}}
        />

        <button onClick={()=>{alert(noteTxt)}}>add notes</button>
        {/* <button onClick={()=>{goToContactPage()}}>Contact Me</button> */}
        </>
    )
}

export default Home ;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/home';
import Contact from './pages/Contact';
import Layout from './pages/Layout';
import Login from './pages/login' ; 
import Signup from './pages/signup' ; 
import List from './pages/list' ; 
import AddNotes from './pages/addNotes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} />
        <Route index element={<Login />} />
        <Route path='home' element={<List />} />
        <Route path='contact' element={<Contact />} />
        <Route path='addNotes' element={<AddNotes />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// FE :- https://keep-notes-js.vercel.app/
// BE :- keepnotesnode-production.up.railway.app

reportWebVitals();

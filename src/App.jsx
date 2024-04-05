import React from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Appheader from './Components/Appheader';
import Edit from './Components/Edit';
import AddCard from './Components/AddCard';
import { useState } from 'react';

export default function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center"></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
        <Routes>
          <Route path="/" element={<Home cards={cards}/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/edit/:id" element={<Edit/>} />
        <Route path='/add' element={<AddCard onAdd={handleAddCard}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


import Header from "./components/Header.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from '@emotion/styled';
import { FC } from 'react';
import Password from "./components/Password";
import Hobby from "./components/Hobby.js";
import Login from "./components/Login";
import Emptypage from "./components/Emptypage";
import Myhobby from "./components/Myhobby";
import Myinfo from "./components/EditInfo";


import "./App.css";


function App() {

  return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/password" element={<Password />} />
              <Route path="/hobby" element={<Hobby />} />    
              <Route path="/login" element={<Login />} />    
              <Route path="/emptypage" element={<Emptypage />} />    
              <Route path="/myhobby" element={<Myhobby />} />    
              <Route path="/myinfo" element={<Myinfo />} />    
            </Routes>
          </div>
        </BrowserRouter>
      );
    }

export default App

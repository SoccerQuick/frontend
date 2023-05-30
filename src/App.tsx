import * as React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import TeamPage from './Components/TeamPage/TeamPage';


// 커밋 테스트
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teampage" element={<TeamPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import TeamPage from './Pages/TeamPage';
// import Main from './Pages/Main';
// import Reviews from './Pages/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teampage" element={<TeamPage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teampage" element={<TeamPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/Main';
import ReviewPage from './Pages/Review';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import TeamPage from './Pages/TeamPage';
import Main from './Pages/mainlayout';
import GroundDetail from './Pages/groundDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teampage" element={<TeamPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/review" element={<ReviewPage />}></Route>
        <Route path="/groundDetail" element={<GroundDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

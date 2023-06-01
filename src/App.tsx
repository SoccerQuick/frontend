import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/Main';
import ReviewPage from './Pages/Review';
import Login from './Components/LoginPage/Login';
import Signup from './Components/RegisterPage/Signup';
import TeamPage from './Pages/TeamPage';
import SearchPage from './Pages/SearchPage';
import Main from './Pages/mainlayout';
import Admin from './Pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/ground" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/LoginPage/Login';
import Register from './Components/RegisterPage/Register';
import TeamPage from './Pages/TeamPage';
import MainPage from './Pages/Main';
import ReviewPage from './Pages/Review';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teampage" element={<TeamPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TeamPage from './Components/Teampage/TeamPage';

import Main from './Pages/Main';
import Reviews from './Pages/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teampage" element={<TeamPage />}></Route>
        <Route path="/" element={<Main />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

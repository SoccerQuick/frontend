import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TeamPage from './Pages/TeamPage';

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

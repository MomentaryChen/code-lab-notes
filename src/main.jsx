import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import AStarPage from './AStarPage.jsx';
import SortingPage from './SortingPage.jsx';
import GreedyPage from './GreedyPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<Navigate to="/algorithm" replace />} />
        <Route path="/algorithm" element={<App />} />
        <Route path="/algorithm/astar" element={<AStarPage />} />
        <Route path="/algorithm/sorting" element={<SortingPage />} />
        <Route path="/algorithm/greedy" element={<GreedyPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);


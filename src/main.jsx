import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.jsx';
import './styles/HomePage.css';
import HomePage from './pages/HomePage.jsx';
import AlgorithmLab from './pages/algorithm/AlgorithmLab.jsx';
import AStarPage from './pages/algorithm/AStarPage.jsx';
import SortingPage from './pages/algorithm/SortingPage.jsx';
import GreedyPage from './pages/algorithm/GreedyPage.jsx';
import OopPage from './pages/oop/OopPage.jsx';
import SpringBootPage from './pages/springboot/SpringBootPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/algorithm" element={<HomePage />} />
        <Route path="/algorithm/lab" element={<AlgorithmLab />} />
        <Route path="/algorithm/astar" element={<AStarPage />} />
        <Route path="/algorithm/sorting" element={<SortingPage />} />
        <Route path="/algorithm/greedy" element={<GreedyPage />} />
        <Route path="/oop" element={<OopPage />} />
        <Route path="/springboot" element={<SpringBootPage />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

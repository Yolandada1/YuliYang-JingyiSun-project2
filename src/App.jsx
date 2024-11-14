import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import GamePage from './pages/GamePage';
import NavigationBar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/game/:difficulty" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;

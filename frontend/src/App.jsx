import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import authService from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (authService.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegisterSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
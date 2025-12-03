import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import DashboardPage from './pages/DashboardPage';
import SessionPage from './pages/SessionPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemPage from './pages/ProblemPage';
import { useEffect, useState } from 'react';
import authService from './lib/auth';
import { StreamChatProvider } from './context/StreamChatContext';
import { StreamVideoProvider } from './context/StreamVideoContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);
      
      // If no token, ensure we're not on a protected route
      if (!loggedIn && window.location.pathname !== '/' && 
          window.location.pathname !== '/login' && 
          window.location.pathname !== '/register') {
        // Don't redirect here, let the route guards handle it
      }
    };
    
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <StreamChatProvider>
      <StreamVideoProvider>
        <div className="App">
          <Toaster />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/login" 
                element={
                  isLoggedIn ? 
                  <Navigate to="/dashboard" /> : 
                  <Login onLoginSuccess={handleLoginSuccess} />
                } 
              />
              <Route 
                path="/register" 
                element={
                  isLoggedIn ? 
                  <Navigate to="/dashboard" /> : 
                  <Register onRegisterSuccess={handleLoginSuccess} />
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  isLoggedIn ? 
                  <DashboardPage onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/session/:id" 
                element={
                  isLoggedIn ? 
                  <SessionPage /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/problems" 
                element={
                  isLoggedIn ? 
                  <ProblemsPage onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/problem/:id" 
                element={
                  isLoggedIn ? 
                  <ProblemPage onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </StreamVideoProvider>
      </StreamChatProvider>
  );
}

export default App;
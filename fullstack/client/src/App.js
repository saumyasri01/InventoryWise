import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BooksPage from './components/BooksPage';
import AuthorsPage from './components/AuthorsPage';
import Footer from './components/Footer.js';
import LoginPage from './components/LoginPage';
import QuickStatsScroller from './components/QuickStatsScroller';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('currentUser');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setIsModalOpen(false);
      toast.success(`Welcome back, ${storedUsername}!`,{
        position: "top-center"});
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
    localStorage.setItem('currentUser', loggedInUsername);
    setIsModalOpen(false);
    navigate('/');
    toast.success(`Welcome, ${loggedInUsername}!`,{
      position: "top-center"}
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('currentUser');
    setIsModalOpen(true);
    navigate('/');
    toast.info('You have been logged out.' ,{
      position: "top-center"});
  };

  return (
    <div className="App">
      <Navbar
        onLoginClick={toggleModal}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        username={username}
      />
      {isLoggedIn && <QuickStatsScroller />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
        </Routes>
      </main>
      <LoginPage
        isOpen={isModalOpen}
        onClose={toggleModal}
        onLogin={handleLogin}
      />
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
}

export default App;
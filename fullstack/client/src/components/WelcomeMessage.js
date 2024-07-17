// src/components/WelcomeMessage.js
//import React from 'react';
import './WelcomeMessage.css';

function WelcomeMessage() {
  return (
    <div className="welcome-message">
      <h1>Welcome to InventoryWise</h1>
      <h2 className="tagline">Simplify, Organize, Thrive</h2>
      <p className="description">
        InventoryWise is a user-friendly app designed to help bookstore employees efficiently manage their inventory.
      </p>
      <div className="features">
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Easy Book Management:</strong> Add, edit, and delete book details effortlessly.</li>
          <li><strong>Organized Catalog:</strong> Categorize books by genre, author, and more for easy browsing.</li>
          <li><strong>Multi-Device Access:</strong> Secure login allows employees to use the app on computers, tablets, and smartphones.</li>
        </ul>
      </div>
      <p className="outro">
        With InventoryWise, streamline your bookstore operations and ensure a smooth and efficient workflow.
      </p>
    </div>
  );
}

export default WelcomeMessage;
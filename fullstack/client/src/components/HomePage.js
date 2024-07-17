// src/components/HomePage.js
import React from 'react';
import Carousel from './Carousel';
import WelcomeMessage from './WelcomeMessage';
import libraryImage from '../images/Book1.jpg';
import image2 from '../images/book2.jpg';
import image3 from '../images/book3.jpg';
import image4 from '../images/book4.jpg';
import image5 from '../images/book5.jpg';
import image6 from '../images/Book6.jpg';
import image7 from '../images/book7.jpg';
import image8 from '../images/Book8.jpg';
import image9 from '../images/Book9.jpg';
import image10 from '../images/Book10.jpg';

function HomePage() {
  const carouselImages = [
    libraryImage,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10
  ];

  return (
    <main>
      <div className="main-content">
        <div className="explore-section">
          <WelcomeMessage />
        </div>
        <div className="carousel-container">
          <button className="new-arrivals-btn">New Arrivals</button>
          <Carousel images={carouselImages} />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
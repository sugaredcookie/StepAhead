import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import p1 from '../assets/gallery/1 (1).jpeg';
import p2 from '../assets/gallery/1 (2).jpeg';
import p3 from '../assets/gallery/1 (3).jpeg';
import p4 from '../assets/gallery/1 (4).jpeg';
import p5 from '../assets/gallery/1 (5).jpeg';
import p6 from '../assets/gallery/1 (6).jpeg';
import p7 from '../assets/gallery/1 (7).jpeg';
import p8 from '../assets/gallery/1 (8).jpeg';
import p9 from '../assets/gallery/1 (9).jpeg';
import p10 from '../assets/gallery/1 (10).jpeg';
import p11 from '../assets/gallery/1 (11).jpeg';
import p12 from '../assets/gallery/1 (12).jpeg';
import Navbar from '../Component/Navbar';

const Gallery = () => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const galleryImages = [
    { id: 1, src: p1, alt: 'Classroom activity' },
    { id: 2, src: p2, alt: 'Sports day' },
    { id: 3, src: p3, alt: 'Annual function' },
    { id: 4, src: p4, alt: 'Science lab' },
    { id: 5, src: p5, alt: 'Playground' },
    { id: 6, src: p6, alt: 'Library' },
    { id: 7, src: p7, alt: 'Morning assembly' },
    { id: 8, src: p8, alt: 'Art class' },
    { id: 9, src: p9, alt: 'Graduation ceremony' },
    { id: 10, src: p10, alt: 'Computer lab' },
    { id: 11, src: p11, alt: 'Music class' },
    { id: 12, src: p12, alt: 'Swimming competition' },
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentImage - 1 + galleryImages.length) % galleryImages.length;
    } else {
      newIndex = (currentImage + 1) % galleryImages.length;
    }
    setCurrentImage(newIndex);
  };

  function handleBackButton() {
    if (isAuthenticated) {
      navigate('/parentsDashboard');
    } else {
      navigate('/');
    }
  }

  return (
    <div className="gallery-page">
      {/* <Navbar /> */}
      <div className="gallery-container">
        <h1 className="gallery-title">School Gallery</h1>
        <p className="gallery-subtitle">Capturing memories of our vibrant school life</p>
        
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="gallery-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {lightboxOpen && (
          <div className="lightbox">
            <div className="lightbox-content">
              <button className="lightbox-close" onClick={closeLightbox}>
                &times;
              </button>
              <button 
                className="lightbox-nav prev" 
                onClick={() => navigateImage('prev')}
              >
                &#10094;
              </button>
              <img 
                src={galleryImages[currentImage].src} 
                alt={galleryImages[currentImage].alt}
              />
              <button 
                className="lightbox-nav next" 
                onClick={() => navigateImage('next')}
              >
                &#10095;
              </button>
              <div className="lightbox-caption">
                {galleryImages[currentImage].alt}
              </div>
            </div>
          </div>
        )}

        <button 
          className="back-button"
          onClick={handleBackButton}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Gallery;
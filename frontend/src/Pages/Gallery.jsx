import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import lab1 from '../assets/lab1.jpg'

const Gallery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
        // Check if user is authenticated (e.g., token exists)
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

  // Sample gallery data with different categories
  const galleryImages = [
    { id: 1, src: 'https://source.unsplash.com/random/800x600/?school,classroom', category: 'classroom', alt: 'Classroom activity' },
    { id: 2, src: 'https://source.unsplash.com/random/800x600/?school,sports', category: 'sports', alt: 'Sports day' },
    { id: 3, src: 'https://source.unsplash.com/random/800x600/?school,event', category: 'events', alt: 'Annual function' },
    { id: 4, src: lab1, category: 'facilities', alt: 'Science lab' },
    { id: 5, src: 'https://source.unsplash.com/random/800x600/?school,playground', category: 'sports', alt: 'Playground' },
    { id: 6, src: 'https://source.unsplash.com/random/800x600/?school,library', category: 'facilities', alt: 'Library' },
    { id: 7, src: 'https://source.unsplash.com/random/800x600/?school,assembly', category: 'events', alt: 'Morning assembly' },
    { id: 8, src: 'https://source.unsplash.com/random/800x600/?school,art', category: 'classroom', alt: 'Art class' },
    { id: 9, src: 'https://source.unsplash.com/random/800x600/?school,graduation', category: 'events', alt: 'Graduation ceremony' },
    { id: 10, src: 'https://source.unsplash.com/random/800x600/?school,computer', category: 'facilities', alt: 'Computer lab' },
    { id: 11, src: 'https://source.unsplash.com/random/800x600/?school,music', category: 'classroom', alt: 'Music class' },
    { id: 12, src: 'https://source.unsplash.com/random/800x600/?school,swimming', category: 'sports', alt: 'Swimming competition' },
  ];

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'classroom', name: 'Classroom' },
    { id: 'sports', name: 'Sports' },
    { id: 'events', name: 'Events' },
    { id: 'facilities', name: 'Facilities' },
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
      newIndex = (currentImage - 1 + filteredImages.length) % filteredImages.length;
    } else {
      newIndex = (currentImage + 1) % filteredImages.length;
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
    <div className="gallery-container">
      <h1 className="gallery-title">School Gallery</h1>
      <p className="gallery-subtitle">Capturing memories of our vibrant school life</p>
      
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
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
            <div className="image-overlay">
              <span className="image-category">{image.category}</span>
            </div>
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
              src={filteredImages[currentImage].src} 
              alt={filteredImages[currentImage].alt}
            />
            <button 
              className="lightbox-nav next" 
              onClick={() => navigateImage('next')}
            >
              &#10095;
            </button>
            <div className="lightbox-caption">
              {filteredImages[currentImage].alt}
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
  );
};

export default Gallery;
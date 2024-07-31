import React, { useState, useEffect } from 'react';
import bannerImage1 from '../../assets/banner_women.png';
import bannerImage2 from '../../assets/banner_mens.png';
import bannerImage3 from '../../assets/banner_kids.png';


import './Slider.css'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [bannerImage1, bannerImage2, bannerImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2700); // Change slide every 2.7 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container w-full">
      <div className="slider-images"
     >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`slide-image ${currentSlide === index ? 'active' : ''}`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          />
        ))}
      </div>
      <div className="pagination">
        {images.map((_,index) => (
          <span
            key={index}
            className={currentSlide === index ? 'dot active' : 'dot'}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
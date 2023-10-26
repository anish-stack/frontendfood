import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carsoul.css';
import img1 from '../../img/chatt-pooja-project-final.jpg';
import img2 from '../../img/trending-items123123.jpg';
import img3 from '../../img/trending-items2.jpg';

const carouselItems = [
  {
    id: 1,
    img: img1,
  },
  {
    id: 2,
    img: img2,
  },
  {
    id: 3,
    img: img3,
  },
];

const Carsoul = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Call nextSlide to move to the next slide
    }, 3000); // 3000 milliseconds (3 seconds)

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>
        Previous
      </button>
      <AnimatePresence initial={false}>
        {carouselItems.map((item, index) => (
          index === activeIndex && (
            <motion.div
              key={item.id}
              className="carousel-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="carousel-image" style={{ backgroundImage: `url(${item.img})` }}></div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      <button className="carousel-button next" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carsoul;

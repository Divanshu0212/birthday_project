import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Gallery Component with Dynamic Looping Animations
const EnhancedGallery = ({ galleryItems, handleImageClick }) => {
  const galleryRef = useRef(null);
  const galleryControls = useAnimation();
  const galleryInView = useInView(galleryRef, { once: false, amount: 0.2 });
  const [visibleItems, setVisibleItems] = useState([]);
  const [animationCycle, setAnimationCycle] = useState(0);
  
  useEffect(() => {
    if (galleryInView) galleryControls.start("visible");
    else galleryControls.start("hidden");
  }, [galleryInView, galleryControls]);

  // Initialize all items as visible
  useEffect(() => {
    if (galleryItems.length > 0) {
      setVisibleItems(galleryItems.map((_, index) => index));
    }
  }, [galleryItems]);

  // Cycle animations - create looping effect
  useEffect(() => {
    const animationInterval = setInterval(() => {
      // Randomly select 1-3 items to animate out
      const totalItems = galleryItems.length;
      const itemsToAnimate = Math.floor(Math.random() * 3) + 1; // 1 to 3 items
      
      let newVisibleItems = [...visibleItems];
      
      // If we have less than 50% visible, add some back
      if (newVisibleItems.length < totalItems / 2) {
        // Add back some random items
        const hiddenItems = Array.from(Array(totalItems).keys())
          .filter(idx => !newVisibleItems.includes(idx));
        
        const itemsToAdd = Math.min(Math.floor(Math.random() * 3) + 1, hiddenItems.length);
        
        for (let i = 0; i < itemsToAdd; i++) {
          if (hiddenItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * hiddenItems.length);
            newVisibleItems.push(hiddenItems[randomIndex]);
            hiddenItems.splice(randomIndex, 1);
          }
        }
      } else {
        // Remove some items
        for (let i = 0; i < itemsToAnimate; i++) {
          if (newVisibleItems.length > Math.max(3, totalItems * 0.3)) { // Keep at least 30% visible
            const randomIndex = Math.floor(Math.random() * newVisibleItems.length);
            newVisibleItems.splice(randomIndex, 1);
          }
        }
      }
      
      setVisibleItems(newVisibleItems);
      setAnimationCycle(prev => prev + 1);
    }, 3000); // Animation cycle every 3 seconds
    
    return () => clearInterval(animationInterval);
  }, [visibleItems, galleryItems.length]);

  // Gallery section with full viewport styling
  const galleryStyles = {
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '40px 20px'
  };

  // Animation variants - different for each image
  const animations = [
    // Falling from top
    {
      hidden: { y: -300, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.1 + Math.random() * 0.3
        }
      },
      exit: {
        y: -300,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 10
        }
      }
    },
    // Bounce in
    {
      hidden: { scale: 0, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 10,
          delay: 0.1 + Math.random() * 0.3
        }
      },
      exit: {
        scale: 0,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }
    },
    // Fade in and rotate
    {
      hidden: { opacity: 0, rotate: -10 },
      visible: { 
        opacity: 1, 
        rotate: 0, 
        transition: { 
          duration: 0.8,
          delay: 0.1 + Math.random() * 0.3
        }
      },
      exit: {
        opacity: 0,
        rotate: 10,
        transition: {
          duration: 0.6
        }
      }
    },
    // Slide in from left
    {
      hidden: { x: -200, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
          type: "spring", 
          stiffness: 120,
          delay: 0.1 + Math.random() * 0.3
        }
      },
      exit: {
        x: -200,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 100
        }
      }
    },
    // Slide in from right
    {
      hidden: { x: 200, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
          type: "spring", 
          stiffness: 120,
          delay: 0.1 + Math.random() * 0.3
        }
      },
      exit: {
        x: 200,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 100
        }
      }
    },
    // Pop up from bottom
    {
      hidden: { y: 200, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
          type: "spring", 
          stiffness: 200,
          damping: 20,
          delay: 0.1 + Math.random() * 0.3
        }
      },
      exit: {
        y: 200,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 180,
          damping: 15
        }
      }
    }
  ];

  // Randomly assign an animation to each gallery item
  const getRandomAnimation = (index) => {
    const seed = (index + animationCycle) % animations.length;
    return animations[seed];
  };

  return (
    <section id="gallery" ref={galleryRef} style={galleryStyles}>
      <div className="container">
        <motion.div 
          className="section-title" 
          initial="hidden" 
          animate={galleryControls} 
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
        >
          <h2>Memories Gallery</h2>
          <p>Some of our favorite moments together</p>
        </motion.div>
        
        <div className="gallery" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          padding: '20px 0',
          minHeight: '600px'
        }}>
          {galleryItems.map((item, index) => (
            <motion.div
              className="gallery-item"
              key={index}
              initial="hidden"
              animate={visibleItems.includes(index) ? "visible" : "exit"}
              variants={getRandomAnimation(index)}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                transition: { duration: 0.3 }
              }}
              onClick={() => handleImageClick(item.src, item.title)}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              <div style={{
                width: '100%',
                height: '0',
                paddingBottom: '75%',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={item.src} 
                  alt={item.title} 
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div className="gallery-caption" style={{
                padding: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 5px', fontSize: '18px' }}>{item.title}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedGallery;
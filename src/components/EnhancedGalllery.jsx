import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

// Gallery Component with Dynamic Looping Animations and Reshuffling
const EnhancedGallery = ({ galleryItems, handleImageClick }) => {
    const galleryRef = useRef(null);
    const galleryControls = useAnimation();
    const galleryInView = useInView(galleryRef, { once: false, amount: 0.2 });
    const [visibleItems, setVisibleItems] = useState([]);
    const [itemPositions, setItemPositions] = useState([]);

    useEffect(() => {
        if (galleryInView) galleryControls.start("visible");
        else galleryControls.start("hidden");
    }, [galleryInView, galleryControls]);

    // Initialize all items as visible and set initial positions
    useEffect(() => {
        if (galleryItems.length > 0) {
            setVisibleItems(galleryItems.map((_, index) => index));

            // Initialize positions in a grid layout
            const initialPositions = galleryItems.map((_, index) => {
                return {
                    id: index,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0
                };
            });

            setItemPositions(initialPositions);
        }
    }, [galleryItems]);

    // Reshuffle positions every 0.5 seconds
    useEffect(() => {
        const reshuffleInterval = setInterval(() => {
            setItemPositions(prevPositions => {
                return prevPositions.map(item => {
                    return {
                        ...item,
                        x: Math.random() * 20 - 10, // Random position shift between -10px and 10px
                        y: Math.random() * 20 - 10,
                        rotate: Math.random() * 6 - 3, // Slight rotation between -3 and 3 degrees
                        scale: 0.95 + Math.random() * 0.1 // Scale between 0.95 and 1.05
                    };
                });
            });
        }, 500); // Reshuffle every 0.5 seconds

        return () => clearInterval(reshuffleInterval);
    }, []);

    // Gallery section with full viewport styling
    const galleryStyles = {
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '40px 20px'
    };

    // Different animation variants for each image
    const animations = [
        // Bouncing animation
        {
            hidden: { y: -100, opacity: 0 },
            visible: (custom) => ({
                y: [0, -20, 0, -10, 0],
                opacity: 1,
                transition: {
                    y: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 2,
                        ease: "easeOut",
                        repeatDelay: Math.random() * 0.5
                    },
                    opacity: { duration: 0.5 }
                }
            })
        },
        // Pulse animation
        {
            hidden: { scale: 0, opacity: 0 },
            visible: (custom) => ({
                scale: [1, 1.05, 1],
                opacity: 1,
                transition: {
                    scale: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 1.5,
                        ease: "easeInOut",
                        repeatDelay: Math.random() * 0.3
                    },
                    opacity: { duration: 0.5 }
                }
            })
        },
        // Wobble animation
        {
            hidden: { rotate: -10, opacity: 0 },
            visible: (custom) => ({
                rotate: [0, 2, -2, 1, -1, 0],
                opacity: 1,
                transition: {
                    rotate: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 2.5,
                        ease: "easeInOut",
                        repeatDelay: Math.random() * 0.4
                    },
                    opacity: { duration: 0.5 }
                }
            })
        },
        // Floating animation
        {
            hidden: { y: 50, opacity: 0 },
            visible: (custom) => ({
                y: [0, -15, 0],
                opacity: 1,
                transition: {
                    y: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 3,
                        ease: "easeInOut",
                        repeatDelay: Math.random() * 0.2
                    },
                    opacity: { duration: 0.5 }
                }
            })
        },
        // Shake animation
        {
            hidden: { x: 50, opacity: 0 },
            visible: (custom) => ({
                x: [0, 5, -5, 3, -3, 0],
                opacity: 1,
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.8,
                        ease: "easeInOut",
                        repeatDelay: Math.random() * 0.6
                    },
                    opacity: { duration: 0.5 }
                }
            })
        },
        // Flip animation
        {
            hidden: { rotateY: 90, opacity: 0 },
            visible: (custom) => ({
                rotateY: [0, 10, 0, -10, 0],
                opacity: 1,
                transition: {
                    rotateY: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 2.2,
                        ease: "easeInOut",
                        repeatDelay: Math.random() * 0.5
                    },
                    opacity: { duration: 0.5 }
                }
            })
        }
    ];

    // Assign a unique animation to each gallery item
    const getAnimation = (index) => {
        return animations[index % animations.length];
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
                    minHeight: '600px',
                    position: 'relative'
                }}>
                    <AnimatePresence>
                        {galleryItems.map((item, index) => (
                            <motion.div
                                className="gallery-item"
                                key={index}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                variants={getAnimation(index)}
                                style={{
                                    x: itemPositions[index]?.x || 0,
                                    y: itemPositions[index]?.y || 0,
                                    rotate: itemPositions[index]?.rotate || 0,
                                    scale: itemPositions[index]?.scale || 1,
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    position: 'relative'
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    zIndex: 10,
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                    transition: { duration: 0.3 },
                                }}
                                onClick={() => handleImageClick(item.src, item.title)}
                                layoutId={`gallery-item-${index}`}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    mass: 1
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
                                        src={item.src || "/placeholder.svg"}
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
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default EnhancedGallery;

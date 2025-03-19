import React, { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMusic } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView, useAnimation } from 'framer-motion';
import EnhancedGallery from './components/EnhancedGalllery'; // Import the new component
import './App.css';

const App = () => {
  
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ src: '', caption: '' });

  // Refs for scroll detection
  const messageRef = useRef(null);
  const timelineRef = useRef(null);
  const wishesRef = useRef(null);
  const playlistRef = useRef(null);

  // Animation controls
  const messageControls = useAnimation();
  const timelineControls = useAnimation();
  const wishesControls = useAnimation();
  const playlistControls = useAnimation();

  // In-view hooks
  const messageInView = useInView(messageRef, { once: false, amount: 0.2 });
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.2 });
  const wishesInView = useInView(wishesRef, { once: false, amount: 0.2 });
  const playlistInView = useInView(playlistRef, { once: false, amount: 0.2 });

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date("March 20, 2025 00:00:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Gallery Image Click
  const handleImageClick = (src, caption) => {
    setModalContent({ src, caption });
    setModalOpen(true);
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.1 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Trigger animations when in view
  useEffect(() => {
    if (messageInView) messageControls.start("visible");
    else messageControls.start("hidden");
  }, [messageInView, messageControls]);

  useEffect(() => {
    if (timelineInView) timelineControls.start("visible");
    else timelineControls.start("hidden");
  }, [timelineInView, timelineControls]);

  useEffect(() => {
    if (wishesInView) wishesControls.start("visible");
    else wishesControls.start("hidden");
  }, [wishesInView, wishesControls]);

  useEffect(() => {
    if (playlistInView) playlistControls.start("visible");
    else playlistControls.start("hidden");
  }, [playlistInView, playlistControls]);

  // Data
  const galleryItems = [
    { src: 'IMG_20241202_142228902_HDR.jpg', title: 'Our Trip to the Beach', date: 'Summer 2024' },
    { src: 'IMG_20241205_092037673_HDR.jpg', title: 'Family Dinner', date: 'December 2023' },
    { src: 'IMG-20231218-WA0009.jpg', title: 'Hiking Adventure', date: 'Spring 2024' },
    { src: 'IMG-20240819-WA0166.jpg', title: 'Concert Night', date: 'October 2024' },
    { src: 'IMG-20240907-WA0187.jpg', title: 'Coffee Date', date: 'January 2024' },
    { src: 'IMG-20240930-WA0035.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20241010-WA0017.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20241027-WA0012.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20241030-WA0019.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20241203-WA0091.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20250119-WA0337.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20250217-WA0010.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20250304-WA0003.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20250310-WA0009.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG-20250314-WA0059.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG20241202141226.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG20241205130739.jpg', title: 'Birthday Party', date: 'March 2024' },
    { src: 'IMG20241205144919.jpg', title: 'Birthday Party', date: 'March 2024' },
  ];

  const timelineItems = [
    { year: '2010', text: 'Family vacation where we got lost...', side: 'left' },
    { year: '2015', text: 'Stayed up all night talking...', side: 'right' },
    { year: '2018', text: 'Concert where we danced...', side: 'left' },
    { year: '2020', text: 'Weekly video calls during lockdown...', side: 'right' },
    { year: '2023', text: 'Incredible road trip...', side: 'left' },
    { year: '2024', text: 'More adventures to come...', side: 'right' },
  ];

  const wishes = [
    { from: 'Mom', text: 'Happy birthday to my beautiful daughter...' },
    { from: 'Dad', text: 'To my amazing daughter...' },
    { from: 'Best Friend', text: 'Happy birthday to my crazy, fun friend...' },
    { from: 'Grandma', text: 'Wishing my sweet granddaughter...' },
  ];

  const playlist = [
    'Birthday by The Beatles',
    'Count On Me by Bruno Mars',
    'Happy by Pharrell Williams',
    'Sisters by Rosemary Clooney',
    'You have Got a Friend by James Taylor',
  ];

  return (
    <div className="App">
      {/* Header */}
      <header id="home">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <motion.div className="header-content" initial="hidden" animate="visible" variants={fadeInUp}>
          <h1>Happy Birthday!</h1>
          <p className="subtitle">Wishing you a wonderful day filled with joy and happiness</p>
          <div className="birthday-countdown">
            <div className="countdown-item">
              <span>{countdown.days}</span>
              <span>Days</span>
            </div>
            <div className="countdown-item">
              <span>{countdown.hours}</span>
              <span>Hours</span>
            </div>
            <div className="countdown-item">
              <span>{countdown.minutes}</span>
              <span>Minutes</span>
            </div>
            <div className="countdown-item">
              <span>{countdown.seconds}</span>
              <span>Seconds</span>
            </div>
          </div>
        </motion.div>
        <div className="scroll-down" onClick={() => window.scrollTo({ top: document.getElementById('gallery').offsetTop, behavior: 'smooth' })}>
          <FontAwesomeIcon icon={faChevronDown} size="2x" />
        </div>
      </header>

      {/* Enhanced Gallery Component */}
      <EnhancedGallery galleryItems={galleryItems} handleImageClick={handleImageClick} />

      {/* Modal */}
      {modalOpen && (
        <motion.div
          className="modal active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
        >
          <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <span className="modal-close" onClick={() => setModalOpen(false)}>×</span>
            <img src={modalContent.src} alt={modalContent.caption} />
            <div className="modal-caption">{modalContent.caption}</div>
          </motion.div>
        </motion.div>
      )}

      {/* Message */}
      <section id="message" ref={messageRef}>
        <div className="container">
          <motion.div className="section-title" initial="hidden" animate={messageControls} variants={fadeInUp}>
            <h2>A Special Message</h2>
            <p>From me to you</p>
          </motion.div>
          <motion.div className="message-container" initial="hidden" animate={messageControls} variants={fadeInUp}>
            <p>Dear Sister,</p>
            <p>On your special day, I want to tell you how much you mean to me...</p>
            <p>Your kindness, strength, and humor inspire me every day...</p>
            <p>Happy Birthday! I love you!</p>
            <p>Your sibling</p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" ref={timelineRef}>
        <div className="container">
          <motion.div className="section-title" initial="hidden" animate={timelineControls} variants={fadeInUp}>
            <h2>Our Journey Together</h2>
            <p>A timeline of special moments</p>
          </motion.div>
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <motion.div
                className={`timeline-item ${item.side}`}
                key={index}
                initial="hidden"
                animate={timelineControls}
                variants={{
                  hidden: { opacity: 0, x: item.side === 'left' ? -50 : 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 + index * 0.2 } },
                }}
              >
                <div className="timeline-content">
                  <h3>{item.year}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes */}
      <section id="wishes" ref={wishesRef}>
        <div className="container">
          <motion.div className="section-title" initial="hidden" animate={wishesControls} variants={fadeInUp}>
            <h2>Birthday Wishes</h2>
            <p>From everyone who loves you</p>
          </motion.div>
          <div className="wishes-container">
            {wishes.map((wish, index) => (
              <motion.div
                className="wish-card"
                key={index}
                initial="hidden"
                animate={wishesControls}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{wish.from}</h3>
                <p>{wish.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Playlist */}
      <section id="playlist" ref={playlistRef}>
        <div className="container">
          <motion.div className="section-title" initial="hidden" animate={playlistControls} variants={fadeInUp}>
            <h2>Birthday Playlist</h2>
            <p>Songs that remind me of you</p>
          </motion.div>
          <motion.div className="playlist-container" initial="hidden" animate={playlistControls} variants={fadeInUp}>
            <ul className="song-list">
              {playlist.map((song, index) => (
                <motion.li
                  className="song-item"
                  key={index}
                  whileHover={{ backgroundColor: '#f9f7fe' }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon icon={faMusic} style={{ marginRight: '15px', color: '#ff69b4' }} />
                  <span>{song}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>Made with ❤️ for my amazing sister. Happy Birthday!</p>
          <p>© 2025 - Your Secret Birthday Surprise</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
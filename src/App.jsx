"use client"

import { useEffect, useState, useRef } from "react"
import Confetti from "react-confetti"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faMusic } from "@fortawesome/free-solid-svg-icons"
import { motion, useInView, useAnimation } from "framer-motion"
import EnhancedGallery from "./components/EnhancedGalllery" // Make sure path is correct
import "./App.css"

// Add this CSS to your App.css or create a new file
const scrollSnapStyles = `
  html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  
  section, header {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`

const App = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ src: "", caption: "" })
  const [currentSection, setCurrentSection] = useState("home")
  const [isScrolling, setIsScrolling] = useState(false)

  // Refs for scroll detection
  const homeRef = useRef(null)
  const galleryRef = useRef(null)
  const messageRef = useRef(null)
  const timelineRef = useRef(null)
  const wishesRef = useRef(null)
  const playlistRef = useRef(null)

  // Animation controls
  const messageControls = useAnimation()
  const timelineControls = useAnimation()
  const wishesControls = useAnimation()
  const playlistControls = useAnimation()

  // In-view hooks
  const messageInView = useInView(messageRef, { once: false, amount: 0.2 })
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.2 })
  const wishesInView = useInView(wishesRef, { once: false, amount: 0.2 })
  const playlistInView = useInView(playlistRef, { once: false, amount: 0.2 })

  // Add scroll snap CSS to document
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = scrollSnapStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // Implement section-based scrolling
  useEffect(() => {
    const sections = [
      { id: "home", ref: homeRef },
      { id: "gallery", ref: galleryRef },
      { id: "message", ref: messageRef },
      { id: "timeline", ref: timelineRef },
      { id: "wishes", ref: wishesRef },
      { id: "playlist", ref: playlistRef },
    ]

    const handleScroll = () => {
      if (isScrolling) return

      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Find the current section
      for (const section of sections) {
        if (!section.ref.current) continue

        const element = section.ref.current
        const offsetTop = element.offsetTop
        const offsetBottom = offsetTop + element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          if (currentSection !== section.id) {
            setCurrentSection(section.id)

            // Scroll to this section
            setIsScrolling(true)
            element.scrollIntoView({ behavior: "smooth" })

            // Reset scrolling flag after animation completes
            setTimeout(() => {
              setIsScrolling(false)
            }, 1000)

            break
          }
        }
      }
    }

    // Throttle scroll event
    let scrollTimeout
    const throttledScroll = () => {
      if (scrollTimeout) return

      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 100)
    }

    window.addEventListener("scroll", throttledScroll)
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [currentSection, isScrolling])

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date("March 20, 2025 00:00:00").getTime()
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      if (distance < 0) return

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle Gallery Image Click
  const handleImageClick = (src, caption) => {
    setModalContent({ src, caption })
    setModalOpen(true)
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.1 } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } },
  }

  // Trigger animations when in view
  useEffect(() => {
    if (messageInView) messageControls.start("visible")
    else messageControls.start("hidden")
  }, [messageInView, messageControls])

  useEffect(() => {
    if (timelineInView) timelineControls.start("visible")
    else timelineControls.start("hidden")
  }, [timelineInView, timelineControls])

  useEffect(() => {
    if (wishesInView) wishesControls.start("visible")
    else wishesControls.start("hidden")
  }, [wishesInView, wishesControls])

  useEffect(() => {
    if (playlistInView) playlistControls.start("visible")
    else playlistControls.start("hidden")
  }, [playlistInView, playlistControls])

  // Data
  const galleryItems = [
    { src: "IMG-20231218-WA0009.jpg", title: "Beda Ghat", date: "Dec 2023" },
    { src: "IMG-20240819-WA0166.jpg", title: "Raksha Bandhan", date: "August 2024" },
    { src: "IMG-20240907-WA0187.jpg", title: "Ganesh Chaturthi", date: "September 2024" },
    { src: "IMG-20240930-WA0035.jpg", title: "Escape to Dumna", date: "March 2024" },
    { src: "IMG-20241027-WA0012.jpg", title: "Parle G Heist", date: "January 2025" },
    { src: "IMG_20241202_142228902_HDR.jpg", title: "Our Trip to the PachMarchi", date: "December 2024" },
    { src: "IMG_20241205_092037673_HDR.jpg", title: "Bhopal Odyssey", date: "December 2024" },
    { src: "IMG-20241010-WA0017.jpg", title: "Ice Cream Chahiye 😭", date: "Roj Ka Hai" },
    { src: "IMG20241205144919.jpg", title: "Bhopal Trip", date: "December 2024" },
    { src: "IMG-20250310-WA0009.jpg", title: "Miniso", date: "March 2025" },
    { src: "IMG20241202141226.jpg", title: "Putna Ka Vadh", date: "December 2024" },
    { src: "IMG-20250314-WA0059.jpg", title: "Holi", date: "March 2024" },
    { src: "IMG-20241030-WA0019.jpg", title: "Random Clicks", date: "Cutie" },
    { src: "IMG-20241203-WA0091.jpg", title: "Random Clicks", date: "Sun Kissed" },
    { src: "IMG-20250119-WA0337.jpg", title: "Random Clicks", date: "Kitna Bill Ho gaya 😭" },
    { src: "IMG-20250217-WA0010.jpg", title: "Random Clicks", date: "Velvet Paws" },
    { src: "IMG-20250304-WA0003.jpg", title: "Random Clicks", date: "Cutie" },
    { src: "IMG20241205130739.jpg", title: "Birthday Party12", date: "Petal Thief" },
  ]

  const timelineItems = [
    { year: "📍 December 2023 – Where It All Began", text: "Our paths crossed for the first time on our trip to Bhedaghat, a moment that set everything in motion.", side: "left" },
    { year: "🍽 Semester 2 – Shared Meals, Shared Smiles", text: "From sitting together to sharing countless meals, a quiet friendship started to bloom.", side: "right" },
    { year: "🎀 August 2024 – A New Bond", text: "The day you tied a rakhi, turning friendship into a bond that felt like family.", side: "left" },
    { year: "💬 Semester 3 – Endless Conversations & Laughter", text: "From endless chit-chats to unforgettable moments, every day was filled with joy.", side: "right" },
    { year: "💖 Semester 4 – Not Just Friends, But Family", text: "You’re no longer just a good friend—you’ve become my little, cute sister.", side: "left" }
  ];


  const wishes = [
    { from: "Mom", text: "Happy birthday to my beautiful daughter..." },
    { from: "Dad", text: "To my amazing daughter..." },
    { from: "Best Friend", text: "Happy birthday to my crazy, fun friend..." },
    { from: "Grandma", text: "Wishing my sweet granddaughter..." },
  ]

  return (
    <div className="App">
      {/* Header */}
      <header id="home" ref={homeRef}>
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
        <div
          className="scroll-down"
        >
          <FontAwesomeIcon icon={faChevronDown} size="2x" />
        </div>
      </header>

      {/* Enhanced Gallery Component */}
      <div ref={galleryRef}>
        <EnhancedGallery galleryItems={galleryItems} handleImageClick={handleImageClick} />
      </div>

      {/* Modal */}
      {modalOpen && (
        <motion.div
          className="modal active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <span className="modal-close" onClick={() => setModalOpen(false)}>
              ×
            </span>
            <img src={modalContent.src || "/placeholder.svg"} alt={modalContent.caption} />
            <div className="modal-caption">{modalContent.caption}</div>
          </motion.div>
        </motion.div>
      )}



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
                  hidden: { opacity: 0, x: item.side === "left" ? -50 : 50 },
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

      {/* Message */}
      <section id="message" ref={messageRef}>
        <div className="container">
          <motion.div className="section-title" initial="hidden" animate={messageControls} variants={fadeInUp}>
            <h2>A Special Message</h2>
            <p>From me to you</p>
          </motion.div>
          <motion.div className="message-container" initial="hidden" animate={messageControls} variants={fadeInUp}>
            <p>Gorilla Ji,</p>

            <p>On your special day, I just want to remind you how much you mean to me...</p>
            <p>You have always been there for me whenever I needed you the most.</p>
            <p>You were the one person I could share anything with, without hesitation.</p>

            <p style={{ fontWeight: 600 }}>Happy Birthday! Love you!</p>

            <p style={{ fontWeight: 600 }}>Tumhara Bhai... ❤️</p>

            <p style={{ fontWeight: 600 }}>Ab isse jyada Cringe nhi hoga mujhse, aur ye sab dekh kar sar par mat chad jana</p>


          </motion.div>
        </div>
      </section>



      {/* Footer */}
      <footer>
        <div className="container">
          <p>Your 20th Birthday Surprise</p>
        </div>
      </footer>
    </div>
  )
}

export default App


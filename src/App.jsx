import { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from 'emailjs-com'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import './App.css'
import profilePic from './assets/profile.jpg'

// ─── Animation Variants ────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// ─── Typewriter Hook ───────────────────────────────────────────────────────
function useTypewriter(words, speed = 100, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1))
        if (text === current) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(current.substring(0, text.length - 1))
        if (text === '') {
          setIsDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}

// ─── Floating Particles ────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  return (
    <div className="particles-container">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Animated Section Title ────────────────────────────────────────────────
function SectionTitle({ children, subtitle }) {
  return (
    <div className="section-title-wrapper">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
        <motion.span
          className="title-underline"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

// ─── Cursor Glow ────────────────────────────────────────────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const springX = useSpring(0, { stiffness: 80, damping: 20 })
  const springY = useSpring(0, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = e => { setPos({ x: e.clientX, y: e.clientY }) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => { springX.set(pos.x); springY.set(pos.y) }, [pos])

  return (
    <motion.div
      className="cursor-glow"
      style={{ left: springX, top: springY }}
    />
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────
function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Navee AI Helper. How can I help you?", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [navScrolled, setNavScrolled] = useState(false)
  const chatEndRef = useRef(null)

  const roles = useTypewriter(
    ['Backend Developer', 'Full Stack Developer', 'Software Intern', 'REST API Builder', 'HNDIT Student'],
    90, 1800
  )

  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run"
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ"

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const personalInfo = {
    name: "M.G. Naveen Dilshan",
    age: "21 Years",
    city: "Nawalapitiya, Sri Lanka",
    phone: "072 812 1216",
    email: "naveendedirisinghe@gmail.com"
  }

  const skillCategories = [
    {
      category: "Backend", icon: "⚙️",
      skills: [
        { name: 'Node.js', level: 'Advanced', progress: 85 },
        { name: 'Express.js', level: 'Advanced', progress: 85 },
        { name: 'Spring Boot', level: 'Advanced', progress: 82 },
        { name: 'REST API', level: 'Advanced', progress: 90 },
      ]
    },
    {
      category: "Frontend", icon: "🎨",
      skills: [
        { name: 'React.js', level: 'Advanced', progress: 88 },
        { name: 'HTML5 / CSS3', level: 'Advanced', progress: 90 },
        { name: 'Tailwind CSS', level: 'Intermediate', progress: 75 },
      ]
    },
    {
      category: "Languages", icon: "💻",
      skills: [
        { name: 'Java', level: 'Advanced', progress: 85 },
        { name: 'JavaScript', level: 'Advanced', progress: 88 },
        { name: 'C#', level: 'Intermediate', progress: 70 },
        { name: 'PHP', level: 'Intermediate', progress: 65 },
        { name: 'Python', level: 'Basic', progress: 50 },
      ]
    },
    {
      category: "Databases", icon: "🗄️",
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', progress: 85 },
        { name: 'MySQL', level: 'Advanced', progress: 88 },
        { name: 'MongoDB', level: 'Intermediate', progress: 70 },
        { name: 'Prisma ORM', level: 'Advanced', progress: 82 },
        { name: 'Hibernate / JPA', level: 'Intermediate', progress: 75 },
      ]
    },
    {
      category: "Tools", icon: "🚀",
      skills: [
        { name: 'Git / GitHub', level: 'Advanced', progress: 90 },
        { name: 'Docker', level: 'Intermediate', progress: 65 },
        { name: 'Postman', level: 'Advanced', progress: 88 },
        { name: 'Microsoft Azure', level: 'Basic', progress: 45 },
        { name: 'DigitalOcean', level: 'Basic', progress: 50 },
      ]
    }
  ]

  const projects = [
    {
      id: 1, title: 'ServiceHubSL', subtitle: 'SaaS Service Marketplace',
      desc: 'A SaaS-based marketplace connecting customers with service providers. Features authentication, service management, booking, user dashboards, and payment functionality.',
      tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS'],
      link: '#', badge: 'SaaS', color: 'cyan', icon: '🛒'
    },
    {
      id: 2, title: 'Service Finder Microservice', subtitle: 'Microservices Architecture',
      desc: 'REST APIs using Spring Boot for service management. Applied microservices-based architecture with MySQL via Hibernate/JPA for persistent data storage.',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Hibernate / JPA'],
      link: '#', badge: 'Microservices', color: 'blue', icon: '🔧'
    },
    {
      id: 3, title: 'Library Management System', subtitle: 'Backend REST API',
      desc: 'REST APIs for managing books, members, and borrowing records. Full CRUD operations with relational database integration and API testing via Postman.',
      tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Postman'],
      link: '#', badge: 'Backend', color: 'purple', icon: '📚'
    },
    {
      id: 4, title: 'Vehicle Inventory Management', subtitle: 'Inventory System',
      desc: 'REST-based backend for managing vehicle records. Implemented CRUD operations, search functionality, and relational database integration.',
      tech: ['Node.js', 'MySQL', 'PostgreSQL'],
      link: '#', badge: 'Backend', color: 'green', icon: '🚗'
    }
  ]

  const certifications = [
    { title: 'Web Application Security for the Everyday Software Engineer', issuer: 'Educative', year: '2026', icon: '🛡️', color: 'cyan' },
    { title: 'Cloud Computing Fundamentals', issuer: 'Educative', year: '2026', icon: '☁️', color: 'blue' },
    { title: 'Introduction to Cybersecurity', issuer: 'Cisco', year: '2026', icon: '🔐', color: 'purple' },
    { title: 'Computer Networks Fundamentals', issuer: 'Udemy', year: '2026', icon: '🌐', color: 'green' }
  ]

  const sendEmail = (e) => {
    e.preventDefault()
    const senderName = e.target.from_name.value
    emailjs.sendForm('service_qzdj9h6', 'template_dzxe7i9', e.target, 'Z8EWbyIIbI1e9gu-P')
      .then(() => { alert(`Message sent! Thank you, ${senderName}.`); e.target.reset() })
      .catch(err => alert("Error: " + err.text))
  }

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { text: input, isBot: false }])
    const cur = input; setInput(""); setIsLoading(true)
    try {
      const res = await fetch(`${AGENT_URL}/api/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${AGENT_KEY}` },
        body: JSON.stringify({ messages: [{ role: "user", content: cur }] })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { text: data.choices?.[0]?.message?.content || "Sorry, error.", isBot: true }])
    } catch { setMessages(prev => [...prev, { text: "AI Error.", isBot: true }]) }
    finally { setIsLoading(false) }
  }

  const allSkills = skillCategories.flatMap(c => c.skills)
  const displaySkills = activeTab === 'all' ? allSkills : skillCategories.find(c => c.category === activeTab)?.skills || []

  return (
    <div className="app">
      <CursorGlow />
      <Particles />

      {/* ── Navbar ── */}
      <motion.nav
        className={`navbar ${navScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="nav-container">
          <motion.div className="nav-logo" whileHover={{ scale: 1.05 }}>
            M.G. Naveen
          </motion.div>
          <div className="nav-menu">
            {['home','about','skills','projects','certifications','contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                whileHover={{ color: '#00f2ff' }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section id="home" className="hero-section">
        <div className="hero-bg-grid" />
        <motion.div
          className="container hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hero-text" variants={fadeInLeft}>
            <motion.div
              className="hero-badge"
              animate={{ boxShadow: ['0 0 8px rgba(0,242,255,0.2)', '0 0 25px rgba(0,242,255,0.5)', '0 0 8px rgba(0,242,255,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🟢 Available for Internship
            </motion.div>

            <h1 className="hero-title">
              Hi, I'm{' '}
              <span className="gradient-text">M.G. Naveen Dilshan</span>
            </h1>

            <div className="typewriter-line">
              <span className="typewriter-prefix">I am a </span>
              <span className="typewriter-text">{roles}</span>
              <span className="typewriter-cursor">|</span>
            </div>

            <p className="hero-description">
              HNDIT student specializing in <strong>REST APIs</strong>,{' '}
              <strong>database-driven applications</strong>, and{' '}
              <strong>SaaS systems</strong> using Node.js, Spring Boot, PostgreSQL &amp; React.
            </p>

            <div className="hero-tags">
              {['#Node.js', '#SpringBoot', '#React', '#PostgreSQL', '#Docker'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.1, color: '#00f2ff' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.div className="hero-buttons" variants={fadeInUp}>
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,242,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Chat 🚀
              </motion.a>
              <motion.a
                href="#projects"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, borderColor: '#00f2ff' }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-image-container" variants={fadeInRight}>
            <div className="profile-ring-outer">
              <div className="profile-ring-inner">
                <motion.div
                  className="profile-img-wrapper"
                  animate={{ y: [0, -18, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.04 }}
                >
                  <img src={profilePic} alt="Naveen Dilshan" className="profile-img" />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="hero-social-links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="https://github.com/navee-d"
                target="_blank" rel="noopener noreferrer"
                className="social-chip"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/naveen-dilshan-3b6223428/"
                target="_blank" rel="noopener noreferrer"
                className="social-chip"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-section">
        <div className="container">
          <SectionTitle subtitle="Passionate developer turning ideas into elegant software">About Me</SectionTitle>
          <motion.div
            className="bento-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.div className="bento-box glass-card bio-box" variants={fadeInLeft} whileHover={{ borderColor: 'rgba(0,242,255,0.4)', boxShadow: '0 20px 60px rgba(0,242,255,0.08)' }}>
              <h3 className="bento-title">Who am I? 💻</h3>
              <p className="bio-text">
                I'm <span className="highlight-text">M.G. Naveen Dilshan</span>, a passionate Software Engineering student pursuing an HNDIT at SLIATE.
                <br /><br />
                I specialize in building <strong>REST APIs, database-driven applications, and SaaS systems</strong> using Node.js, Express.js, Java Spring Boot, PostgreSQL, and React.
                <br /><br />
                <span className="label">📚 HNDIT — SLIATE | Expected: 2026</span>
              </p>
            </motion.div>

            <motion.div className="bento-box glass-card" variants={fadeInRight} whileHover={{ borderColor: 'rgba(0,242,255,0.4)' }}>
              <h3 className="bento-title">Personal Info</h3>
              <ul className="info-list">
                {[
                  ['📍 City', personalInfo.city],
                  ['📞 Phone', personalInfo.phone],
                  ['📧 Email', personalInfo.email],
                  ['🌐 English', 'Intermediate / Working'],
                ].map(([label, val]) => (
                  <motion.li key={label} whileHover={{ x: 4 }}>
                    <span className="label">{label}</span>
                    <span>{val}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="bento-box glass-card soft-skills-box" variants={fadeInRight} whileHover={{ borderColor: 'rgba(0,242,255,0.4)' }}>
              <h3 className="bento-title">Soft Skills</h3>
              <div className="soft-skills-tags">
                {['Problem Solving', 'Analytical Thinking', 'Team Collaboration', 'Communication', 'Time Management', 'Adaptability'].map((s, i) => (
                  <motion.span
                    key={s}
                    className="soft-skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,242,255,0.15)' }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div className="bento-box stats-box glass-card" variants={fadeInUp}>
              {[
                { num: '2+', label: 'Years Coding' },
                { num: '4+', label: 'Projects' },
                { num: '4', label: 'Certifications' },
                { num: '8+', label: 'Technologies' },
              ].map(({ num, label }) => (
                <motion.div
                  key={label}
                  className="stat-item"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="stat-num">{num}</div>
                  <div className="stat-lbl">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="skills-section">
        <div className="container">
          <SectionTitle subtitle="Full-stack capabilities across backend, frontend, databases and cloud">
            Technical Skills
          </SectionTitle>

          <motion.div
            className="skills-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {[{ category: 'all', icon: '✦' }, ...skillCategories].map(c => (
              <motion.button
                key={c.category}
                className={`tab-btn ${activeTab === c.category ? 'active' : ''}`}
                onClick={() => setActiveTab(c.category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {c.icon} {c.category === 'all' ? 'All' : c.category}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="skills-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {displaySkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="skill-card glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -4, borderColor: 'rgba(0,242,255,0.3)', boxShadow: '0 12px 40px rgba(0,242,255,0.08)' }}
                >
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span className={`level-badge level-${skill.level.toLowerCase().split(' ')[0]}`}>{skill.level}</span>
                  </div>
                  <div className="progress-bg">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.2 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                  <div className="skill-percent">{skill.progress}%</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="projects-section">
        <div className="container">
          <SectionTitle subtitle="Real-world applications built with modern tech stacks">
            Featured Projects
          </SectionTitle>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {projects.map((p) => (
              <motion.div
                key={p.id}
                className={`project-card glass-card project-${p.color}`}
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  boxShadow: p.color === 'cyan' ? '0 25px 60px rgba(0,242,255,0.15)' :
                    p.color === 'blue' ? '0 25px 60px rgba(0,102,255,0.15)' :
                    p.color === 'purple' ? '0 25px 60px rgba(139,92,246,0.15)' :
                    '0 25px 60px rgba(16,185,129,0.15)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="project-header">
                  <motion.span
                    className="project-icon"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: p.id * 0.5 }}
                  >
                    {p.icon}
                  </motion.span>
                  <span className={`project-badge badge-${p.color}`}>{p.badge}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.desc}</p>
                <div className="tech-tags">
                  {p.tech.map(t => (
                    <motion.span key={t} whileHover={{ scale: 1.1 }}>{t}</motion.span>
                  ))}
                </div>
                <motion.div
                  className="btn btn-outline"
                  whileHover={{ scale: 1.02 }}
                >
                  🔒 Private Repository
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="certs-section">
        <div className="container">
          <SectionTitle subtitle="Continuous learning and professional development">
            Certifications
          </SectionTitle>

          <motion.div
            className="certs-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                className={`cert-card glass-card cert-${cert.color}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.25 } }}
              >
                <motion.div
                  className="cert-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                >
                  {cert.icon}
                </motion.div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-year"> · {cert.year}</span>
                  </div>
                </div>
                <div className={`cert-badge badge-${cert.color}`}>✓ Earned</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="contact-card glass-card">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let's Work Together! 🚀
            </motion.h2>
            <motion.p
              style={{ marginBottom: '2rem', color: '#ccc' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Seeking internship opportunities in Software Engineering &amp; Backend Development.
            </motion.p>

            <form onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <input type="text" name="from_name" placeholder="Your Name" required />
                <input type="email" name="reply_to" placeholder="Your Email" required />
              </div>
              <textarea name="message" placeholder="How can I help you?" rows="5" required />
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(0,242,255,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message 📨
              </motion.button>
            </form>
          </div>

          <p className="copyright">
            © 2026 M.G. Naveen Dilshan. All rights reserved. ·{' '}
            <a href="mailto:naveendedirisinghe@gmail.com">naveendedirisinghe@gmail.com</a>
          </p>
        </motion.div>
      </section>

      {/* ── Chatbot ── */}
      <div className="chatbot-wrapper">
        <AnimatePresence>
          {!isBotOpen && (
            <motion.button
              className="chat-toggle-btn"
              onClick={() => setIsBotOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08, boxShadow: '0 15px 40px rgba(0,242,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              🤖 Ask Navee AI
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isBotOpen && (
            <motion.div
              className="chat-window glass-card"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="chat-header">
                <span>Navee AI Assistant</span>
                <button onClick={() => setIsBotOpen(false)}>×</button>
              </div>
              <div className="chat-messages">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`message ${m.isBot ? 'bot' : 'user'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    className="message bot typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span /><span /><span />
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="chat-input-area">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                />
                <motion.button onClick={handleSend} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  ➤
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
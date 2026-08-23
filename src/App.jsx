import { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import profilePic from './assets/profile.jpg'

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } }
}
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}
const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// ─── Typewriter Hook ─────────────────────────────────────────────────────────
function useTypewriter(words, speed = 95, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1))
        if (text === current) setTimeout(() => setIsDeleting(true), pause)
      } else {
        setText(current.substring(0, text.length - 1))
        if (text === '') { setIsDeleting(false); setWordIndex(i => i + 1) }
      }
    }, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}

// ─── Section Title ───────────────────────────────────────────────────────────
function SectionTitle({ children, subtitle }) {
  return (
    <div className="section-title-wrapper">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        {children}
        <motion.span
          className="title-underline"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('all')
  const [navScrolled, setNavScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const [activeProject, setActiveProject] = useState(0)

  const roles = useTypewriter(
    ['Backend Developer', 'Full Stack Developer', 'Software Intern', 'REST API Builder', 'HNDIT Student'],
    90, 1800
  )

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const personalInfo = {
    city: "Nawalapitiya, Sri Lanka",
    phone: "072 812 1216",
    whatsapp: "94728121216",
    email: "naveendedirisinghe@gmail.com"
  }
  const sendEmail = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value

    fetch("https://formsubmit.co/ajax/naveendedirisinghe@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Portfolio Contact from ${name}`,
        Name: name,
        Email: email,
        Message: message
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === "true" || data.success === true) {
          setFormStatus('success')
          form.reset()
          setTimeout(() => setFormStatus(null), 4000)
        } else {
          setFormStatus('error')
          setTimeout(() => setFormStatus(null), 4000)
        }
      })
      .catch(error => {
        setFormStatus('error')
        setTimeout(() => setFormStatus(null), 4000)
      })
  }

  // ─── Services Data ───────────────────────────────────────────────────────
  const services = [
    {
      icon: '⚙️',
      title: 'Backend API Development',
      desc: 'Building scalable REST APIs with Node.js, Express.js and Spring Boot. Clean architecture, proper error handling and documentation.',
      tags: ['Node.js', 'Express.js', 'Spring Boot'],
      color: 'cyan'
    },
    {
      icon: '🗄️',
      title: 'Database Design & Management',
      desc: 'Designing efficient relational and NoSQL database schemas. PostgreSQL, MySQL, MongoDB with ORM integration.',
      tags: ['PostgreSQL', 'MySQL', 'Prisma ORM'],
      color: 'blue'
    },
    {
      icon: '🌐',
      title: 'Full Stack Web Applications',
      desc: 'End-to-end web apps combining React frontend with Node.js or Spring Boot backend, fully integrated.',
      tags: ['React.js', 'Node.js', 'Tailwind CSS'],
      color: 'purple'
    },
    {
      icon: '☁️',
      title: 'SaaS Application Development',
      desc: 'Multi-tenant SaaS platforms with authentication, user dashboards, subscriptions and scalable architecture.',
      tags: ['SaaS', 'PostgreSQL', 'REST API'],
      color: 'green'
    }
  ]

  // ─── Experience Timeline ─────────────────────────────────────────────────
  const timeline = [
    {
      year: '2024',
      title: 'Started HNDIT Program',
      place: 'SLIATE ATI Nawalapitiya',
      desc: 'Began Higher National Diploma in Information Technology. Focused on software engineering fundamentals, Java and web technologies.',
      icon: '🎓',
      color: 'cyan'
    },
    {
      year: '2024',
      title: 'First Backend Projects',
      place: 'Self-directed Learning',
      desc: 'Built first REST API projects using Node.js and Express.js. Learned MySQL, PostgreSQL and database design principles.',
      icon: '💻',
      color: 'blue'
    },
    {
      year: '2025',
      title: 'ServiceHubSL — SaaS Platform',
      place: 'Personal Project',
      desc: 'Developed a full SaaS marketplace connecting service providers with customers. Full stack with React, Node.js, PostgreSQL and Prisma ORM.',
      icon: '🚀',
      color: 'purple'
    },
    {
      year: '2025',
      title: 'Microservices & Java Spring Boot',
      place: 'Self-directed Learning',
      desc: 'Built Service Finder Microservice using Spring Boot and Hibernate/JPA. Explored microservices architecture and Docker.',
      icon: '🔧',
      color: 'green'
    },
    {
      year: '2026',
      title: 'ATI Nawalapitiya Official Website',
      place: 'SLIATE ATI Nawalapitiya',
      desc: 'Developed the official website for SLIATE ATI Nawalapitiya. Includes course information, faculty details, news and events sections.',
      icon: '🏫',
      color: 'cyan'
    },
    {
      year: '2026',
      title: 'Restaurant Management System',
      place: 'Personal Project',
      desc: 'Complete restaurant management solution — table reservations, order management, menu management, and billing system.',
      icon: '🍽️',
      color: 'blue'
    },
    {
      year: '2026',
      title: '100 Tables — SaaS Platform',
      place: 'Personal Project · Testing Phase',
      desc: 'Multi-tenant SaaS platform for restaurant table management. Currently in testing with 100+ table configurations and multi-user support.',
      icon: '🪑',
      color: 'purple'
    },
    {
      year: '2026',
      title: '4 Professional Certifications',
      place: 'Educative · Cisco · Udemy',
      desc: 'Earned certifications in Web Security, Cloud Computing, Cybersecurity, and Computer Networks.',
      icon: '🏆',
      color: 'green'
    },
    {
      year: '2026',
      title: 'Seeking Software Engineering Internship',
      place: 'Open to Opportunities',
      desc: 'Actively seeking internship roles in Backend or Full Stack development to gain industry experience and contribute to real-world projects.',
      icon: '🎯',
      color: 'cyan'
    }
  ]

  // ─── Skills ──────────────────────────────────────────────────────────────
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

  // ─── Projects ────────────────────────────────────────────────────────────
  const projects = [
    {
      id: 1, title: 'ServiceHubSL', subtitle: 'SaaS Service Marketplace · 2026', icon: '🛒',
      desc: 'A SaaS-based marketplace connecting customers with service providers. Features authentication, service management, booking, user dashboards, and payment functionality.',
      tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS'],
      link: 'https://servicehubsl.me/', badge: 'SaaS', color: 'cyan', status: 'live', pinned: true
    },
    {
      id: 2, title: 'Service Finder Microservice', subtitle: 'Microservices Architecture · 2025', icon: '🔧',
      desc: 'REST APIs using Spring Boot for service management. Applied microservices-based architecture with MySQL via Hibernate/JPA for persistent data storage.',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Hibernate / JPA'],
      link: '#', badge: 'Microservices', color: 'blue', status: null
    },
    {
      id: 3, title: 'ATI Nawalapitiya Website', subtitle: 'Institutional Website · 2026', icon: '🏫',
      desc: 'Official website for SLIATE ATI Nawalapitiya. Covers course information, faculty profiles, news, events, and contact details for the institution.',
      tech: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
      link: '#', badge: 'Web', color: 'purple', status: null
    },
    {
      id: 4, title: 'Restaurant Management System', subtitle: 'Business Management · 2026', icon: '🍽️',
      desc: 'Full restaurant management solution — table reservations, real-time order management, menu control, kitchen display, and billing system.',
      tech: ['Node.js', 'Express.js', 'React.js', 'MySQL', 'Tailwind CSS'],
      link: '#', badge: 'Management', color: 'green', status: null
    },
    {
      id: 5, title: 'Cloud POS System', subtitle: 'SaaS Point of Sale · 2026', icon: '💻',
      desc: 'Multi-tenant SaaS Point of Sale (POS) system designed for retail and dining. Features inventory tracking, multi-user roles, and real-time transaction updates.',
      tech: ['React.js', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Docker'],
      link: '#', badge: 'SaaS POS', color: 'cyan', status: 'testing'
    },
    {
      id: 6, title: 'Library Management System', subtitle: 'Backend REST API', icon: '📚',
      desc: 'REST APIs for managing books, members, and borrowing records. Full CRUD operations with relational database integration and API testing via Postman.',
      tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Postman'],
      link: '#', badge: 'Backend', color: 'blue', status: null
    },
    {
      id: 7, title: 'Vehicle Inventory Management', subtitle: 'Inventory System', icon: '🚗',
      desc: 'REST-based backend for managing vehicle records. Implemented CRUD operations, search functionality, and relational database integration.',
      tech: ['Node.js', 'MySQL', 'PostgreSQL'],
      link: '#', badge: 'Backend', color: 'purple', status: null
    }
  ]

  // ─── Certifications ──────────────────────────────────────────────────────
  const certifications = [
    { title: 'Web Application Security for the Everyday Software Engineer', issuer: 'Educative', year: '2026', icon: '🛡️', color: 'cyan' },
    { title: 'Cloud Computing Fundamentals', issuer: 'Educative', year: '2026', icon: '☁️', color: 'blue' },
    { title: 'Introduction to Cybersecurity', issuer: 'Cisco', year: '2026', icon: '🔐', color: 'purple' },
    { title: 'Computer Networks Fundamentals', issuer: 'Udemy', year: '2026', icon: '🌐', color: 'green' }
  ]



  const allSkills = skillCategories.flatMap(c => c.skills)
  const displaySkills = activeTab === 'all' ? allSkills : skillCategories.find(c => c.category === activeTab)?.skills || []

  // Navbar items updated
  const navItems = ['home', 'services', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact']

  return (
    <div className="app">

      {/* ── Navbar ── */}
      <motion.nav
        className={`navbar ${navScrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="nav-container">
          <motion.div className="nav-logo" whileHover={{ scale: 1.04 }}>M.G. Naveen</motion.div>
          <div className="nav-menu">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="nav-link"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.3 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════ HERO ══════════════════════════════════════════ */}
      <section id="home" className="hero-section">
        <div className="hero-bg-grid" />
        <motion.div className="container hero-content" initial="hidden" animate="visible" variants={staggerContainer}>

          {/* Left */}
          <motion.div className="hero-text" variants={fadeInLeft}>
            <motion.div className="hero-badge" variants={fadeInUp}>🟢 Available for Internship</motion.div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">M.G. Naveen Dilshan</span>
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
                <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 + i * 0.08 }}>
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="hero-buttons">
              <motion.a href="#contact" className="btn btn-primary" whileHover={{ scale: 1.04, boxShadow: '0 18px 38px rgba(0,242,255,0.35)' }} whileTap={{ scale: 0.97 }}>
                Let's Chat 🚀
              </motion.a>
              <motion.a href="/naveen-cv.pdf" download="Naveen_Dilshan_CV.pdf" className="btn btn-cv" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                📄 Download CV
              </motion.a>
              <motion.a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Profile (FIXED: ring spins, image stays still) */}
          <motion.div className="hero-image-container" variants={fadeInRight}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="profile-ring-outer">
                <div className="profile-ring-counter">
                  <motion.div
                    className="profile-img-wrapper"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img src={profilePic} alt="Naveen Dilshan" className="profile-img" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div className="hero-social-links" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <motion.a href="https://github.com/navee-d" target="_blank" rel="noopener noreferrer" className="social-chip" whileHover={{ scale: 1.06, y: -2 }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/naveen-dilshan-3b6223428/" target="_blank" rel="noopener noreferrer" className="social-chip" whileHover={{ scale: 1.06, y: -2 }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

        </motion.div>
        <motion.div className="scroll-indicator" animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}>
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════ SERVICES ══════════════════════════════════════════ */}
      <section id="services" className="services-section">
        <div className="container">
          <SectionTitle subtitle="What I can build for you">What I Offer</SectionTitle>
          <motion.div className="services-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
            {services.map((s, i) => (
              <motion.div key={i} className={`service-card glass-card service-${s.color}`} variants={scaleIn} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
                <div className={`service-icon-wrap icon-${s.color}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ ABOUT ══════════════════════════════════════════ */}
      <section id="about" className="about-section">
        <div className="container">
          <SectionTitle subtitle="Passionate developer turning ideas into elegant software">About Me</SectionTitle>
          <motion.div className="bento-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>

            <motion.div className="bento-box glass-card bio-box" variants={fadeInLeft} whileHover={{ borderColor: 'rgba(0,242,255,0.3)' }}>
              <h3 className="bento-title">Who am I? 💻</h3>
              <p className="bio-text">
                I'm <span className="highlight-text">M.G. Naveen Dilshan</span>, a passionate Software Engineering student pursuing an HNDIT at SLIATE.
                <br /><br />
                I specialize in building <strong>REST APIs, database-driven applications, and SaaS systems</strong> using Node.js, Express.js, Java Spring Boot, PostgreSQL, and React.
                <br /><br />
                <span className="label">📚 HNDIT — SLIATE | Expected: 2026</span>
              </p>

              {/* GitHub Stats */}
              <div className="github-stats-wrap">
                <img
                  src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=navee-d&layout=compact&theme=dark&bg_color=00000000&hide_border=true&title_color=00f2ff&text_color=a0a0b8&icon_color=0066ff"
                  alt="Top Languages"
                  className="github-stats-img"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div className="bento-box glass-card" variants={fadeInRight} whileHover={{ borderColor: 'rgba(0,242,255,0.3)' }}>
              <h3 className="bento-title">Personal Info</h3>
              <ul className="info-list">
                {[
                  ['📍 City', personalInfo.city],
                  ['📞 Phone', personalInfo.phone],
                  ['📧 Email', personalInfo.email],
                  ['🌐 English', 'Intermediate / Working'],
                ].map(([label, val]) => (
                  <motion.li key={label} whileHover={{ x: 3 }}>
                    <span className="label">{label}</span>
                    <span>{val}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="bento-box glass-card soft-skills-box" variants={fadeInRight} whileHover={{ borderColor: 'rgba(0,242,255,0.3)' }}>
              <h3 className="bento-title">Soft Skills</h3>
              <div className="soft-skills-tags">
                {['Problem Solving', 'Analytical Thinking', 'Team Collaboration', 'Communication', 'Time Management', 'Adaptability'].map((s, i) => (
                  <motion.span key={s} className="soft-skill-tag" initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.08 }}>
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
                <motion.div key={label} className="stat-item" whileHover={{ scale: 1.08 }}>
                  <div className="stat-num">{num}</div>
                  <div className="stat-lbl">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ EXPERIENCE ══════════════════════════════════════════ */}
      <section id="experience" className="experience-section">
        <div className="container">
          <SectionTitle subtitle="My journey from student to developer">Experience & Journey</SectionTitle>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={`timeline-card glass-card tl-${item.color}`}>
                  <div className="timeline-header">
                    <span className="timeline-icon">{item.icon}</span>
                    <span className={`timeline-year badge-${item.color}`}>{item.year}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className={`timeline-dot dot-${item.color}`} />
              </motion.div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ SKILLS ══════════════════════════════════════════ */}
      <section id="skills" className="skills-section">
        <div className="container">
          <SectionTitle subtitle="Full-stack capabilities across backend, frontend, databases and cloud">Technical Skills</SectionTitle>
          <motion.div className="skills-tabs" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {[{ category: 'all', icon: '✦' }, ...skillCategories].map(c => (
              <motion.button key={c.category} className={`tab-btn ${activeTab === c.category ? 'active' : ''}`} onClick={() => setActiveTab(c.category)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                {c.icon} {c.category === 'all' ? 'All' : c.category}
              </motion.button>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="skills-grid" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {displaySkills.map((skill, i) => (
                <motion.div key={skill.name} className="skill-card glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3, borderColor: 'rgba(0,242,255,0.25)' }}>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span className={`level-badge level-${skill.level.toLowerCase().split(' ')[0]}`}>{skill.level}</span>
                  </div>
                  <div className="progress-bg">
                    <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: `${skill.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.15 + i * 0.04 }} />
                  </div>
                  <div className="skill-percent">{skill.progress}%</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════ PROJECTS ══════════════════════════════════════════ */}
      <section id="projects" className="projects-section">
        <div className="container">
          <SectionTitle subtitle="Real-world applications built with modern tech stacks">Featured Projects</SectionTitle>

          {/* Carousel */}
          <div className="projects-carousel-wrapper">
            {/* Prev button */}
            <motion.button
              className="carousel-arrow carousel-prev"
              onClick={() => setActiveProject(p => (p - 1 + projects.length) % projects.length)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >‹</motion.button>

            {/* Main featured card */}
            <div className="carousel-main">
              <AnimatePresence mode="wait">
                {projects.map((p, i) => i === activeProject && (
                  <motion.div
                    key={p.id}
                    className={`project-card-featured glass-card project-${p.color}`}
                    initial={{ opacity: 0, x: 60, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -60, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="project-featured-header">
                      <div className="project-featured-icon">{p.icon}</div>
                      <div>
                        <div className="project-featured-badges">
                          {p.pinned && <span className="badge-pinned">📌 Pinned</span>}
                          <span className={`project-badge badge-${p.color}`}>{p.badge}</span>
                          {p.status === 'testing' && <span className="badge-testing">🧪 Testing</span>}
                          {p.status === 'live' && <span className="badge-live">🌐 Live</span>}
                        </div>
                        <h3>{p.title}</h3>
                        <p className="project-subtitle">{p.subtitle}</p>
                      </div>
                    </div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="tech-tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      {p.link !== '#' ? (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px' }} onClick={e => e.stopPropagation()}>
                          <span>🔗</span> Visit Site
                        </a>
                      ) : (
                        <div className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', opacity: 0.7 }}>
                          <span>🔒</span> Private
                        </div>
                      )}
                      <div className="project-counter">{activeProject + 1} / {projects.length}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Next button */}
            <motion.button
              className="carousel-arrow carousel-next"
              onClick={() => setActiveProject(p => (p + 1) % projects.length)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >›</motion.button>
          </div>

          {/* Dot indicators */}
          <div className="carousel-dots">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                className={`carousel-dot ${i === activeProject ? 'active' : ''}`}
                onClick={() => setActiveProject(i)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                animate={{ scale: i === activeProject ? 1.2 : 1 }}
              />
            ))}
          </div>

          {/* Mini project grid — all projects */}
          <motion.div className="projects-mini-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={staggerContainer}>
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                className={`project-mini-card glass-card project-${p.color} ${i === activeProject ? 'mini-active' : ''}`}
                variants={scaleIn}
                onClick={() => setActiveProject(i)}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-header">
                  <span className="project-icon" style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {p.pinned && <span className="badge-pinned" title="Pinned">📌</span>}
                    <span className={`project-badge badge-${p.color}`}>{p.badge}</span>
                    {p.status === 'testing' && <span className="badge-testing" title="Testing">🧪</span>}
                    {p.status === 'live' && <span className="badge-live" title="Live">🌐</span>}
                  </div>
                </div>
                <h3 style={{ fontSize: '0.95rem' }}>{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <div className="tech-tags">{p.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div>
                
                {p.link !== '#' ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: 'auto', textAlign: 'center', display: 'block', padding: '6px' }} onClick={e => e.stopPropagation()}>
                    🔗 Live Site
                  </a>
                ) : (
                  <div className="btn btn-outline" style={{ marginTop: 'auto', textAlign: 'center', padding: '6px', opacity: 0.7 }}>
                    🔒 Private Code
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ CERTIFICATIONS ══════════════════════════════════════════ */}
      <section id="certifications" className="certs-section">
        <div className="container">
          <SectionTitle subtitle="Continuous learning and professional development">Certifications</SectionTitle>
          <motion.div className="certs-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {certifications.map((cert, i) => (
              <motion.div key={i} className={`cert-card glass-card cert-${cert.color}`} variants={fadeInUp} whileHover={{ scale: 1.02, y: -3, transition: { duration: 0.2 } }}>
                <div className="cert-icon">{cert.icon}</div>
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

      {/* ══════════════════════════════════════════ CONTACT ══════════════════════════════════════════ */}
      <section id="contact" className="contact-section">
        <motion.div className="container" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="contact-card glass-card">
            <h2>Let's Work Together! 🚀</h2>
            <p className="contact-sub">Seeking internship opportunities in Software Engineering &amp; Backend Development.</p>
            <div className="contact-chips">
              <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-chip chip-wa">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="mailto:naveendedirisinghe@gmail.com" className="contact-chip chip-email">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/naveen-dilshan-3b6223428/" target="_blank" rel="noopener noreferrer" className="contact-chip chip-li">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
            <div className="contact-divider"><span>or send a message</span></div>
            <form onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <textarea name="message" placeholder="Your message..." rows="5" required />
              <motion.button type="submit" className="btn btn-primary" disabled={formStatus === 'sending'} whileHover={{ scale: 1.03, boxShadow: '0 18px 38px rgba(0,242,255,0.3)' }} whileTap={{ scale: 0.97 }}>
                {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? '✅ Message Sent!' : formStatus === 'error' ? '❌ Error, Try Again' : 'Send Message 📨'}
              </motion.button>
            </form>
          </div>
          <p className="copyright">© 2026 M.G. Naveen Dilshan. All rights reserved. · <a href="mailto:naveendedirisinghe@gmail.com">naveendedirisinghe@gmail.com</a></p>
        </motion.div>
      </section>

      {/* ── Floating WhatsApp ── */}
      <motion.a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="wa-float" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5 }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }} title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </motion.a>

    </div>
  )
}

export default App
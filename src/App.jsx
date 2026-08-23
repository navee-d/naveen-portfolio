import { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion' 
import './App.css'
import profilePic from './assets/profile.jpg' 

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Navee AI Helper. How can I help you?", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const chatEndRef = useRef(null)

  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const personalInfo = {
    name: "M.G. Naveen Dilshan",
    age: "21 Years",
    city: "Nawalapitiya, Sri Lanka",
    phone: "072 812 1216",
    email: "dilshannaveen124@gmail.com"
  }

  // ===== UPDATED SKILLS FROM CV =====
  const skillCategories = [
    {
      category: "Backend",
      icon: "⚙️",
      skills: [
        { name: 'Node.js', level: 'Advanced', progress: 85 },
        { name: 'Express.js', level: 'Advanced', progress: 85 },
        { name: 'Spring Boot', level: 'Advanced', progress: 82 },
        { name: 'REST API', level: 'Advanced', progress: 90 },
      ]
    },
    {
      category: "Frontend",
      icon: "🎨",
      skills: [
        { name: 'React.js', level: 'Advanced', progress: 88 },
        { name: 'HTML5 / CSS3', level: 'Advanced', progress: 90 },
        { name: 'Tailwind CSS', level: 'Intermediate', progress: 75 },
      ]
    },
    {
      category: "Languages",
      icon: "💻",
      skills: [
        { name: 'Java', level: 'Advanced', progress: 85 },
        { name: 'JavaScript', level: 'Advanced', progress: 88 },
        { name: 'C#', level: 'Intermediate', progress: 70 },
        { name: 'PHP', level: 'Intermediate', progress: 65 },
        { name: 'Python', level: 'Basic', progress: 50 },
      ]
    },
    {
      category: "Databases",
      icon: "🗄️",
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', progress: 85 },
        { name: 'MySQL', level: 'Advanced', progress: 88 },
        { name: 'MongoDB', level: 'Intermediate', progress: 70 },
        { name: 'Prisma ORM', level: 'Advanced', progress: 82 },
        { name: 'Hibernate / JPA', level: 'Intermediate', progress: 75 },
      ]
    },
    {
      category: "Tools",
      icon: "🚀",
      skills: [
        { name: 'Git / GitHub', level: 'Advanced', progress: 90 },
        { name: 'Docker', level: 'Intermediate', progress: 65 },
        { name: 'Postman', level: 'Advanced', progress: 88 },
        { name: 'Microsoft Azure', level: 'Basic', progress: 45 },
        { name: 'DigitalOcean', level: 'Basic', progress: 50 },
      ]
    }
  ]

  // ===== UPDATED PROJECTS FROM CV =====
  const projects = [
    {
      id: 1,
      title: 'ServiceHubSL',
      subtitle: 'SaaS Service Marketplace',
      desc: 'A SaaS-based marketplace connecting customers with service providers. Features authentication, service management, booking, user dashboards, and payment functionality.',
      tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS'],
      link: '#',
      badge: 'SaaS',
      color: 'cyan'
    },
    {
      id: 2,
      title: 'Service Finder Microservice',
      subtitle: 'Microservices Architecture',
      desc: 'REST APIs using Spring Boot for service management. Applied microservices-based architecture with MySQL via Hibernate/JPA for persistent data storage.',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Hibernate / JPA'],
      link: '#',
      badge: 'Microservices',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Library Management System',
      subtitle: 'Backend REST API',
      desc: 'REST APIs for managing books, members, and borrowing records. Full CRUD operations with relational database integration and API testing via Postman.',
      tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Postman'],
      link: '#',
      badge: 'Backend',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Vehicle Inventory Management',
      subtitle: 'Inventory System',
      desc: 'REST-based backend for managing vehicle records. Implemented CRUD operations, search functionality, and relational database integration.',
      tech: ['Node.js', 'MySQL', 'PostgreSQL'],
      link: '#',
      badge: 'Backend',
      color: 'green'
    }
  ]

  // ===== CERTIFICATIONS FROM CV =====
  const certifications = [
    {
      title: 'Web Application Security for the Everyday Software Engineer',
      issuer: 'Educative',
      year: '2026',
      icon: '🛡️',
      color: 'cyan'
    },
    {
      title: 'Cloud Computing Fundamentals',
      issuer: 'Educative',
      year: '2026',
      icon: '☁️',
      color: 'blue'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      year: '2026',
      icon: '🔐',
      color: 'purple'
    },
    {
      title: 'Computer Networks Fundamentals',
      issuer: 'Udemy',
      year: '2026',
      icon: '🌐',
      color: 'green'
    }
  ]

  const sendEmail = (e) => {
    e.preventDefault();
    const senderName = e.target.from_name.value;

    emailjs.sendForm(
      'service_qzdj9h6',      
      'template_dzxe7i9',     
      e.target,
      'Z8EWbyIIbI1e9gu-P'     
    )
    .then((result) => {
        console.log("Email success:", result.text);
        alert(`Message sent successfully! Thank you, ${senderName}.`);
        e.target.reset();
    }, (error) => {
        console.error("Email error:", error.text);
        alert("An error occurred: " + error.text);
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${AGENT_URL}/api/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${AGENT_KEY}` },
        body: JSON.stringify({ messages: [{ role: "user", content: currentInput }] })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.choices?.[0]?.message?.content || "Sorry, I encountered an error.", isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "AI Error.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  }

  const allSkills = skillCategories.flatMap(c => c.skills)

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">M.G. Naveen</div>
          <div className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#certifications" className="nav-link">Certs</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div 
          className="container hero-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="hero-text" variants={fadeInUp}>
            <div className="hero-badge">Available for Internship</div>
            <h1 className="hero-title">Hi, I'm <span className="gradient-text">M.G. Naveen Dilshan</span></h1>
            <p className="hero-subtitle">Software Engineering Intern | Backend &amp; Full Stack Developer</p>
            <p className="hero-description">
              HNDIT student specializing in <strong>REST APIs</strong>, <strong>database-driven applications</strong>, and <strong>SaaS systems</strong> using Node.js, Spring Boot, PostgreSQL &amp; React. Turning complex problems into elegant software solutions.
            </p>
            <div className="hero-tags">
              <span>#Node.js</span>
              <span>#SpringBoot</span>
              <span>#React</span>
              <span>#PostgreSQL</span>
            </div>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Let's Chat</a>
              <a href="#projects" className="btn btn-secondary">View Projects</a>
            </div>
          </motion.div>
          <motion.div className="hero-image-container" variants={fadeInUp}>
            <div className="profile-img-wrapper">
              <img src={profilePic} alt="Naveen Dilshan" className="profile-img" />
            </div>
            <div className="hero-social-links">
              <a href="https://github.com/naveendilshan" target="_blank" rel="noopener noreferrer" className="social-chip">GitHub</a>
              <a href="https://linkedin.com/in/naveendilshan" target="_blank" rel="noopener noreferrer" className="social-chip">LinkedIn</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <motion.h2 
            className="section-title" 
            style={{textAlign:'center', marginBottom: '2rem'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="bento-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="bento-box glass-card bio-box" variants={fadeInUp}>
              <h3 className="bento-title">Who am I? 💻</h3>
              <p className="bio-text">
                I'm <span className="highlight-text">M.G. Naveen Dilshan</span>, a passionate Software Engineering student pursuing an HNDIT at SLIATE.
                <br/><br/>
                I specialize in building <strong>REST APIs, database-driven applications, and SaaS systems</strong> using Node.js, Express.js, Java Spring Boot, PostgreSQL, and React. My goal is to build reliable software solutions that solve real-world problems.
                <br/><br/>
                <span className="label">HNDIT — SLIATE | Expected: 2026</span>
              </p>
            </motion.div>

            <motion.div className="bento-box glass-card" variants={fadeInUp}>
              <h3 className="bento-title">Personal Info</h3>
              <ul className="info-list">
                <li><span className="label">City:</span> {personalInfo.city}</li>
                <li><span className="label">Phone:</span> {personalInfo.phone}</li>
                <li><span className="label">Email:</span> {personalInfo.email}</li>
                <li><span className="label">English:</span> Intermediate / Working</li>
              </ul>
            </motion.div>

            <motion.div className="bento-box glass-card soft-skills-box" variants={fadeInUp}>
              <h3 className="bento-title">Soft Skills</h3>
              <div className="soft-skills-tags">
                {['Problem Solving', 'Analytical Thinking', 'Team Collaboration', 'Communication', 'Time Management', 'Adaptability'].map(s => (
                  <span key={s} className="soft-skill-tag">{s}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="bento-box stats-box glass-card" variants={fadeInUp}>
              <div className="stat-item">
                <div className="stat-num">2+</div>
                <div className="stat-lbl">Years Coding</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">4+</div>
                <div className="stat-lbl">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">4</div>
                <div className="stat-lbl">Certifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">8+</div>
                <div className="stat-lbl">Technologies</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '1rem'}}>Technical Skills</h2>
          <p className="section-subtitle">Full-stack capabilities across backend, frontend, databases and cloud</p>

          <div className="skills-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >All</button>
            {skillCategories.map(c => (
              <button 
                key={c.category}
                className={`tab-btn ${activeTab === c.category ? 'active' : ''}`}
                onClick={() => setActiveTab(c.category)}
              >
                {c.icon} {c.category}
              </button>
            ))}
          </div>

          <motion.div 
            className="skills-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {(activeTab === 'all' ? allSkills : skillCategories.find(c => c.category === activeTab)?.skills || []).map(skill => (
              <motion.div key={skill.name} className="skill-card glass-card" variants={fadeInUp}>
                <div className="skill-info">
                  <h4>{skill.name}</h4>
                  <span className={`level-badge level-${skill.level.toLowerCase().split(' ')[0]}`}>{skill.level}</span>
                </div>
                <div className="progress-bg">
                  <motion.div 
                    className="progress-fill" 
                    initial={{width: 0}} 
                    whileInView={{width: `${skill.progress}%`}} 
                    transition={{duration: 1.5, delay: 0.3}}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '0.5rem'}}>Featured Projects</h2>
          <p className="section-subtitle">Real-world applications built with modern tech stacks</p>

          <motion.div 
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {projects.map(p => (
              <motion.div key={p.id} className={`project-card glass-card project-${p.color}`} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                <div className="project-header">
                  <span className={`project-badge badge-${p.color}`}>{p.badge}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6'}}>{p.desc}</p>
                <div className="tech-tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                <a href={p.link} className="btn btn-outline" onClick={(e) => e.preventDefault()}>
                  Private Repository
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certs-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '0.5rem'}}>Certifications</h2>
          <p className="section-subtitle">Continuous learning and professional development</p>

          <motion.div 
            className="certs-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {certifications.map((cert, i) => (
              <motion.div key={i} className={`cert-card glass-card cert-${cert.color}`} variants={fadeInUp} whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-year"> · {cert.year}</span>
                  </div>
                </div>
                <div className={`cert-badge badge-${cert.color}`}>Earned</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.div 
          className="container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="contact-card glass-card">
            <h2>Let's Work Together!</h2>
            <p style={{marginBottom: '2rem', color: '#ccc'}}>Seeking internship opportunities in Software Engineering and Backend Development. Have a project or opportunity? Let's connect!</p>
            
            <form onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <input type="text" name="from_name" placeholder="Your Name" required />
                <input type="email" name="reply_to" placeholder="Your Email" required />
              </div>
              <textarea name="message" placeholder="How can I help you?" rows="5" required></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            
          </div>
          <p className="copyright" style={{marginTop: '3rem', fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>
            2026 M.G. Naveen Dilshan. All rights reserved.
          </p>
        </motion.div>
      </section>

      {/* Chatbot Interface */}
      <div className="chatbot-wrapper">
        {!isBotOpen && <button className="chat-toggle-btn" onClick={() => setIsBotOpen(true)}>Ask Navee AI</button>}
        {isBotOpen && (
          <div className="chat-window glass-card">
            <div className="chat-header">
                <span>Navee AI Assistant</span>
                <button onClick={() => setIsBotOpen(false)} style={{background:'none', border:'none', color:'white', fontSize:'1.2rem', cursor:'pointer'}}>x</button>
            </div>
            <div className="chat-messages">
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>{m.text}</div>
                ))}
                {isLoading && <div className="message bot"><span>...</span></div>}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
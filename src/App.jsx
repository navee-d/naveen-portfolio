import { useState, useEffect, useRef } from 'react'
import './App.css'

// IMPORTANT: Import your image here
import profilePic from './assets/profile.jpg' 

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "ආයුබෝවන්! මම Navee AI Campus Helper. ඔයාට Assignment වලට උදව් ඕනද?", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const personalInfo = {
    name: "M.G. Naveen Dilshana",
    age: "21 Years",
    address: "Nawalapitiya, Sri Lanka",
    email: "dilshannaveen124@gmail.com",
    phone: "072 812 1216"
  }

  const projects = [
    {
      id: 1,
      title: 'Vehicle Inventory System (VIMS)',
      description: 'A complete system to manage vehicle inventories, tracking sales, and status updates for Hexalyte Technology.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'React'],
      repoLink: 'https://github.com/Hexalyte-technology/hexalyte-vims'
    },
    {
      id: 2,
      title: 'Service Finder Platform',
      description: 'A platform connecting service providers with customers. Features booking management and real-time search.',
      techStack: ['Spring Boot', 'Java', 'MySQL', 'React'],
      repoLink: 'https://github.com/hexalyte-technology-pvt-ltd/hexalyte-service-finder'
    },
    {
      id: 3,
      title: 'ATI Nawalapitiya Web',
      description: 'Official website development for SLIATE ATI Nawalapitiya to manage student information and news.',
      techStack: ['PHP', 'HTML/CSS', 'JavaScript'],
      repoLink: 'https://github.com/navee-d/atinawalapitiyaweb'
    },
    {
      id: 4,
      title: 'LMS (Learning Management)',
      description: 'A custom Learning Management System for student course tracking and material distribution.',
      techStack: ['MERN Stack', 'Tailwind CSS'],
      repoLink: 'https://github.com/navee-d/LMs'
    }
  ]

  const skills = [
    { name: 'Java', level: 'Advanced' },
    { name: 'C#', level: 'Advanced' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'React.js', level: 'Advanced' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Spring Boot', level: 'Advanced' },
    { name: 'MongoDB', level: 'Intermediate' },
    { name: 'MySQL', level: 'Advanced' }
  ]

  const contactInfo = {
    whatsapp: "https://wa.me/94728121216", 
    instagram: "https://www.instagram.com/navee0_312?igsh=MXYxbDdpN2xvNTZpOQ%3D%3D&utm_source=qr",
    linkedin: "https://linkedin.com/in/naveen-edirisinghe",
    phone: "072 812 1216"
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${AGENT_URL}/api/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AGENT_KEY}`
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: currentInput }]
        })
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "සමාවෙන්න, මට එය තේරුම් ගන්න බැහැ.";
      setMessages(prev => [...prev, { text: aiReply, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error: AI සම්බන්ධතා දෝෂයක්.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">M.G. Naveen</span>
          </div>
          <div className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section (Text Left, Image Right) */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
              </h1>
              <div className="hero-subtitle">
                <span className="typing-text">Full Stack Developer</span>
                <span className="separator">|</span>
                <span className="typing-text">HNDIT Student</span>
              </div>
              <p className="hero-description">
                Crafting robust software for real-world problems. From Inventory Management Systems 
                to AI-powered web tools, I bring ideas to life with modern technology.
              </p>
              <div className="hero-buttons">
                <a href={contactInfo.whatsapp} target="_blank" className="btn btn-primary">
                  Let's Chat
                </a>
                <button className="btn btn-secondary" onClick={() => document.getElementById('projects').scrollIntoView()}>
                  View Projects
                </button>
              </div>
            </div>
            
            {/* Profile Image MOVED HERE for Better Look */}
            <div className="hero-image-container">
              <div className="profile-img-wrapper">
                <img src={profilePic} alt="Profile" className="profile-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section (Compact & Clean) */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content glass-card compact-card">
            <p className="about-paragraph">
              I am a Full Stack Developer and a 2nd-year HNDIT student at SLIATE ATI Nawalapitiya. 
              I specialize in building clean, scalable applications using React, Node.js, and Spring Boot.
            </p>
            
            {/* Personal Details with LINKS */}
            <div className="personal-info-grid">
              <div className="info-item">
                <span className="info-label">Age</span>
                <span className="info-value">{personalInfo.age}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{personalInfo.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="info-link">{personalInfo.email}</a>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="info-link">{personalInfo.phone}</a>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Exp.</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Repos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card glass-card">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-level">{skill.level}</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: skill.level === 'Advanced' ? '90%' : '70%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card glass-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.repoLink} target="_blank" className="project-link">View Code</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" style={{padding: '100px 0'}}>
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="glass-card contact-card">
            <h3 className="contact-heading">Let's Work Together! 🚀</h3>
            <p className="contact-text">
              Have a project in mind? Let's connect instantly.
            </p>
            <div className="contact-buttons">
              <a href={contactInfo.whatsapp} target="_blank" className="btn btn-primary contact-btn">
                <span style={{marginRight: '10px', fontSize: '1.4rem'}}>💬</span> Chat on WhatsApp
              </a>
              <a href={contactInfo.instagram} target="_blank" className="btn btn-secondary contact-btn">
                <span style={{marginRight: '10px', fontSize: '1.4rem'}}>📸</span> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2026 {personalInfo.name}. All rights reserved.</p>
            <div className="footer-social">
              <a href={contactInfo.whatsapp} target="_blank" className="social-link">📱</a>
              <a href={contactInfo.instagram} target="_blank" className="social-link">📸</a>
              <a href="https://github.com/navee-d" target="_blank" className="social-link">💻</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="chatbot-wrapper">
        {!isBotOpen && (
          <button className="chat-toggle-btn" onClick={() => setIsBotOpen(true)}>
            💬 AI Campus Tutor
          </button>
        )}
        {isBotOpen && (
          <div className="chat-window glass-card">
            <div className="chat-header">
              <span>Navee AI Campus Helper 🎓</span>
              <button className="close-btn" onClick={() => setIsBotOpen(false)}>×</button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="message bot">
                  <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input 
                type="text" placeholder="Type here..." value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()} disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading}>{isLoading ? '...' : 'Send'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
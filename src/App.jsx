import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "ආයුබෝවන්! මම Navee AI Campus Helper. ඔයාට Assignment වලට උදව් ඕනද?", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  // API Credentials
  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Real Projects
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

  // Contact Details
  const contactInfo = {
    whatsapp: "https://wa.me/94728121216", 
    instagram: "https://www.instagram.com/navee0_312?igsh=MXYxbDdpN2xvNTZpOQ%3D%3D&utm_source=qr",
    linkedin: "https://linkedin.com/in/naveen-edirisinghe",
    phone: "072 812 1216"
  }

  // Real AI Logic
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
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { text: "Error: AI එකට සම්බන්ධ වීමට නොහැක. කරුණාකර නැවත උත්සාහ කරන්න.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">M.G. Naveen Dilshana</span>
              </h1>
              <div className="hero-subtitle">
                <span className="typing-text">Full Stack Developer</span>
                <span className="separator">|</span>
                <span className="typing-text">HNDIT Student</span>
              </div>
              
              {/* UPDATED TAGLINE */}
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content glass-card">
            <p className="about-paragraph">
              I am a Full Stack Developer and a 2nd-year HNDIT student at SLIATE ATI Nawalapitiya. 
              With a strong foundation in both frontend and backend technologies, I love turning complex problems into simple, beautiful, and intuitive designs.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Repositories</div>
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

      {/* Contact Section (UPDATED: Hidden Number) */}
      <section id="contact" className="contact-section" style={{padding: '100px 0'}}>
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="glass-card" style={{padding: '4rem 2rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto'}}>
            <h3 style={{fontSize: '2rem', marginBottom: '1rem', color: '#fff'}}>Let's Work Together! 🚀</h3>
            <p style={{marginBottom: '2.5rem', color: '#a0a0a0', fontSize: '1.1rem', lineHeight: '1.8'}}>
              Have a project in mind or just want to say hi? <br/>
              Click the button below to connect with me instantly.
            </p>
            
            <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
              {/* WhatsApp Button */}
              <a href={contactInfo.whatsapp} target="_blank" className="btn btn-primary" style={{textDecoration: 'none', padding: '15px 35px', display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '10px', fontSize: '1.4rem'}}>💬</span> Chat on WhatsApp
              </a>
              {/* Instagram Button */}
              <a href={contactInfo.instagram} target="_blank" className="btn btn-secondary" style={{textDecoration: 'none', padding: '15px 35px', display: 'flex', alignItems: 'center'}}>
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
            <p>&copy; 2026 M.G. Naveen Dilshana. All rights reserved.</p>
            <div className="footer-social">
              <a href={contactInfo.whatsapp} target="_blank" className="social-link">📱</a>
              <a href={contactInfo.instagram} target="_blank" className="social-link">📸</a>
              <a href="https://github.com/navee-d" target="_blank" className="social-link">💻</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI CHATBOT WIDGET */}
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
                  <span className="typing-dot">.</span>
                  <span className="typing-dot">.</span>
                  <span className="typing-dot">.</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input 
                type="text" 
                placeholder="ප්‍රශ්නයක් අහන්න..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading}>
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
import { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion' 
import './App.css'
// Note: Ensure this path is correct for your project structure
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
      staggerChildren: 0.2
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
  const chatEndRef = useRef(null)

  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const personalInfo = {
    name: "M.G. Naveen Dilshan",
    age: "21 Years",
    city: "Nawalapitiya",
    phone: "072 812 1216",
    email: "dilshannaveen124@gmail.com"
  }

  const skills = [
    { name: 'Java', level: 'Advanced', progress: 85 },
    { name: 'C#', level: 'Advanced', progress: 80 },
    { name: 'Python', level: 'Intermediate', progress: 60 },
    { name: 'React.js', level: 'Advanced', progress: 90 },
    { name: 'Node.js', level: 'Advanced', progress: 85 },
    { name: 'Spring Boot', level: 'Advanced', progress: 85 },
    { name: 'MongoDB', level: 'Intermediate', progress: 70 },
    { name: 'MySQL', level: 'Advanced', progress: 90 }
  ]

  const projects = [
    // Links are removed (set to #) so the button stays but does nothing
    { id: 1, title: 'Vehicle Inventory System (VIMS)', desc: 'A complete system to manage inventories for Hexalyte Technology.', tech: ['Node.js', 'Express', 'MongoDB', 'React'], link: '#' },
    { id: 2, title: 'Service Finder Platform', desc: 'Connecting service providers with customers in real-time.', tech: ['Spring Boot', 'Java', 'MySQL', 'React'], link: '#' },
    { id: 3, title: 'ATI Nawalapitiya Web', desc: 'Official website development for SLIATE ATI Nawalapitiya.', tech: ['PHP', 'HTML/CSS', 'JavaScript'], link: '#' },
    { id: 4, title: 'LMS (Learning Management)', desc: 'Custom LMS for student course tracking and material distribution.', tech: ['MERN Stack', 'Tailwind CSS'], link: '#' }
  ]

  // ===== FIXED EMAIL FUNCTION =====
  const sendEmail = (e) => {
    e.preventDefault();
    
    // 1. Get the Sender's Name from the form input
    const senderName = e.target.from_name.value;

    emailjs.sendForm(
      'service_qzdj9h6',      
      'template_dzxe7i9',     
      e.target,
      'Z8EWbyIIbI1e9gu-P'     
    )
    .then((result) => {
        console.log("Email success:", result.text);
        
        // 2. Use the SENDER'S name in the thank you message
        alert(`Message sent successfully! Thank you, ${senderName}.`);
        
        e.target.reset();
    }, (error) => {
        console.error("Email error:", error.text);
        
        // 3. Error message in English
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
            <h1 className="hero-title">Hi, I'm <span className="gradient-text">M.G. Naveen Dilshan</span></h1>
            <p className="hero-subtitle">Full Stack Developer | HNDIT Student</p>
            <p className="hero-description">Crafting robust software for real-world problems. From Inventory Management Systems to AI powered web tools, I bring ideas to life with modern technology.</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Let's Chat</a>
              <a href="#projects" className="btn btn-secondary">View Projects</a>
            </div>
          </motion.div>
          <motion.div className="hero-image-container" variants={fadeInUp}>
            <div className="profile-img-wrapper">
                <img src={profilePic} alt="Naveen" className="profile-img" />
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
                I'm <span className="highlight-text">M.G. Naveen Dilshan</span>, a passionate Full Stack Developer and HNDIT student at SLIATE ATI Nawalapitiya. 
                <br/><br/>
                I specialize in building clean, scalable applications using <b>React, Node.js, and Spring Boot</b>. My goal is to simplify complex problems with elegant code solutions.
              </p>
            </motion.div>

            <motion.div className="bento-box glass-card" variants={fadeInUp}>
              <h3 className="bento-title">🎓 Education</h3>
              <p>HND in Information Technology<br/><span className="label">SLIATE ATI, Nawalapitiya</span></p>
            </motion.div>
            
            <motion.div className="bento-box glass-card" variants={fadeInUp}>
              <h3 className="bento-title">🚀 Personal Info</h3>
              <ul className="info-list">
                <li><span className="label">Age:</span> {personalInfo.age}</li>
                <li><span className="label">City:</span> {personalInfo.city}</li>
                <li><span className="label">Phone:</span> {personalInfo.phone}</li>
              </ul>
            </motion.div>

            <motion.div className="bento-box stats-box glass-card" variants={fadeInUp}>
                <div className="stat-item">
                    <div className="stat-num">02+</div>
                    <div className="stat-lbl">Years Exp.</div>
                </div>
                <div className="stat-item">
                    <div className="stat-num">15+</div>
                    <div className="stat-lbl">Repositories</div>
                </div>
                <div className="stat-item">
                    <div className="stat-num">10+</div>
                    <div className="stat-lbl">Projects</div>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '3rem'}}>My Skills</h2>
          <motion.div 
            className="skills-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {skills.map(skill => (
              <motion.div key={skill.name} className="skill-card glass-card" variants={fadeInUp}>
                <div className="skill-info">
                  <h4>{skill.name}</h4>
                  <span className="level-badge">{skill.level}</span>
                </div>
                <div className="progress-bg"><motion.div className="progress-fill" initial={{width: 0}} whileInView={{width: `${skill.progress}%`}} transition={{duration: 1.5, delay: 0.5}}></motion.div></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '3rem'}}>Featured Projects</h2>
          <motion.div 
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {projects.map(p => (
              <motion.div key={p.id} className="project-card glass-card" variants={fadeInUp} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <h3>{p.title}</h3>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{p.desc}</p>
                <div className="tech-tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                
                {/* BUTTON RESTORED BUT LINK IS DEAD (#) */}
                <a href={p.link} className="btn btn-outline" onClick={(e) => e.preventDefault()}>View Code</a>
                
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
            <h2>Let's Work Together! 🚀</h2>
            <p style={{marginBottom: '2rem', color: '#ccc'}}>Have a project in mind? Let's discuss how I can help you.</p>
            
            <form onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <input type="text" name="from_name" placeholder="Your Name" required />
                <input type="email" name="reply_to" placeholder="Your Email" required />
              </div>
              <textarea name="message" placeholder="How can I help you?" rows="5" required></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            
          </div>
          <p className="copyright" style={{marginTop: '3rem', fontSize: '0.8rem', color: '#666'}}>© 2026 M.G. Naveen Dilshana. All rights reserved.</p>
        </motion.div>
      </section>

      {/* Chatbot Interface */}
      <div className="chatbot-wrapper">
        {!isBotOpen && <button className="chat-toggle-btn" onClick={() => setIsBotOpen(true)}>AI Campus Tutor</button>}
        {isBotOpen && (
          <div className="chat-window glass-card">
            <div className="chat-header">
                <span>Navee AI Assistant</span>
                <button onClick={() => setIsBotOpen(false)} style={{background:'none', border:'none', color:'white', fontSize:'1.2rem', cursor:'pointer'}}>×</button>
            </div>
            <div className="chat-messages">
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>{m.text}</div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." />
              <button onClick={handleSend}>➤</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
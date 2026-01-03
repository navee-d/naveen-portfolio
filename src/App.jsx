import { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
import './App.css'
// Make sure this path is correct based on your folder structure
import profilePic from './assets/profile.jpg' 

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "ආයුබෝවන්! මම Navee AI Helper. ඔයාට උදව් ඕනද?", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  // SECURITY NOTE: In a real production app, hide these keys in an .env file!
  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const personalInfo = {
    name: "M.G. Naveen Dilshana",
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
    { id: 1, title: 'Vehicle Inventory System (VIMS)', desc: 'A complete system to manage inventories for Hexalyte Technology.', tech: ['Node.js', 'Express', 'MongoDB', 'React'], link: 'https://github.com/Hexalyte-technology/hexalyte-vims' },
    { id: 2, title: 'Service Finder Platform', desc: 'Connecting service providers with customers in real-time.', tech: ['Spring Boot', 'Java', 'MySQL', 'React'], link: 'https://github.com/hexalyte-technology-pvt-ltd/hexalyte-service-finder' },
    { id: 3, title: 'ATI Nawalapitiya Web', desc: 'Official website development for SLIATE ATI Nawalapitiya.', tech: ['PHP', 'HTML/CSS', 'JavaScript'], link: 'https://github.com/navee-d/atinawalapitiyaweb' },
    { id: 4, title: 'LMS (Learning Management)', desc: 'Custom LMS for student course tracking and material distribution.', tech: ['MERN Stack', 'Tailwind CSS'], link: 'https://github.com/navee-d/LMs' }
  ]

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_rzm4sa1',    
      'template_3f76hve',   
      e.target,
      '-SL62jnS9PQt-tsKn'   
    )
    .then((result) => {
        console.log(result.text);
        alert("පණිවිඩය සාර්ථකව ලැබුණා! ස්තුතියි Naveen.");
        e.target.reset();
    }, (error) => {
        console.log(error.text);
        alert("දෝෂයක් සිදුවුණා, පසුව උත්සාහ කරන්න.");
    });
  };

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
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${AGENT_KEY}` },
        body: JSON.stringify({ messages: [{ role: "user", content: currentInput }] })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.choices?.[0]?.message?.content || "සමාවෙන්න...", isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "AI Error.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      {/* Navbar */}
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
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Hi, I'm <span className="gradient-text">M.G. Naveen Dilshana</span></h1>
            <p className="hero-subtitle">Full Stack Developer | HNDIT Student</p>
            <p className="hero-description">Crafting robust software for real-world problems. From Inventory Management Systems to AI powered web tools, I bring ideas to life with modern technology.</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Let's Chat</a>
              <a href="#projects" className="btn btn-secondary">View Projects</a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="profile-img-wrapper">
                <img src={profilePic} alt="Naveen" className="profile-img" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '2rem'}}>About Me</h2>
          
          <div className="bento-grid">
            {/* Main Bio Box */}
            <div className="bento-box glass-card bio-box">
              <h3 className="bento-title">Who am I? 💻</h3>
              <p>I'm M.G. Naveen Dilshana, a passionate Full Stack Developer and HNDIT student at SLIATE ATI Nawalapitiya. I specialize in building clean, scalable applications using React, Node.js, and Spring Boot.</p>
            </div>

            {/* Side Boxes */}
            <div className="bento-box glass-card">
              <h3 className="bento-title">🎓 Education</h3>
              <p>HND in Information Technology<br/><span className="label">SLIATE ATI, Nawalapitiya</span></p>
            </div>
            
            <div className="bento-box glass-card">
              <h3 className="bento-title">🚀 Personal Info</h3>
              <ul className="info-list">
                <li><span className="label">Age:</span> {personalInfo.age}</li>
                <li><span className="label">City:</span> {personalInfo.city}</li>
                <li><span className="label">Phone:</span> {personalInfo.phone}</li>
              </ul>
            </div>

            {/* Stats Bar */}
            <div className="bento-box stats-box glass-card">
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
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '3rem'}}>My Skills</h2>
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.name} className="skill-card glass-card">
                <div className="skill-info">
                  <h4>{skill.name}</h4>
                  <span className="level-badge">{skill.level}</span>
                </div>
                <div className="progress-bg"><div className="progress-fill" style={{width: `${skill.progress}%`}}></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center', marginBottom: '3rem'}}>Featured Projects</h2>
          <div className="projects-grid">
            {projects.map(p => (
              <div key={p.id} className="project-card glass-card">
                <h3>{p.title}</h3>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{p.desc}</p>
                <div className="tech-tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                <a href={p.link} className="btn btn-outline">View Code</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
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
        </div>
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
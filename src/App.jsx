import { useState, useEffect, useRef } from 'react'
import './App.css'
import profilePic from './assets/profile.jpg' 

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "ආයුබෝවන්! මම Navee AI Helper. ඔයාට උදව් ඕනද?", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // මෙතන නම "Naveen Dilshan" ලෙස අප්ඩේට් කළා
  const personalInfo = {
    name: "M.G. Naveen Dilshan",
    age: "21 Years",
    address: "No 2, Hunugaloya, Kataboolwa, Nawalapitiya",
    email: "dilshannaveen124@gmail.com",
    phone: "072 812 1216"
  }

  const projects = [
    { id: 1, title: 'Vehicle Inventory System (VIMS)', techStack: ['Node.js', 'Express', 'MongoDB', 'React'], repoLink: 'https://github.com/Hexalyte-technology/hexalyte-vims' },
    { id: 2, title: 'Service Finder Platform', techStack: ['Spring Boot', 'Java', 'MySQL', 'React'], repoLink: 'https://github.com/hexalyte-technology-pvt-ltd/hexalyte-service-finder' },
    { id: 3, title: 'ATI Nawalapitiya Web', techStack: ['PHP', 'HTML/CSS', 'JavaScript'], repoLink: 'https://github.com/navee-d/atinawalapitiyaweb' },
    { id: 4, title: 'LMS (Learning Management)', techStack: ['MERN Stack', 'Tailwind CSS'], repoLink: 'https://github.com/navee-d/LMs' }
  ]

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
      setMessages(prev => [...prev, { text: "Error: AI දෝෂයක්.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">navee<span className="gradient-text">.me</span></span>
          </div>
          <div className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Projects</a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Hi, I'm <span className="gradient-text">{personalInfo.name}</span></h1>
              <div className="hero-subtitle">Full Stack Developer | HNDIT Student</div>
              <p className="hero-description">Crafting robust software for real-world problems. I bring ideas to life with modern technology.</p>
              <div className="hero-buttons">
                <a href={`https://wa.me/94728121216`} className="btn btn-primary">Let's Chat</a>
                <button className="btn btn-secondary" onClick={() => document.getElementById('projects').scrollIntoView()}>View Projects</button>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="profile-img-wrapper">
                <img src={profilePic} alt="Naveen Dilshan" className="profile-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="project-card glass-card">
                <h3>{p.title}</h3>
                <div className="project-tech">{p.techStack.map(t => <span key={t} className="tech-badge">{t}</span>)}</div>
                <a href={p.repoLink} className="project-link">View Repository ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Interface */}
      <div className="chatbot-wrapper">
        {!isBotOpen && <button className="chat-toggle-btn" onClick={() => setIsBotOpen(true)}>💬 Chat with Navee AI</button>}
        {isBotOpen && (
          <div className="chat-window glass-card">
            <div className="chat-header"><span>Navee AI 🎓</span><button onClick={() => setIsBotOpen(false)}>×</button></div>
            <div className="chat-messages">{messages.map((m, i) => <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>{m.text}</div>)}<div ref={chatEndRef} /></div>
            <div className="chat-input-area">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default App
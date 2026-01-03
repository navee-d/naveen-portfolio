import { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
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
  const form = useRef();

  const AGENT_URL = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run";
  const AGENT_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZ";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const personalInfo = {
    name: "M.G. Naveen Dilshan",
    email: "dilshannaveen124@gmail.com",
    phone: "072 812 1216",
    address: "No 2, Hunugaloya, Kataboolwa, Nawalapitiya"
  }

  const projects = [
    { id: 1, title: 'Vehicle Inventory System (VIMS)', techStack: ['Node.js', 'MongoDB', 'React'], repoLink: 'https://github.com/Hexalyte-technology/hexalyte-vims' },
    { id: 2, title: 'Service Finder Platform', techStack: ['Spring Boot', 'MySQL', 'React'], repoLink: 'https://github.com/hexalyte-technology-pvt-ltd/hexalyte-service-finder' },
    { id: 3, title: 'ATI Nawalapitiya Web', techStack: ['PHP', 'HTML/CSS', 'JS'], repoLink: 'https://github.com/navee-d/atinawalapitiyaweb' },
    { id: 4, title: 'LMS (Learning Management)', techStack: ['MERN Stack', 'Tailwind'], repoLink: 'https://github.com/navee-d/LMs' }
  ]

  // EmailJS Integration with your Keys
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_rzm4sa1',    // ඔයාගේ Service ID
      'YOUR_TEMPLATE_ID',   // මෙතනට EmailJS එකේ ඇති Template ID එක දාන්න
      e.target,
      '-SL62jnS9PQt-tsKn'   // ඔයාගේ Public Key
    )
    .then((result) => {
        alert("පණිවිඩය සාර්ථකව ලැබුණා! ස්තුතියි Naveen.");
        e.target.reset();
    }, (error) => {
        alert("දෝෂයක් සිදුවුණා: " + error.text);
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
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">navee<span className="gradient-text">.me</span></span>
          </div>
          <div className="nav-menu">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Hi, I'm <span className="gradient-text">{personalInfo.name}</span></h1>
            <p>Full Stack Developer | HNDIT Student</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Hire Me</a>
              <a href="#projects" className="btn btn-secondary">Works</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={profilePic} alt="Naveen Dilshan" className="profile-img" />
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            {projects.map(p => (
              <div key={p.id} className="project-card glass-card">
                <h3>{p.title}</h3>
                <div className="tech-stack">{p.techStack.map(t => <span key={t}>{t}</span>)}</div>
                <a href={p.repoLink} target="_blank" rel="noreferrer">Code ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container glass-card">
            <form onSubmit={sendEmail} className="contact-form">
              <input type="text" name="from_name" placeholder="Your Name" required />
              <input type="email" name="reply_to" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            <div className="contact-details">
              <p>📧 {personalInfo.email}</p>
              <p>📞 {personalInfo.phone}</p>
              <p>📍 {personalInfo.address}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="chatbot-wrapper">
        {!isBotOpen && <button className="chat-toggle" onClick={() => setIsBotOpen(true)}>💬 Chat</button>}
        {isBotOpen && (
          <div className="chat-window glass-card">
            <div className="chat-header">Navee AI <button onClick={() => setIsBotOpen(false)}>×</button></div>
            <div className="chat-messages">{messages.map((m, i) => <div key={i} className={`msg ${m.isBot ? 'bot' : 'user'}`}>{m.text}</div>)}</div>
            <div className="chat-input"><input value={input} onChange={e => setInput(e.target.value)} /><button onClick={handleSend}>➤</button></div>
          </div>
        )}
      </div>
    </div>
  )
}
export default App
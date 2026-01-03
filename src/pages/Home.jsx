import { Link } from 'react-router-dom'

function Home({ contactInfo }) {
  return (
    <>
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
              <p className="hero-description">
                Passionate about creating innovative web solutions. Building the future with code, 
                from Hexalyte VIMS to modern web apps.
              </p>
              <div className="hero-buttons">
                <a href={contactInfo.whatsapp} target="_blank" className="btn btn-primary">
                  Let's Chat
                </a>
                <Link to="/projects" className="btn btn-secondary">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick About Section */}
      <section className="about-section" style={{ padding: '100px 0' }}>
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
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/about" className="btn btn-primary">
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

function About({ skills }) {
  return (
    <>
      {/* About Section */}
      <section className="about-section" style={{ paddingTop: '150px' }}>
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content glass-card">
            <p className="about-paragraph">
              I am M.G. Naveen Dilshana Edirisinghe, a passionate Full Stack Developer and a 2nd-year HNDIT student at SLIATE ATI Nawalapitiya. 
              My journey in software development started with a curiosity about how things work behind the scenes, 
              and it has evolved into a deep passion for creating innovative digital solutions.
            </p>
            <p className="about-paragraph">
              I specialize in both frontend and backend development, with expertise in modern technologies like 
              React.js, Node.js, Spring Boot, and various programming languages including Java, C#, and Python. 
              I'm constantly learning and pushing myself to build better, more efficient applications.
            </p>
            <p className="about-paragraph">
              My goal is to leverage my technical skills to develop impactful software solutions that solve 
              real-world problems and create exceptional user experiences. I've worked on various projects including 
              the Vehicle Inventory Management System (VIMS) for Hexalyte Technology, a Service Finder Platform, 
              and the official website for ATI Nawalapitiya.
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
      <section className="skills-section">
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

      {/* Education Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00f2ff' }}>
              Higher National Diploma in Information Technology (HNDIT)
            </h3>
            <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
              SLIATE - ATI Nawalapitiya
            </p>
            <p style={{ color: '#a0a0a0' }}>
              2024 - Present (2nd Year)
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About

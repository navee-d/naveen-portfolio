function Projects({ projects }) {
  return (
    <section className="projects-section" style={{ paddingTop: '150px' }}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p style={{ fontSize: '1.1rem', color: '#a0a0a0', marginBottom: '3rem' }}>
          Here are some of my recent projects that showcase my skills in full-stack development.
        </p>
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
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Code
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a 
            href="https://github.com/navd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects

function Contact({ contactInfo }) {
  return (
    <section className="contact-section" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        {/* Contact Info Cards */}
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#a0a0a0', textAlign: 'center', marginBottom: '2rem' }}>
            Have a project in mind or just want to say hi? Feel free to connect with me!
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {/* WhatsApp */}
            <a 
              href={contactInfo.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card"
              style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{ color: '#00f2ff', marginBottom: '0.5rem' }}>WhatsApp</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>{contactInfo.phone}</p>
            </a>

            {/* Instagram */}
            <a 
              href={contactInfo.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card"
              style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
              <h3 style={{ color: '#00f2ff', marginBottom: '0.5rem' }}>Instagram</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>@navee0_312</p>
            </a>

            {/* LinkedIn */}
            <a 
              href={contactInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card"
              style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
              <h3 style={{ color: '#00f2ff', marginBottom: '0.5rem' }}>LinkedIn</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Connect with me</p>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/navee-d" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card"
              style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
              <h3 style={{ color: '#00f2ff', marginBottom: '0.5rem' }}>GitHub</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>@navee-d</p>
            </a>
          </div>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            <a 
              href={contactInfo.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              <span style={{ marginRight: '8px' }}>📱</span> Chat on WhatsApp
            </a>
            <a 
              href={contactInfo.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <span style={{ marginRight: '8px' }}>📸</span> Follow on Instagram
            </a>
          </div>
        </div>

        {/* Location & Availability */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
            <h3 style={{ color: '#00f2ff', marginBottom: '0.5rem' }}>Location</h3>
            <p style={{ color: '#a0a0a0' }}>Sri Lanka</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ color: '#00f2ff', marginBottom: '0.5rem' }}>Availability</h3>
            <p style={{ color: '#a0a0a0' }}>Open for opportunities</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

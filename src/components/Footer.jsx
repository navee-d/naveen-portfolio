function Footer({ contactInfo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2026 M.G. Naveen Dilshana. All rights reserved.</p>
          <div className="footer-social">
            <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link" title="WhatsApp">
              📱
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
              📸
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              💼
            </a>
            <a href="https://github.com/navee-d" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              💻
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

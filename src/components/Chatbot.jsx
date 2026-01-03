import { useState, useEffect, useRef } from 'react'

function Chatbot({ contactInfo }) {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Naveen's AI Assistant. Ask me anything about him!", isBot: true }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  const API_ENDPOINT = "https://wigdnksubw3ngtuhjbzpc7yq.agents.do-ai.run"
  const ACCESS_KEY = "l7kt4QprYUzucEc7ehpcvACDVHtfR5eZAccess Key"

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setIsLoading(true)
    setInput("");

    try {
      // Call the real API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ACCESS_KEY}`
        },
        body: JSON.stringify({
          message: input,
          context: "I am Naveen, a Full Stack Developer and HNDIT student at SLIATE ATI Nawalapitiya. I work with React, Node.js, Java, Spring Boot, Python, and databases like MongoDB and MySQL."
        })
      })

      if (response.ok) {
        const data = await response.json()
        const botResponse = data.response || data.message || "I'm processing your request..."
        
        setMessages(prev => [...prev, { 
          text: botResponse, 
          isBot: true 
        }])
      } else {
        // Fallback response if API fails
        const fallbackResponses = [
          "That's a great question! Feel free to WhatsApp Naveen directly for more details.",
          "I appreciate your interest! Connect with Naveen on WhatsApp for a detailed discussion.",
          "Thanks for asking! You can reach Naveen at 072 812 1216 or via WhatsApp for more information."
        ]
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        
        setMessages(prev => [...prev, { 
          text: randomResponse, 
          isBot: true 
        }])
      }
    } catch (error) {
      console.error("Chatbot API error:", error)
      
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try WhatsApp! 📱", 
        isBot: true 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chatbot-wrapper">
      {!isBotOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsBotOpen(true)}>
          💬 Chat with AI
        </button>
      )}
      
      {isBotOpen && (
        <div className="chat-window glass-card">
          <div className="chat-header">
            <span>Naveen's Assistant 🤖</span>
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
                <span style={{ animation: 'pulse 1s infinite' }}>Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Ask about Naveen..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/", { message });
      const botMessage = { sender: "bot", text: response.data.response };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = {
        sender: "bot",
        text: "⚠️ Sorry, I can’t reach the server right now.",
      };
      setChatHistory((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Auto scroll to latest
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  return (
    <div className="app-bg">
      <div className="chat-wrapper">
        <header className="chat-header">
          <div className="chat-avatar">🤖</div>
          <h2 className="chat-title">LLMinds ChatBot</h2>
        </header>

        <div className="chat-box">
          {chatHistory.map((chat, i) => (
            <div
              key={i}
              className={`chat-message ${
                chat.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="bubble">{chat.text}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-message bot-message">
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button type="submit" className="send-btn">
            <FiSend size={22} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
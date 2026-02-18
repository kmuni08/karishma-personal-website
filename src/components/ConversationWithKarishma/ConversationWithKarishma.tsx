'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User } from 'lucide-react';
import './ConversationWithKarishma.css';

export const ConversationWithKarishma = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hi! I\'m here to answer questions about Karishma. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          assistantMessage += text;
          
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: assistantMessage
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      <button
        className={`chat-toggle-btn ${isOpen ? 'chat-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={28} className="toggle-close" />
        ) : (
          <>
            <MessageCircle size={28} />
            {!isOpen && (
              <span className="chat-badge">
                💬
              </span>
            )}
          </>
        )}
      </button>

      <div className={`chatbot-container ${isOpen ? 'chat-visible' : ''}`}>
        <div className="chatbot-card">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <Sparkles size={24} />
              </div>
              <div className="chatbot-header-text">
                <h3 className="chatbot-title">Chat with Karishma</h3>
                <p className="chatbot-status">
                  <span className="status-dot"></span>
                  Online now
                </p>
              </div>
            </div>
            <Sparkles size={20} className="sparkle-icon" />
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`message-wrapper message-${message.role}`}
              >
                <div className="message-avatar">
                  {message.role === 'assistant' ? (
                    <Sparkles size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="message-bubble">
                  <p className="message-text">{message.content}</p>
                  <span className="message-time">{formatTime()}</span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message-wrapper message-bot">
                <div className="message-avatar">
                  <Sparkles size={20} />
                </div>
                <div className="message-bubble typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Karishma..."
              disabled={isLoading}
              className="chatbot-input"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="chatbot-send-btn"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
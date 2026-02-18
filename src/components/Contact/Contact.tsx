import { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import './Contact.css';

export const Contact = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const contactLinks = [
  {
    id: 'email',
    icon: Mail,
    href: 'mailto:karishma.muni@gmail.com',
    label: 'Email Me',
    bg: '#d97706',
    iconColor: 'white'
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/karishma-muni-269114140/',
    label: 'LinkedIn',
    bg: '#2563eb',
    iconColor: 'white'
  },
  {
    id: 'github',
    icon: Github,
    href: 'https://github.com/kmuni08',
    label: 'GitHub',
    bg: '#6e5494',
    iconColor: '#0d1117'
  }
];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container section-fade-in">
        <h2 className="contact-title">
          Let's Connect! <span className="contact-emoji"></span>
        </h2>
        <p className="contact-subtitle">
          Software Engineer specializing in Frontend, Python, and Java. 
          Passionate about Climate Tech and Healthcare solutions.
        </p>

        <div className="contact-circle-wrapper">
          <div className="contact-center-circle">
            <div className="center-text">
              <span className="center-icon">✨</span>
              <p className="center-label">Reach<br/>Out</p>
            </div>
          </div>

          <div className="contact-icons-orbit">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`contact-icon-link ${hoveredIcon === link.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredIcon(link.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="contact-icon-circle" style={{ backgroundColor: link.bg, color: link.iconColor }}>
                    <Icon size={28} />
                  </div>
                  <span className="contact-icon-label">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Orbit Rings */}
          <div className="orbit-ring orbit-ring-1"></div>
          <div className="orbit-ring orbit-ring-2"></div>
          <div className="orbit-ring orbit-ring-3"></div>
        </div>

        <div className="contact-footer">
          <p className="footer-message">
            My Chief Dog Officer approves all connection requests 🐾
          </p>
        </div>
      </div>
    </section>
  );
};
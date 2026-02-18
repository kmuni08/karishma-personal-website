import React, { useState } from 'react';
import './VolunteerExperience.css';

export const VolunteerExperience = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const experiences = [
    {
      id: 1,
      title: "Elio",
      suit: "♠️",
      icon: "🤝",
      color: "black",
      shortDesc: "",
      fullDesc: "Elio is a product that develops a centralized place for scientists, researchers etc to share fragmented climate data. You can look into it more here: https://www.elio.earth/. I was chosen to collaborate with a small group of students to develop their User Interface with the vision they had, as well as enforcing good React development and design.",
      impact: "I contributed to their prototype which led to the CEO demonstrating this to investors and it became its own company.",
      gradient: "from-gray-800 to-gray-600"
    },
    {
      id: 2,
      title: "Climate Fresk",
      suit: "♥️",
      icon: "🌍",
      color: "red",
      shortDesc: "",
      fullDesc: "Organized sessions within the company with sequential trivia cards (cause and effect), drawing out the correlations and discussing feelings to understand importance of our environment.",
      impact: "Raised awareness to 60% of the NY office employees and came up with good suggestions on how we as a company can decrease carbon emissions.",
      gradient: "from-red-600 to-red-400"
    },
    {
      id: 4,
      title: "HOPR",
      suit: "♣️",
      icon: "🚣",
      color: "black",
      shortDesc: "Passaic River Rowing Association",
      fullDesc: "Volunteered at the PRRA (Passaic River Rowing Association) where I helped competitors get on and off the boats efficiently to decrease boat traffic on the dock and river.",
      impact: "Supported 50+ competing teams to safely start and end their race and ensuring boats aren't damaged.",
      gradient: "from-blue-700 to-blue-500"
    }
  ];

  const toggleFlip = (id: number) => {
    setFlippedCards(prev =>
      prev.includes(id)
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="volunteer-cards-section">
      <div className="volunteer-cards-container section-fade-in">
        <h2 className="volunteer-cards-title">Volunteering Experience</h2>

        <div className="cards-grid">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="card-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`playing-card ${flippedCards.includes(exp.id) ? 'flipped' : ''}`}
                onClick={() => toggleFlip(exp.id)}
              >
                <div className="card-face card-front">
                  <div className={`card-gradient bg-gradient-to-br ${exp.gradient}`}>
                    <div className="card-corner top-left">
                      <div className="corner-value">A</div>
                      <div className="corner-suit">{exp.suit}</div>
                    </div>

                    <div className="card-center">
                      <div className="card-icon">{exp.icon}</div>
                      <div className="card-suit-large">{exp.suit}</div>
                      <h3 className="card-title">{exp.title}</h3>
                      <p className="card-short-desc">{exp.shortDesc}</p>
                    </div>

                    <div className="card-corner bottom-right">
                      <div className="corner-value">A</div>
                      <div className="corner-suit">{exp.suit}</div>
                    </div>

                    <div className="card-pattern"></div>
                  </div>
                </div>

                <div className="card-face card-back">
                  <button
                    className="flip-back-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip(exp.id);
                    }}
                    aria-label="Flip card back"
                  >
                    ✕
                  </button>
                  <div
                    className="card-back-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="back-header">
                      <span className="back-icon">{exp.icon}</span>
                      <h3 className="back-title">{exp.title}</h3>
                    </div>

                    <div className="back-divider"></div>

                    <p className="back-description">{exp.fullDesc}</p>

                    <div className="back-impact">
                      <div className="impact-label">Impact</div>
                      <div className="impact-text">{exp.impact}</div>
                    </div>

                    <div className="back-suit">{exp.suit}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
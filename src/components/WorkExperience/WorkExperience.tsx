import './WorkExperience.css';

export const WorkExperience = () => {
  const experiences = [
    {
      date: "December 2021 - January 2026",
      title: "ActiveViam",
      subtitle: "Forward Deployed Engineer/Software Engineer",
      description: "I worked with clients in implementing their technical requests to satisfy their use cases. This ranged from basic UX designs to new features both on the frontend (using React.js/TypeScript) and backend (Python or Java/SpringBoot).",
      achievements: [
        "I've been one of the integral engineers rewriting the training in the UI, and both backends (Python and Java) for internal use and client development learning.",
        "I upgraded, designed and implemented the Operation Subledger application which is currently used by 2 long time clients.",
        "I worked on project support for clients utilizing the Atoti Python API and Atoti Java API including FRTB, CVARC and Market Risk Solutions in conjunction with SignOff and Limits",
        "I assisted clients with product support or 'how-tos' for their use cases",
        "I successfully delivered over 5 project implementation projects which went live in production with excellent feedback from the clients. 3 were UI projects and 2 were Java projects."
      ]
    },
    {
      date: "August 2020 - December 2021",
      title: "Tata Consultancy Services",
      subtitle: "Associate Software Engineer",
      description: "I developed Python scripts to help with automation testing.",
      achievements: [
        "Built Python scripts to ingest data quickly for subsequent processes to continue in the healthcare insurance company.",
        "Successfully completed the 3 month Initial Learning Program which helped me to learn building APIs in Java, JSP for visualizing form data, connecting to databases and running SQL queries to see data persisted."
      ]
    },
    {
      date: "July 2019 - August 2019",
      title: "Etrigue",
      subtitle: "Software Engineer Intern",
      description: "I migrated code from .NET to Java and made the SQL statements more maintainable.",
      achievements: [
        "Successfully migrated legacy .NET codebase to Java, improving long-term maintainability",
        "Refactored SQL statements for clarity and reusability across the application",
      ]
    },
  ];

  return (
    <section className="work-experience-section">
      <div className="work-experience-container">
        <h2 className="work-experience-title">Work Experience</h2>
        <p className="work-experience-subtitle">My professional journey</p>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              className="experience-item"
              key={index}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="experience-content">
                <div className="experience-marker">
                  <div className="experience-dot">
                    <span className="experience-icon">{exp.icon}</span>
                  </div>
                  {index !== experiences.length - 1 && (
                    <div className="experience-line" />
                  )}
                </div>

                <div className="experience-card">
                  <span className="experience-date">{exp.date}</span>
                  <h3 className="experience-card-title">{exp.title}</h3>
                  <h4 className="experience-card-subtitle">{exp.subtitle}</h4>
                  <p className="experience-card-description">{exp.description}</p>

                  {exp.achievements.length > 0 && (
                    <ul className="experience-achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li className="experience-achievement-item" key={i}>
                          <span className="experience-achievement-bullet" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
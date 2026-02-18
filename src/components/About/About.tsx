import kmuniImg from "../assets/about.jpg"
import Image from 'next/image';
import './About.css';

export const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container section-fade-in">
        <h2 className="about-title">
          About Karishma Muni
        </h2>
        <div className="about-grid">
          <div className="about-image-wrapper">
            <div className="about-image-inner">
              <Image 
                src={kmuniImg} 
                alt="Karishma"
                fill
                quality={90}
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
          <div className="about-content">
            <p>
              Karishma is a curious and passionate individual who loves using her <b>creativity</b> and <b>skills</b> to make <b>meaningful</b> impacts in the world. 
              She is particularly interested in <b>Frontend Development, Python, Design/Animation, Agentic AI</b> and uses the entirety of the internet to upskill in interesting parts of technology!
              She is swift with coming up with prototypes for quick feedback, as well as designing scalable systems both in the <b>frontend</b> and <b>backend</b> space.
              When she's not coding, she is either rowing, hiking (with her dog), experimenting recipes of different vegetarian foods all around the world and searching around where she can use her technical and non-technical skills for the betterment of society. 
            </p>
            <p>
              She is <b>deadline driven</b> and puts time and efforts to meet deadlines no matter what. However she also has a dog who values breaks and takes her on walk breaks to ensure she has a clear brain to tackle problems when stuck.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
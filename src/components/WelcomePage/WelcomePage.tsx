'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import dog from './dog.gif';
import exit2 from './exit2.png';
import exit3 from './exit3.png';
import { DogChat } from '../DogChat/DogChat';
import './WelcomePage.css';

export const WelcomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [dogPhase, setDogPhase] = useState<'normal' | 'belly' | 'face'>('normal');
  const images = [dog, exit2, exit3];

  useEffect(() => {
    const t1 = setTimeout(() => {
      setCurrentImage(1);
      setDogPhase('belly');
    }, 40000);
    return () => { clearTimeout(t1); };
  }, []);

  const handleDoneWithPets = () => {
    setCurrentImage(2);
    setDogPhase('face');
  };

  const isPeeking = dogPhase === 'belly' || dogPhase === 'face';

  return (
    <section id="welcome" className="welcome-section">
      <div className="welcome-content">

        {dogPhase === 'normal' && (
          <div className="dog-image-wrapper">
            <Image
              src={dog}
              alt="welcome dog"
              className="welcome-dog-gif phase-normal"
              unoptimized={true}
            />
          </div>
        )}

        {isPeeking && (
          <div className="peeking-image-wrapper">
            <Image
              src={images[currentImage]}
              alt="welcome dog"
              className={`welcome-dog-gif phase-${dogPhase}`}
              unoptimized={true}
            />
          </div>
        )}

        {dogPhase === 'belly' && (
          <div className="peeking-btn-wrapper">
            <button className="done-with-pets-btn" onClick={handleDoneWithPets}>
              Done with pets
            </button>
          </div>
        )}

        <DogChat phase={dogPhase} key={dogPhase} noTail={isPeeking} />

      </div>
    </section>
  );
};
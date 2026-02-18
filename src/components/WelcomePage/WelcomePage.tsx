'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import dog from './dog.gif';
import bellyRub from './bellyRub.png';
import sillyFace from './sillyFace.png';
import { DogChat } from '../DogChat/DogChat';
import './WelcomePage.css';

type Phase = 'normal' | 'belly' | 'face';

const imageByPhase: Record<Phase, typeof dog> = {
  normal: dog,
  belly: bellyRub,
  face: sillyFace,
};

export const WelcomePage = () => {
  const [dogPhase, setDogPhase] = useState<Phase>('normal');

  useEffect(() => {
    const t = setTimeout(() => setDogPhase('belly'), 40000);
    return () => clearTimeout(t);
  }, []);

  const isPeeking = dogPhase === 'belly' || dogPhase === 'face';

  return (
    <section id="welcome" className="welcome-section">
      <div className="welcome-content">

        {dogPhase === 'normal' && (
          <div className="dog-image-wrapper">
            <Image
              src={dog}
              alt="Welcome dog"
              className="welcome-dog-gif phase-normal"
              unoptimized
            />
          </div>
        )}

        {isPeeking && (
          <div className="peeking-image-wrapper">
            <Image
              src={imageByPhase[dogPhase]}
              alt="Welcome dog"
              className={`welcome-dog-gif phase-${dogPhase}`}
              unoptimized
            />
          </div>
        )}

        {dogPhase === 'belly' && (
          <div className="peeking-btn-wrapper">
            <button className="done-with-pets-btn" onClick={() => setDogPhase('face')}>
              Done with pets
            </button>
          </div>
        )}

        <DogChat phase={dogPhase} key={dogPhase} />

      </div>
    </section>
  );
};
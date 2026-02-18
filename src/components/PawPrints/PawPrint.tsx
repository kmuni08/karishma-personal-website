import React, { useEffect, useState, useRef } from 'react';
import './PawPrint.css';
import chloeImage from '../assets/chloe.png';
import Image from 'next/image';

export const PawPrints = ({ children }: { children: React.ReactNode }) => {
  const [pawPrints, setPawPrints] = useState<any[]>([]);
  const [currentSection, setCurrentSection] = useState('');
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  
  const pawCounterRef = useRef(0);
  const lastScrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollDelta = Math.abs(scrollPosition - lastScrollPositionRef.current);

      const sections = [
        { id: 'about', name: 'about' },
        { selector: '.work-experience-section', name: 'work' },
        { selector: '.volunteer-cards-section', name: 'volunteer' },
        { id: 'contact', name: 'contact' },
      ];
      
      let currentSectionName = '';
      sections.forEach(section => {
        const element = section.id ? document.getElementById(section.id) : document.querySelector(section.selector!);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 400 && rect.bottom >= 100) currentSectionName = section.name;
        }
      });

      setCurrentSection(currentSectionName);
      
      if (!currentSectionName) {
        setPawPrints([]);
      }
      
      if (scrollDelta > 5) setLastScrollTime(Date.now());

      if (scrollDelta > 200 && currentSectionName) {
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollPosition / (documentHeight - viewportHeight)) * 100;
        
        const newPaw = {
          id: pawCounterRef.current++,
          top: `${Math.min(scrollPercentage, 95)}%`,
          section: currentSectionName,
          rotation: Math.random() * 30 - 15 
        };

        setPawPrints(prev => [...prev, newPaw].slice(-5));
        lastScrollPositionRef.current = scrollPosition;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (Date.now() - lastScrollTime >= 1500 && currentSection) {
        setPawPrints([]);
      }
    }, 100);
    return () => clearInterval(checkInterval);
  }, [lastScrollTime, currentSection]);

  const showDog = Date.now() - lastScrollTime >= 1500 && currentSection && pawPrints.length === 0;

  return (
    <div className="paw-prints-wrapper">
      <div className="paw-prints-container">
        {pawPrints.map((paw, index) => (
          <div
            key={paw.id}
            className={`paw-print ${paw.section} visible`}
            style={{
              top: paw.top,
              animationDelay: `${index * 0.1}s`,
              '--rotation': `${paw.rotation}deg`
            } as any}
          />
        ))}
      </div>
      
      {showDog && (
        <div className="dog-image-container" style={{ position: 'fixed', left: '-300px', bottom: '80px', zIndex: 1001 }}>
          <Image src={chloeImage} alt="Chloe" className="dog-image" priority />
        </div>
      )}
      
      {children}
    </div>
  );
};
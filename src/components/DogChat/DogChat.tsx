import React, { useState, useEffect } from 'react';
import './DogChat.css';

const messagesByPhase = {
  normal: [
    "Welcome to my friend's amazing website, it's nice to see a visitor here! 🐾",
    "My friend here worked really hard on this website and I think it's pretty awesome!",
    "She ensured she used colors I can see so it's easy for me to navigate.",
    "I can show you around! Start scrolling 👇",
  ],
  belly: [
    "Please give me some belly rubs 😌",
  ],
  face: [
    "I'll let my friend know she will be hearing from you.",
    "You have a good day now!",
  ],
};

type Phase = keyof typeof messagesByPhase;

const TYPING_DURATION = 1600;
const MESSAGE_DURATION = 4000;
const SLOT = TYPING_DURATION + MESSAGE_DURATION;

const CloudBubble = ({ message, isTyping }: { message: string | null; isTyping: boolean }) => (
  <div className="dog-cloud-wrapper">
    <div className="dog-cloud-bubble">
      <div className="dog-cloud-content">
        <div className={`typing-dots ${isTyping ? 'show' : 'hide'}`}>
          <span />
          <span />
          <span />
        </div>
        <div className={`message-text ${!isTyping && message ? 'show' : 'hide'}`}>
          {message}
        </div>
      </div>
    </div>
  </div>
);

export const DogChat = ({ phase = 'normal' }: { phase?: Phase }) => {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    setShowBubble(false);
    setCurrentMessage(null);
    setIsTyping(false);

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const messages = messagesByPhase[phase];
    const initialDelay = phase === 'normal' ? 5000 : 0;

    timeouts.push(setTimeout(() => setShowBubble(true), initialDelay + 100));

    messages.forEach((msg, i) => {
      const slotStart = initialDelay + 200 + i * SLOT;
      timeouts.push(setTimeout(() => {
        setIsTyping(true);
        setCurrentMessage(null);
      }, slotStart));
      timeouts.push(setTimeout(() => {
        setIsTyping(false);
        setCurrentMessage(msg);
      }, slotStart + TYPING_DURATION));
    });

    return () => timeouts.forEach(clearTimeout);
  }, [phase]);

  if (!showBubble) return null;

  return (
    <div className="dog-chat-wrapper">
      <CloudBubble message={currentMessage} isTyping={isTyping} />
    </div>
  );
};
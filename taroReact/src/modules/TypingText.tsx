// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  handleEnd?: () => void;
}

const TypingText: React.FC<TypewriterProps> = ({ text, speed = 1, delay = 0, className = '', handleEnd }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnding = () => {
    // setDisplayedText(text);
    if( delayTimeout.current ) clearTimeout(delayTimeout.current);
    if( timeoutRef.current ) clearTimeout(timeoutRef.current);
    if( handleEnd ) handleEnd()
  }

  useEffect(() => {
    if (delay > 0) {
      delayTimeout.current = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }
    // Clean up the timeout on component unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay]);

  useEffect(() => {
    const handleClick = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      handleEnding()
    };

    window.addEventListener('click', handleClick);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [text, handleEnd]);

  const startTyping = () => {
    timeoutRef.current = setTimeout(typeCharacter, speed);
  };

  const typeCharacter = () => {
    if (indexRef.current < text.length) {
      setDisplayedText(prev => prev + text.charAt(indexRef.current));
      indexRef.current++;
      timeoutRef.current = setTimeout(typeCharacter, speed);
    } else handleEnding()
  };

  return (
    <p className={className}>
      {displayedText}
    </p>
  );
};

export default TypingText;

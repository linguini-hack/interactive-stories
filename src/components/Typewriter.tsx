import React, { useState, useEffect } from 'react';

const Typewriter = ({text, onDone}:{text:string, onDone:Function}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 20);
  
      return () => clearTimeout(timeout);
    }else{
        setTypingDone(true);
        onDone();
    }
  }, [currentIndex, text, typingDone]);

  return <span>{currentText}</span>;
};

export default Typewriter;
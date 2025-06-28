import { useState, useEffect } from 'react';

const TypewriterEffect = ({ 
  words = [],
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  cursorBlinkSpeed = 500,
  punctuation = ".",
  cursorSymbol = "|",
  colors = {
    text: "text-blue-600 dark:text-blue-400",
    punctuation: "text-blue-600 dark:text-blue-400",
    cursor: "text-blue-600 dark:text-blue-400"
  }
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (words.length === 0) return;
    
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  if (words.length === 0) {
    return <span className={className}>No words provided</span>;
  }

  return (
    <span className={className}>
      <span className={colors.text}>{currentText}</span>
      <span className={colors.punctuation}>{punctuation}</span>
      <span 
        className={`ml-1 ${colors.cursor} transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {cursorSymbol}
      </span>
    </span>
  );
};

export default TypewriterEffect;

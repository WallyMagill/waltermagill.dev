/**
 * Typewriter animation component with customizable timing and styling
 * 
 * Creates a realistic typing effect that cycles through multiple words
 * with configurable typing/deleting speeds, pause durations, and visual styling.
 * Includes a blinking cursor animation for enhanced realism.
 * 
 * Developed with assistance from AI tools for animation timing and state management.
 * This component demonstrates state management for complex animations,
 * timing control with multiple useEffect hooks, and dynamic text rendering.
 * 
 * @author Walter Magill
 */

import { useState, useEffect } from 'react';

/**
 * Default configuration for typewriter animation
 * Centralized timing values for consistent behavior
 */
const DEFAULT_CONFIG = {
  TYPING_SPEED: 100,      // ms per character when typing
  DELETING_SPEED: 50,     // ms per character when deleting
  PAUSE_DURATION: 1500,   // ms to pause after completing a word
  CURSOR_BLINK_SPEED: 500 // ms for cursor blink interval
};

/**
 * Animated typewriter effect component
 * 
 * Cycles through an array of words with realistic typing and deleting animations.
 * Features smooth character-by-character revealing, customizable timing controls,
 * and a blinking cursor that enhances the typing simulation.
 * 
 * The component manages multiple animation states:
 * - Typing: Adding characters one by one
 * - Pausing: Brief delay after completing a word
 * - Deleting: Removing characters before next word
 * - Cursor blinking: Independent animation for visual appeal
 * 
 * @param {Object} props - Component configuration
 * @param {string[]} props.words - Array of words to cycle through
 * @param {string} props.className - Additional CSS classes for styling
 * @param {number} props.typingSpeed - Milliseconds per character when typing
 * @param {number} props.deletingSpeed - Milliseconds per character when deleting
 * @param {number} props.pauseDuration - Milliseconds to pause after completing word
 * @param {number} props.cursorBlinkSpeed - Milliseconds between cursor blinks
 * @param {string} props.punctuation - Character to append after each word
 * @param {string} props.cursorSymbol - Character to use for cursor
 * @param {Object} props.colors - Color classes for different text elements
 * @returns {JSX.Element} Animated typewriter text with blinking cursor
 */
const TypewriterEffect = ({ 
  words = [],
  className = "",
  typingSpeed = DEFAULT_CONFIG.TYPING_SPEED,
  deletingSpeed = DEFAULT_CONFIG.DELETING_SPEED,
  pauseDuration = DEFAULT_CONFIG.PAUSE_DURATION,
  cursorBlinkSpeed = DEFAULT_CONFIG.CURSOR_BLINK_SPEED,
  punctuation = ".",
  cursorSymbol = "|",
  colors = {
    text: "text-blue-600 dark:text-blue-400",
    punctuation: "text-blue-600 dark:text-blue-400",
    cursor: "text-blue-600 dark:text-blue-400"
  }
}) => {
  // Animation state management
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  /**
   * Main typewriter animation logic
   * Handles character-by-character typing and deleting with proper timing
   */
  useEffect(() => {
    // Early return if no words provided
    if (words.length === 0) return;
    
    const currentWord = words[currentWordIndex];
    
    const animationTimeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase: add characters progressively
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Word complete - pause before starting deletion
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting phase: remove characters progressively
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Deletion complete - move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    // Cleanup timeout on unmount or dependency change
    return () => clearTimeout(animationTimeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  /**
   * Independent cursor blinking animation
   * Runs on separate timing from main typewriter effect for realistic behavior
   */
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  // Handle edge case of empty words array
  if (words.length === 0) {
    return (
      <span className={className} role="status" aria-live="polite">
        <span className="text-red-500">No words provided for typewriter effect</span>
      </span>
    );
  }

  return (
    <span className={className} role="status" aria-live="polite">
      {/* Main typed text */}
      <span className={colors.text} aria-label={`Currently typing: ${currentText}`}>
        {currentText}
      </span>
      
      {/* Punctuation mark */}
      <span className={colors.punctuation} aria-hidden="true">
        {punctuation}
      </span>
      
      {/* Animated cursor with smooth opacity transition */}
      <span 
        className={`ml-1 ${colors.cursor} transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {cursorSymbol}
      </span>
    </span>
  );
};

export default TypewriterEffect;

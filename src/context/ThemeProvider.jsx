/**
 * Theme provider component with system preference detection
 * 
 * Manages global dark/light theme state with intelligent initialization,
 * persistent storage, and seamless system preference integration.
 * Demonstrates advanced React patterns including localStorage integration
 * and CSS class manipulation for modern web applications.
 * 
 * Features automatic OS-level dark mode detection, cross-session persistence,
 * and dynamic CSS class management for optimal user experience.
 * 
 * @author Walter Magill
 */

import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  // Lazy initialization with system preference detection and localStorage fallback
  // This pattern prevents hydration mismatches in SSR environments
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved
      ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect hook for DOM manipulation and localStorage synchronization
  // Manages global CSS classes and persistent storage for theme preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Theme toggle function with immediate state update
  // Provides controlled interface for theme switching from any component
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Main layout component providing site-wide structure and navigation
 * 
 * Implements a responsive header with smooth scroll navigation, theme toggling,
 * and mobile-friendly menu. The header uses a backdrop blur effect that appears
 * on scroll for improved readability while maintaining visual appeal.
 * 
 * @author Walter Magill
 */

import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun, Menu, X, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

/**
 * Navigation items configuration for consistent routing
 * Centralized to make navigation updates easier
 */
const NAVIGATION_ITEMS = [
  { name: 'Home', sectionId: 'hero' },
  { name: 'About', sectionId: 'about' },
  { name: 'Projects', sectionId: 'projects' },
  { name: 'Experience', sectionId: 'experience' },
  { name: 'Contact', sectionId: 'contact' },
];

/**
 * Main layout wrapper component with header, main content, and footer
 * 
 * Features:
 * - Responsive navigation with mobile menu
 * - Smooth scroll behavior with programmatic section navigation
 * - Dynamic header background that appears on scroll
 * - Theme toggle with system preference support
 * - Professional footer with location info
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 * @returns {JSX.Element} Complete layout structure
 */
const Layout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeout = useRef(null);

  /**
   * Handles smooth scrolling to page sections
   * Includes mobile menu cleanup and scroll state management
   * 
   * @param {string} sectionId - The target section's DOM id
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);

    // Temporarily hide nav background during scroll for visual consistency
    setIsScrolled(false);
    
    // Clear any existing timeout to prevent conflicts
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Re-enable scroll detection after smooth scroll completes
    scrollTimeout.current = setTimeout(() => {
      setIsScrolled(window.scrollY > 16);
    }, 600);
  };

  /**
   * Set up scroll listener for dynamic header styling
   * Uses 16px threshold to avoid flickering on small movements
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up timeout on unmount
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Fixed Header with Dynamic Background */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="relative flex items-center justify-between h-16 px-4 sm:px-8">
          
          {/* Site Branding */}
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              style={{ letterSpacing: '-0.01em' }}
              aria-label="Return to top of page"
            >
              Walter Magill
            </button>
          </div>

          {/* Desktop Navigation - Only visible when scrolled */}
          <nav
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-8 px-6 py-2 transition-all duration-300 ${
              isScrolled
                ? 'opacity-100 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700'
                : 'opacity-0 pointer-events-none bg-transparent'
            }`}
            style={{ zIndex: 10 }}
            aria-label="Main navigation"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Controls */}
          <div className="flex items-center flex-1 justify-end gap-2 min-w-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-colors transition-all"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} mobile menu`}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <nav className="py-4 space-y-2 flex flex-col items-center" role="navigation">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="block w-full text-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-full"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-16" role="main">
        {children}
      </main>

      {/* Site Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400">
            
            {/* Copyright Notice */}
            <div className="text-center sm:text-left">
              <p>&copy; {new Date().getFullYear()} Walter Magill. All rights reserved.</p>
            </div>
            
            {/* Location Information */}
            <div className="flex items-center gap-2 text-center sm:text-right">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Stowe, Vermont</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

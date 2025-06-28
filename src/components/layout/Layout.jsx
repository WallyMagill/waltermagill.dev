import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Layout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeout = useRef(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
    // Hide nav background as if at top, then allow scroll to re-enable it
    setIsScrolled(false);
    // Optionally, clear any previous timeout
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    // After a short delay, re-enable scroll detection (in case user scrolls again)
    scrollTimeout.current = setTimeout(() => {
      setIsScrolled(window.scrollY > 16);
    }, 600); // 600ms matches smooth scroll duration
  };

  const navigationItems = [
    { name: 'Home', sectionId: 'hero' },
    { name: 'About', sectionId: 'about' },
    { name: 'Projects', sectionId: 'projects' },
    { name: 'Experience', sectionId: 'experience' },
    { name: 'Contact', sectionId: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Only show nav background if scrolled more than 16px
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="relative flex items-center justify-between h-16 px-4 sm:px-8">
          {/* Left: Site Name */}
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              style={{ letterSpacing: '-0.01em' }}
            >
              Walter Magill
            </button>
          </div>

          {/* Center: Nav Links */}
          <nav
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-8 px-6 py-2 transition-all duration-300 transition-opacity ${
              isScrolled
                ? 'opacity-100 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700'
                : 'opacity-0 pointer-events-none bg-transparent'
            }`}
            style={{ zIndex: 10 }}
          >
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right: Theme Toggle & Mobile Menu */}
          <div className="flex items-center flex-1 justify-end gap-2 min-w-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-colors transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <nav className="py-4 space-y-2 flex flex-col items-center">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="block w-full text-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-full"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      {/* Main content */}
      <main className="flex-1 pt-16">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Walter Magill. All rights reserved.</p>
            <p className="text-sm mt-2">
              Interactive particles background inspired by modern web design techniques.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

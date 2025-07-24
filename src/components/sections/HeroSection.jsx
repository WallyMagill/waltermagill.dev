/**
 * Hero section component for portfolio landing page
 * 
 * Creates an engaging full-screen introduction featuring animated text,
 * interactive particle background, and clear call-to-action elements.
 * Combines multiple custom components to create a cohesive first impression
 * that showcases both technical skills and professional presentation.
 * 
 * The layout uses CSS Grid for responsive design and Framer Motion
 * for coordinated entrance animations with staggered timing.
 * 
 * @author Walter Magill
 */

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { SITE_CONFIG, TYPEWRITER_WORDS } from '../../utils/constants';
import ParticlesBackground from '../effects/ParticlesBackground';
import TypewriterEffect from '../effects/TypewriterEffect';

/**
 * Main hero section component for portfolio homepage
 * 
 * Features:
 * - Full viewport height layout with centered content
 * - Interactive particle background system
 * - Animated typewriter effect showcasing roles/skills
 * - Responsive grid layout (single column on mobile, two columns on desktop)
 * - Social media links with hover animations
 * - Call-to-action buttons with smooth scroll navigation
 * - Animated scroll indicator for user guidance
 * 
 * The component uses progressive enhancement with graceful animation
 * fallbacks and maintains accessibility through proper ARIA labels.
 * 
 * @returns {JSX.Element} Complete hero section with animations and interactions
 */
const HeroSection = () => {
  /**
   * Handles smooth scrolling to specific page sections
   * Uses native scrollIntoView API for consistent cross-browser behavior
   * 
   * @param {string} sectionId - Target section's DOM ID attribute
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Navigation target "${sectionId}" not found`);
      return;
    }
    
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' // Align to top of viewport
    });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Welcome and introduction"
    >
      {/* Background Particle Animation */}
      <ParticlesBackground />
      
      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Primary Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Main Heading with Gradient Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Hi, I'm{' '}
              <span className="gradient-text">
                {SITE_CONFIG.name}
              </span>
            </motion.h1>
            
            {/* Professional Summary */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Recent graduate with a Bachelor's of Arts in Computer Science, modified with Economics from Dartmouth College.
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              {/* Primary CTA - View Work */}
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                aria-label="Navigate to projects section"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </button>
              
              {/* Secondary CTA - Contact */}
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                aria-label="Navigate to contact section"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Social Media Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-6"
              role="list"
              aria-label="Social media profiles"
            >
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transform hover:scale-110"
                aria-label="View GitHub profile (opens in new tab)"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transform hover:scale-110"
                aria-label="View LinkedIn profile (opens in new tab)"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transform hover:scale-110"
                aria-label="Send email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Terminal-Style Typewriter Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
              {/* Terminal Window Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full" aria-hidden="true"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">terminal</span>
              </div>
              
              {/* Terminal Content with Typewriter Effect */}
              <div className="font-mono text-lg">
                <span className="text-gray-600 dark:text-gray-300">I am </span>
                <TypewriterEffect 
                  words={TYPEWRITER_WORDS}
                  className="font-semibold"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator - Updated to point to tech-stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollToSection('tech-stack')}
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Scroll to tech stack section"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;

/**
 * Site configuration and global constants
 * 
 * Centralized configuration management for portfolio website settings,
 * navigation structure, and content constants. Provides single source
 * of truth for site-wide information across deployment environments.
 * 
 * Features personal contact information, social media links, navigation
 * structure, and typewriter animation content configuration.
 * 
 * @author Walter Magill
 */

/**
 * Core site configuration containing personal and professional information
 * Used across multiple components for consistent branding and contact details
 * 
 * @constant {Object} SITE_CONFIG
 * @property {string} name - Full professional name for branding
 * @property {string} title - Professional title/role for SEO and metadata  
 * @property {string} description - Brief professional summary for SEO
 * @property {string} url - Primary domain URL for canonical links
 * @property {string} email - Professional contact email (publicly visible)
 * @property {string} github - GitHub profile URL for portfolio links
 * @property {string} linkedin - LinkedIn profile URL for professional networking
 */
export const SITE_CONFIG = {
  name: 'Walter Magill',
  title: 'Full-Stack Developer',
  description: 'Recent graduate with a Bachelor\'s of Arts in Computer Science, modified with Economics from Dartmouth College.',
  url: 'https://waltermagill.dev',
  email: 'walter.g.magill@gmail.com',
  github: 'https://github.com/WallyMagill',
  linkedin: 'https://www.linkedin.com/in/walter-magill-40023a249/',
};

/**
 * Navigation structure configuration for consistent site navigation
 * Updated to reflect the new section order with About moved before Contact
 * 
 * @constant {Array} NAVIGATION
 * @property {string} name - Display name for navigation item
 * @property {string} href - Section ID for smooth scroll navigation
 * 
 * New Section Order:
 * 1. Home (Hero)
 * 2. Tech Stack
 * 3. Projects
 * 4. Experience  
 * 5. Community
 * 6. About (moved to second-to-last position)
 * 7. Contact
 */
export const NAVIGATION = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Community', href: '#community' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

/**
 * Typewriter animation content for hero section engagement
 * Defines rotating words that appear in the terminal-style animation
 * 
 * @constant {Array<string>} TYPEWRITER_WORDS
 * 
 * Content Strategy:
 * - Mix of professional roles and personal qualities
 * - Emphasizes both technical skills and character traits  
 * - Ordered to start with learning mindset and end with professional titles
 * - Includes athletic background to show well-rounded character
 * 
 * Maintenance Notes:
 * - Update periodically to keep content fresh and relevant
 * - Consider A/B testing different word combinations
 * - Ensure words align with current career goals and positioning
 */
export const TYPEWRITER_WORDS = [
  'a Learner',
  'a Coder', 
  'an Athlete',
  'a Problem Solver',
  'a Creator',
  'an Innovator',
  'a Developer',
  'an Analyst'
];

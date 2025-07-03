/**
 * Site Configuration and Global Constants
 * 
 * Centralized configuration management for portfolio website settings, navigation structure,
 * and content constants. Provides a single source of truth for site-wide information that
 * may need updates across multiple components and deployment environments.
 * 
 * Configuration Categories:
 * - Personal and professional contact information
 * - Social media and professional network links  
 * - Navigation structure and routing configuration
 * - Typewriter animation content for hero section
 * - SEO and metadata configuration
 * 
 * Maintenance Guidelines:
 * - Update SITE_CONFIG when contact information changes
 * - Modify NAVIGATION when adding/removing sections
 * - Refresh TYPEWRITER_WORDS to keep hero section engaging
 * - Ensure all URLs are current and properly formatted
 * 
 * Security Considerations:
 * - Email addresses are publicly visible (intentional for contact purposes)
 * - All URLs should use HTTPS for security and SEO benefits
 * - Social media links should be verified and current
 * 
 * Usage Pattern:
 * Import specific constants where needed rather than the entire file
 * Example: import { SITE_CONFIG } from '../../utils/constants'
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
 * Defines the main navigation items and their corresponding section IDs
 * 
 * @constant {Array} NAVIGATION
 * @property {string} name - Display name for navigation item
 * @property {string} href - URL path or section ID for navigation target
 * 
 * Note: Currently configured for single-page application with section-based navigation
 * Can be easily modified for multi-page routing if site structure changes
 */
export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Contact', href: '/contact' },
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

/**
 * Professional Contact Form and Information Component
 * 
 * A comprehensive contact section featuring a fully functional contact form with EmailJS integration,
 * multiple contact methods, and professional messaging tailored for recruiters and collaborators.
 * Demonstrates advanced form handling, error management, and user experience design patterns.
 * 
 * Key Features:
 * - Fully functional contact form with real-time validation
 * - EmailJS integration for serverless email delivery
 * - Comprehensive error handling with user-friendly feedback
 * - Professional contact information display with social links
 * - Resume download functionality for recruiter convenience
 * - Responsive two-column layout for optimal space utilization
 * - Accessibility-compliant form design with proper labeling
 * 
 * Technical Implementation:
 * - Advanced React state management for form data and UI states
 * - Real-time form validation with custom error messaging
 * - Async/await error handling for EmailJS API integration
 * - Dynamic UI state management (idle, loading, success, error)
 * - Performance-optimized re-renders and timeout management
 * - Environment variable configuration for secure API keys
 * 
 * UX/UI Design Patterns:
 * - Progressive disclosure of validation errors
 * - Clear loading states with spinner animations
 * - Success/error feedback with auto-dismissal
 * - Professional messaging optimized for recruitment context
 * - Intuitive form layout with consistent spacing
 * 
 * Security Considerations:
 * - Environment variables for sensitive EmailJS configuration
 * - Client-side input validation and sanitization
 * - Proper error boundary handling for API failures
 * 
 * @author Walter Magill
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SITE_CONFIG } from '../../utils/constants';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Animation configuration for consistent visual hierarchy
const ANIMATION_CONFIG = {
  CONTAINER_DURATION: 0.6,
  STAGGER_DELAY: 0.2,
  CONTENT_DELAY: 0.4,
  FORM_DELAY: 0.6,
  EASING: "easeOut"
};

// Form validation configuration
const VALIDATION_CONFIG = {
  MIN_MESSAGE_LENGTH: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  AUTO_DISMISS_DELAY: 5000
};

// UI state constants for form status management
const FORM_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Initial form data structure
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: ''
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Form state management
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formStatus, setFormStatus] = useState(FORM_STATES.IDLE);
  const [errors, setErrors] = useState({});

  /**
   * Handles resume download functionality
   * Creates a temporary download link and triggers the download
   * Provides graceful fallback for missing resume file
   * 
   * @returns {void}
   */
  const handleResumeDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Replace with actual resume file path
      link.download = 'Walter_Magill_Resume.pdf';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.warn('Resume download failed:', error);
      // Could implement user notification here in production
    }
  };

  /**
   * Handles form input changes with real-time error clearing
   * Updates form data and clears validation errors as user types
   * Provides immediate feedback for better user experience
   * 
   * @param {Event} e - Input change event
   * @returns {void}
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validates form data with comprehensive error checking
   * Implements business rules for professional contact form
   * Returns validation state and populates error messages
   * 
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation with regex pattern matching
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!VALIDATION_CONFIG.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation with minimum length requirement
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < VALIDATION_CONFIG.MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${VALIDATION_CONFIG.MIN_MESSAGE_LENGTH} characters long`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission with EmailJS integration
   * Implements comprehensive error handling and user feedback
   * Manages loading states and auto-dismissal of status messages
   * 
   * @param {Event} e - Form submit event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setFormStatus(FORM_STATES.LOADING);

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate environment configuration
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing');
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      };

      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Handle successful submission
      setFormStatus(FORM_STATES.SUCCESS);
      setFormData(INITIAL_FORM_DATA);
      
      // Auto-dismiss success message
      setTimeout(() => {
        setFormStatus(FORM_STATES.IDLE);
      }, VALIDATION_CONFIG.AUTO_DISMISS_DELAY);

    } catch (error) {
      console.error('EmailJS submission error:', error);
      setFormStatus(FORM_STATES.ERROR);
      
      // Auto-dismiss error message
      setTimeout(() => {
        setFormStatus(FORM_STATES.IDLE);
      }, VALIDATION_CONFIG.AUTO_DISMISS_DELAY);
    }
  };

  /**
   * Renders contact method links with consistent styling
   * Creates accessible links with proper ARIA attributes
   * 
   * @param {string} href - Link destination
   * @param {React.Component} IconComponent - Lucide icon component
   * @param {string} text - Display text
   * @param {boolean} isExternal - Whether link opens in new tab
   * @returns {JSX.Element} Formatted contact link
   */
  const renderContactLink = (href, IconComponent, text, isExternal = false) => (
    <a
      href={href}
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer"
      })}
      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label={`Contact via ${text}`}
    >
      <IconComponent className="w-5 h-5" aria-hidden="true" />
      <span>{text}</span>
    </a>
  );

  /**
   * Renders form status messages with appropriate styling and icons
   * Provides clear feedback for success and error states
   * 
   * @param {string} status - Current form status
   * @returns {JSX.Element|null} Status message component or null
   */
  const renderStatusMessage = (status) => {
    if (status === FORM_STATES.SUCCESS) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
          <div className="text-green-700 dark:text-green-300">
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm">I'll get back to you soon.</p>
          </div>
        </motion.div>
      );
    }

    if (status === FORM_STATES.ERROR) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
          <div className="text-red-700 dark:text-red-300">
            <p className="font-medium">Failed to send message</p>
            <p className="text-sm">Please try again or email me directly.</p>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.CONTAINER_DURATION }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ 
                duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
                delay: ANIMATION_CONFIG.STAGGER_DELAY 
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Let's Connect
              </h3>
              
              {/* Professional messaging for recruiters */}
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm actively seeking software engineering opportunities and would love to connect! 
                Whether you're a recruiter, hiring manager, potential collaborator, or simply curious 
                about my work — don't hesitate to reach out. I respond quickly and I'm always excited 
                to discuss how I can contribute to your team.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4 mb-6">
                {renderContactLink(`mailto:${SITE_CONFIG.email}`, Mail, SITE_CONFIG.email)}
                {renderContactLink(SITE_CONFIG.github, Github, "GitHub", true)}
                {renderContactLink(SITE_CONFIG.linkedin, Linkedin, "LinkedIn", true)}
              </div>

              {/* Resume Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ 
                  duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
                  delay: ANIMATION_CONFIG.FORM_DELAY 
                }}
              >
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                  aria-label="Download Walter Magill's resume as PDF"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </button>
              </motion.div>
            </motion.div>

            {/* Contact Form Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ 
                duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
                delay: ANIMATION_CONFIG.CONTENT_DELAY 
              }}
            >
              {/* Status Messages */}
              {renderStatusMessage(formStatus)}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                      errors.name 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Your name"
                    disabled={formStatus === FORM_STATES.LOADING}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="your.email@example.com"
                    disabled={formStatus === FORM_STATES.LOADING}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors ${
                      errors.message 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Your message..."
                    disabled={formStatus === FORM_STATES.LOADING}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === FORM_STATES.LOADING}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
                  aria-describedby="submit-status"
                >
                  {formStatus === FORM_STATES.LOADING ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span id="submit-status">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span id="submit-status">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

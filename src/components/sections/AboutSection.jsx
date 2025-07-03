/**
 * About section component showcasing personal background and professional story
 * 
 * Presents a comprehensive introduction including professional headshot,
 * structured content sections, and resume download functionality.
 * Uses intersection observer for scroll-triggered animations and implements
 * graceful image loading with fallback handling.
 * 
 * The component demonstrates responsive layout design, content organization,
 * and professional presentation of personal narrative for portfolio purposes.
 * 
 * @author Walter Magill
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download } from 'lucide-react';
import { ABOUT_ME } from '../../utils/aboutData';

// Import professional headshot - using 4x5 aspect ratio for professional look
import headshotImage from '../../assets/headshot-4x5.jpg';
// Alternative: import headshotImage from '../../assets/images/headshot-1x1.jpg';

/**
 * About section component with animated content reveal
 * 
 * Features:
 * - Responsive header layout with professional photo
 * - Structured content sections from centralized data
 * - Scroll-triggered animations with staggered timing
 * - Professional headshot with fallback handling
 * - Resume download functionality
 * - Accessible semantic structure
 * 
 * The layout adapts from single column on mobile to side-by-side
 * presentation on larger screens, maintaining visual hierarchy
 * and readability across all viewport sizes.
 * 
 * @returns {JSX.Element} Complete about section with animations
 */
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" // Trigger animation 100px before element enters viewport
  });

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
      link.href = '/Walter_Magill_Resume.pdf';
      link.download = 'Walter_Magill_Resume.pdf';
      link.style.display = 'none'; // Hide link element
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Resume download failed:', error);
      // Fallback: open in new tab if download fails
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <section 
      id="about" 
      className="section-padding bg-gray-50 dark:bg-gray-800"
      aria-label="About Walter Magill"
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section - Title and Professional Photo */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-8">
            
            {/* Left Side - Section Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {ABOUT_ME.title}
              </h2>
              {/* Decorative accent line */}
              <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </motion.div>

            {/* Right Side - Professional Headshot */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <motion.img
                  src={headshotImage}
                  alt="Walter Magill - Professional headshot of a software developer and recent Dartmouth graduate"
                  className="w-40 h-50 md:w-48 md:h-60 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  onError={(e) => {
                    // Graceful fallback if image fails to load
                    console.warn('Professional headshot failed to load');
                    e.target.style.display = 'none';
                    const fallbackElement = e.target.nextSibling;
                    if (fallbackElement) {
                      fallbackElement.style.display = 'flex';
                    }
                  }}
                />
                
                {/* Fallback placeholder for image load failures */}
                <div className="hidden items-center justify-center w-40 h-50 md:w-48 md:h-60 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl">
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    <div className="text-3xl mb-2" aria-hidden="true">👤</div>
                    <div className="font-medium text-sm">Walter Magill</div>
                    <div className="text-xs opacity-75">Professional Photo</div>
                  </div>
                </div>

                {/* Subtle animated background accent */}
                <motion.div 
                  className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>

          {/* Content Sections - Dynamic rendering from data */}
          <div className="space-y-12">
            {Object.entries(ABOUT_ME.sections).map(([sectionKey, section], index) => (
              <motion.article
                key={sectionKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                className="space-y-4"
              >
                <h3 
                  className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white"
                  id={`about-${sectionKey}`}
                >
                  {section.heading}
                </h3>
                
                {/* Content paragraphs with proper semantic structure */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  aria-labelledby={`about-${sectionKey}`}
                >
                  {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
                    <p 
                      key={paragraphIndex} 
                      className="text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Resume Download Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 text-center"
          >
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Download Walter Magill's resume as PDF"
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

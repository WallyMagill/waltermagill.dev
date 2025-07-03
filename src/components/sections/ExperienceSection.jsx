/**
 * Professional Experience Timeline Component
 * 
 * A responsive section component that presents work history through an elegant card-based layout.
 * Features chronological sorting, technology badges, and progressive disclosure of experience details.
 * Demonstrates data-driven rendering patterns and professional content presentation for recruiter review.
 * 
 * Key Features:
 * - Chronological experience ordering (newest first)
 * - Responsive card layout with consistent spacing
 * - Technology stack visualization with branded badges
 * - Progressive disclosure with hover effects and micro-interactions
 * - Professional metadata display (company, location, duration)
 * - Accessibility-compliant semantic structure
 * 
 * Technical Implementation:
 * - Dynamic data sorting and rendering from centralized data source
 * - Framer Motion integration for staggered entrance animations
 * - Responsive grid system using Tailwind CSS utilities
 * - Icon-based information architecture for visual hierarchy
 * - Performance-optimized re-rendering with proper key management
 * 
 * Design Patterns:
 * - Separation of data and presentation logic
 * - Consistent visual theming across experience entries
 * - Professional typography and spacing system
 * - Mobile-first responsive design approach
 * 
 * @author Walter Magill
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { experienceData } from '../../utils/experienceData';

// Animation configuration for consistent timing and visual hierarchy
const ANIMATION_CONFIG = {
  CONTAINER_DURATION: 0.6,
  ITEM_STAGGER_DELAY: 0.1,
  CTA_DELAY_BASE: 0.2,
  EASING: "easeOut"
};

// Visual styling configuration for consistent theming
const CARD_STYLES = {
  BASE: "bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300",
  METADATA: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm",
  TECH_BADGE: "px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /**
   * Sorts experience data by ID in descending order to show most recent first
   * This ordering is crucial for recruiter review and career progression demonstration
   * 
   * @returns {Array} Sorted array of experience objects
   */
  const sortedExperiences = [...experienceData].sort((a, b) => b.id - a.id);

  /**
   * Calculates staggered animation delay for visual hierarchy
   * Creates a cascading entrance effect that draws attention to recent experience first
   * 
   * @param {number} index - Position in the sorted experience array
   * @returns {number} Animation delay in seconds
   */
  const calculateItemDelay = (index) => {
    return index * ANIMATION_CONFIG.ITEM_STAGGER_DELAY;
  };

  /**
   * Calculates final call-to-action animation delay
   * Ensures CTA appears after all experience items have animated in
   * 
   * @param {number} experienceCount - Total number of experience items
   * @returns {number} Animation delay for CTA element
   */
  const calculateCTADelay = (experienceCount) => {
    return (experienceCount * ANIMATION_CONFIG.ITEM_STAGGER_DELAY) + ANIMATION_CONFIG.CTA_DELAY_BASE;
  };

  /**
   * Renders individual metadata item with icon and text
   * Provides consistent visual structure for company, location, and duration information
   * 
   * @param {React.Component} IconComponent - Lucide icon component to display
   * @param {string} text - Text content to display
   * @param {boolean} isBold - Whether to apply font-medium styling
   * @returns {JSX.Element} Formatted metadata item
   */
  const renderMetadataItem = (IconComponent, text, isBold = false) => (
    <div className="flex items-center gap-1">
      <IconComponent className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span className={isBold ? "font-medium" : ""}>{text}</span>
    </div>
  );

  /**
   * Renders technology badges with consistent styling
   * Creates visual technology stack representation for each experience
   * 
   * @param {Array} technologies - Array of technology strings
   * @returns {JSX.Element} Collection of styled technology badges
   */
  const renderTechnologyBadges = (technologies) => (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className={CARD_STYLES.TECH_BADGE}
        >
          {tech}
        </span>
      ))}
    </div>
  );

  // Error handling for missing experience data
  if (!experienceData || experienceData.length === 0) {
    return (
      <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Experience information is currently being updated. Please check back soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: ANIMATION_CONFIG.CONTAINER_DURATION,
            ease: ANIMATION_CONFIG.EASING 
          }}
        >
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Experience
          </h2>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sortedExperiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
                  delay: calculateItemDelay(index),
                  ease: ANIMATION_CONFIG.EASING
                }}
                className={CARD_STYLES.BASE}
                role="article"
                aria-labelledby={`experience-title-${experience.id}`}
              >
                {/* Experience Header */}
                <header className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 
                      id={`experience-title-${experience.id}`}
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      {experience.title}
                    </h3>
                    
                    {/* Professional Metadata */}
                    <div className={CARD_STYLES.METADATA}>
                      {renderMetadataItem(Building, experience.company, true)}
                      {renderMetadataItem(MapPin, experience.location)}
                      {renderMetadataItem(Calendar, experience.period)}
                    </div>
                  </div>
                </header>

                {/* Experience Description */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                {/* Technologies Section */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technologies & Tools:
                    </h4>
                    {renderTechnologyBadges(experience.technologies)}
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          {/* Call-to-Action Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
              delay: calculateCTADelay(sortedExperiences.length),
              ease: ANIMATION_CONFIG.EASING
            }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ready to bring my experience to your team. Let's build something great together.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

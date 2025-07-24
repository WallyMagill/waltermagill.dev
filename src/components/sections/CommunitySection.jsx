/**
 * Community involvement and leadership showcase component
 * 
 * Displays leadership experience, volunteer work, and community engagement
 * through a responsive card layout with thematic categorization.
 * Demonstrates character, values, and collaborative abilities that complement
 * technical skills for professional evaluation.
 * 
 * Features chronological organization, visual category indicators, and
 * progressive disclosure with staggered entrance animations.
 * 
 * @author Walter Magill
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Building, Heart } from 'lucide-react';
import { communityData } from '../../utils/communityData';

// Animation configuration for consistent visual hierarchy
const ANIMATION_CONFIG = {
  CONTAINER_DURATION: 0.6,
  ITEM_STAGGER_DELAY: 0.1,
  CTA_DELAY_BASE: 0.2,
  EASING: "easeOut"
};

// Theme color mapping for visual categorization of community involvement
const THEME_COLORS = {
  'Environment': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  'Education': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  'Economic Empowerment': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  'Children': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200'
};

// Visual styling configuration for consistent theming
const CARD_STYLES = {
  BASE: "bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300",
  METADATA: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm",
  THEME_TAG: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
};

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /**
   * Sorts community data by ID in descending order to prioritize recent involvement
   * Recent leadership roles and community engagement show current commitment levels
   * 
   * @returns {Array} Sorted array of community involvement objects
   */
  const sortedCommunityData = [...communityData].sort((a, b) => b.id - a.id);

  /**
   * Calculates staggered animation delay for visual hierarchy
   * Creates engaging entrance effects that highlight leadership progression
   * 
   * @param {number} index - Position in the sorted community data array
   * @returns {number} Animation delay in seconds
   */
  const calculateItemDelay = (index) => {
    return index * ANIMATION_CONFIG.ITEM_STAGGER_DELAY;
  };

  /**
   * Calculates final call-to-action animation delay
   * Ensures CTA appears after all community items have animated in
   * 
   * @param {number} itemCount - Total number of community involvement items
   * @returns {number} Animation delay for CTA element
   */
  const calculateCTADelay = (itemCount) => {
    return (itemCount * ANIMATION_CONFIG.ITEM_STAGGER_DELAY) + ANIMATION_CONFIG.CTA_DELAY_BASE;
  };

  /**
   * Renders individual metadata item with icon and text
   * Provides consistent visual structure for organization, location, and duration
   * 
   * @param {React.Component} IconComponent - Lucide icon component to display
   * @param {string} text - Text content to display
   * @param {boolean} isBold - Whether to apply font-medium styling for emphasis
   * @returns {JSX.Element} Formatted metadata item
   */
  const renderMetadataItem = (IconComponent, text, isBold = false) => (
    <div className="flex items-center gap-1">
      <IconComponent className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span className={isBold ? "font-medium" : ""}>{text}</span>
    </div>
  );

  /**
   * Renders theme tag with appropriate color coding
   * Provides visual categorization for different types of community involvement
   * 
   * @param {string} theme - Theme category (Environment, Education, etc.)
   * @returns {JSX.Element} Styled theme indicator
   */
  const renderThemeTag = (theme) => {
    const colorClass = THEME_COLORS[theme] || THEME_COLORS['Education']; // Fallback to Education theme
    
    return (
      <span className={`${CARD_STYLES.THEME_TAG} ${colorClass}`}>
        <Heart className="w-3 h-3" aria-hidden="true" />
        {theme}
      </span>
    );
  };

  // Error handling for missing community data
  if (!communityData || communityData.length === 0) {
    return (
      <section id="community" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Leadership & Community Involvement
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Community involvement information is currently being updated. Please check back soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="community" className="section-padding">
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
          {/* Section Header with Professional Messaging */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Leadership & Community Involvement
          </h2>

          {/* Community Involvement Timeline */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sortedCommunityData.map((involvement, index) => (
              <motion.article
                key={involvement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
                  delay: calculateItemDelay(index),
                  ease: ANIMATION_CONFIG.EASING
                }}
                className={CARD_STYLES.BASE}
                role="article"
                aria-labelledby={`involvement-title-${involvement.id}`}
              >
                {/* Involvement Header */}
                <header className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 
                      id={`involvement-title-${involvement.id}`}
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      {involvement.title}
                    </h3>
                    
                    {/* Professional Metadata */}
                    <div className={CARD_STYLES.METADATA}>
                      {renderMetadataItem(Building, involvement.organization, true)}
                      {renderMetadataItem(MapPin, involvement.location)}
                      {renderMetadataItem(Calendar, involvement.period)}
                    </div>
                  </div>

                  {/* Theme Categorization Tag */}
                  <div className="mt-2 md:mt-0 md:ml-4">
                    {renderThemeTag(involvement.theme)}
                  </div>
                </header>

                {/* Impact Description */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {involvement.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Professional Call-to-Action Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
              delay: calculateCTADelay(sortedCommunityData.length),
              ease: ANIMATION_CONFIG.EASING
            }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Committed to making a positive impact through leadership, mentorship, and community engagement.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;

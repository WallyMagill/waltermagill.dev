/**
 * Interactive technology stack showcase component
 * 
 * Displays technical skills through expandable cards in a responsive grid layout.
 * Features hover animations, smooth transitions, and detailed technology descriptions
 * with usage examples for comprehensive skill demonstration.
 * 
 * Demonstrates advanced React patterns including dynamic state management,
 * conditional rendering, and accessibility-compliant keyboard navigation.
 * 
 * @author Walter Magill
 */

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Code2, 
  Monitor, 
  Server, 
  Cloud, 
  Wrench, 
  BookOpen,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { TECH_STACK } from '../../utils/techStackData';

// Animation configuration constants for consistent timing
const ANIMATION_CONFIG = {
  CONTAINER_DURATION: 0.6,
  ITEM_DELAY_BASE: 0.1,
  TECH_DELAY_MULTIPLIER: 0.05,
  DROPDOWN_DURATION: 0.3,
  HOVER_TRANSITION: 0.3,
  FINAL_CTA_DELAY: 0.8
};

// Layout configuration for responsive grid
const GRID_CONFIG = {
  CLASSES: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-8 max-w-6xl mx-auto',
  MIN_HEIGHT: 'min-h-[400px]'
};

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // State management for expandable technology cards
  // Format: "categoryKey-techName" for unique identification across categories
  const [expandedTech, setExpandedTech] = useState(null);

  /**
   * Configuration object for category-specific styling and icons
   * Provides consistent theming across different technology categories
   * Each category has its own color scheme and associated Lucide icon
   */
  const categoryConfig = {
    languages: {
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    frontend: {
      icon: Monitor,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    backend: {
      icon: Server,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    cloud: {
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    tools: {
      icon: Wrench,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800"
    },
    practices: {
      icon: BookOpen,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      borderColor: "border-teal-200 dark:border-teal-800"
    }
  };

  /**
   * Combines technology data from constants with styling configuration
   * Creates enriched category objects for rendering
   * 
   * @returns {Array} Array of category objects with merged data and styling
   */
  const techCategories = Object.entries(TECH_STACK).map(([key, data]) => ({
    key,
    title: data.title,
    technologies: data.technologies,
    ...categoryConfig[key]
  }));

  /**
   * Handles click events on technology items to toggle expansion
   * Manages unique identification across categories to prevent conflicts
   * Implements accordion-like behavior where only one item can be expanded
   * 
   * @param {string} categoryKey - The category identifier (e.g., 'languages', 'frontend')
   * @param {string} techName - The specific technology name within the category
   */
  const handleTechClick = (categoryKey, techName) => {
    const techId = `${categoryKey}-${techName}`;
    // Toggle behavior: close if already open, open if closed
    setExpandedTech(expandedTech === techId ? null : techId);
  };

  /**
   * Generates staggered animation delays for visual hierarchy
   * Creates a cascading effect as items animate into view
   * 
   * @param {number} categoryIndex - Index of the category being animated
   * @param {number} techIndex - Index of the technology within the category
   * @returns {number} Calculated delay in seconds
   */
  const calculateAnimationDelay = (categoryIndex, techIndex) => {
    return (categoryIndex * ANIMATION_CONFIG.ITEM_DELAY_BASE) + 
           (techIndex * ANIMATION_CONFIG.TECH_DELAY_MULTIPLIER);
  };

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_CONFIG.CONTAINER_DURATION }}
          className="text-center"
        >
          {/* Section Header with Professional Messaging */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technologies I Work With
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            A versatile foundation for solving complex problems in evolving technical environments.
          </p>

          {/* Technology Grid - Responsive 2x3 Layout */}
          <div className={GRID_CONFIG.CLASSES}>
            {techCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              
              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                  transition={{ 
                    duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
                    delay: categoryIndex * ANIMATION_CONFIG.ITEM_DELAY_BASE,
                    ease: "easeOut"
                  }}
                  className={`
                    relative group h-full ${GRID_CONFIG.MIN_HEIGHT}
                    ${category.bgColor} ${category.borderColor}
                    border-2 rounded-2xl p-6 
                    hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-gray-900/20
                    transition-all duration-300 hover:-translate-y-2
                    backdrop-blur-sm
                    flex flex-col
                  `}
                >
                  {/* Category Header with Gradient Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-r ${category.color}
                      shadow-lg group-hover:shadow-xl transition-shadow duration-300
                    `}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {category.title}
                  </h3>

                  {/* Interactive Technologies List */}
                  <div className="space-y-3 flex-grow">
                    {Object.entries(category.technologies).map(([techName, techData], techIndex) => {
                      const techId = `${category.key}-${techName}`;
                      const isExpanded = expandedTech === techId;
                      
                      return (
                        <div key={techName} className="space-y-2">
                          {/* Clickable Technology Item */}
                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: calculateAnimationDelay(categoryIndex, techIndex)
                            }}
                            onClick={() => handleTechClick(category.key, techName)}
                            className={`
                              w-full flex items-center justify-between gap-3 p-3 
                              bg-white dark:bg-gray-700/50 rounded-lg shadow-sm 
                              hover:shadow-md transition-all duration-200 
                              group/item cursor-pointer
                              ${isExpanded ? 'ring-2 ring-blue-500/30 bg-blue-50 dark:bg-blue-900/30' : ''}
                            `}
                            aria-expanded={isExpanded}
                            aria-controls={`tech-details-${techId}`}
                          >
                            <div className="flex items-center gap-3">
                              <ChevronRight 
                                className={`
                                  w-4 h-4 text-gray-400 group-hover/item:text-gray-600 
                                  dark:group-hover/item:text-gray-300 transition-all flex-shrink-0
                                  ${isExpanded ? 'rotate-90 text-blue-500' : ''}
                                `} 
                                aria-hidden="true"
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors text-left">
                                {techName}
                              </span>
                            </div>
                            <ChevronDown 
                              className={`
                                w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0
                                ${isExpanded ? 'rotate-180 text-blue-500' : ''}
                              `}
                              aria-hidden="true"
                            />
                          </motion.button>

                          {/* Expandable Details Panel */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                id={`tech-details-${techId}`}
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ 
                                  duration: ANIMATION_CONFIG.DROPDOWN_DURATION, 
                                  ease: "easeInOut" 
                                }}
                                className="overflow-hidden"
                                role="region"
                                aria-label={`Details for ${techName}`}
                              >
                                <div className="ml-7 p-4 bg-white dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                    {techData.description}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                    {techData.usage}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Subtle Gradient Overlay on Hover */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5
                    bg-gradient-to-br ${category.color} transition-opacity duration-300
                    pointer-events-none
                  `} />
                </motion.div>
              );
            })}
          </div>

          {/* Call-to-Action Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: ANIMATION_CONFIG.CONTAINER_DURATION, 
              delay: ANIMATION_CONFIG.FINAL_CTA_DELAY 
            }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Always learning and exploring new technologies to deliver better solutions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;

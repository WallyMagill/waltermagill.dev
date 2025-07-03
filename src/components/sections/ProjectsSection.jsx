/**
 * Projects showcase section component
 * 
 * Displays featured projects in a responsive grid layout with detailed
 * information including technologies, roles, team members, and live demos.
 * Implements scroll-triggered animations and graceful image loading
 * with fallback handling for optimal user experience.
 * 
 * The component demonstrates portfolio presentation best practices,
 * responsive design patterns, and professional project documentation.
 * 
 * @author Walter Magill
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Users } from 'lucide-react';
import { PROJECTS } from '../../utils/projectData';

/**
 * Featured projects section with animated grid layout
 * 
 * Features:
 * - Responsive CSS Grid (1-3 columns based on screen size)
 * - Project cards with hover animations and transitions
 * - Image loading with graceful fallback handling
 * - Technology stack visualization with tags
 * - Team member attribution when applicable
 * - Direct links to live demos and source code
 * - Scroll-triggered staggered animations
 * 
 * Projects are automatically sorted by ID in descending order
 * to showcase the most recent work first.
 * 
 * @returns {JSX.Element} Complete projects showcase section
 */
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" // Start animation before element fully enters viewport
  });

  return (
    <section 
      id="projects" 
      className="section-padding"
      aria-label="Featured projects and portfolio work"
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h2>

          {/* Projects Grid - Responsive layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {PROJECTS
              .sort((a, b) => b.id - a.id) // Sort newest projects first
              .map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                />
              ))}
          </div>

          {/* GitHub Profile Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/WallyMagill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="View all projects on GitHub (opens in new tab)"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
              View My GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Individual project card component
 * 
 * Renders a single project with image, description, technologies,
 * team information, and action links. Includes hover animations
 * and graceful image loading with fallback.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @param {number} props.index - Card index for staggered animations
 * @param {boolean} props.isInView - Whether parent section is in viewport
 * @returns {JSX.Element} Animated project card
 */
const ProjectCard = ({ project, index, isInView }) => {
  /**
   * Handles project image loading errors
   * Shows fallback placeholder when image fails to load
   * 
   * @param {Event} e - Image error event
   */
  const handleImageError = (e) => {
    console.warn(`Project image failed to load for: ${project.title}`);
    e.target.style.display = 'none';
    const fallbackElement = e.target.nextSibling;
    if (fallbackElement) {
      fallbackElement.style.display = 'flex';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group max-w-sm w-full"
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image Section */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
        {project.image && (
          <img 
            src={project.image} 
            alt={`${project.title} project screenshot showing main interface`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={handleImageError}
          />
        )}
        
        {/* Fallback placeholder for missing/failed images */}
        <div 
          className={`${project.image ? 'hidden' : 'flex'} items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm text-center px-4`}
          aria-label="Project screenshot placeholder"
        >
          <div>
            <div className="mb-2 text-2xl" aria-hidden="true">📸</div>
            <div className="font-medium">{project.title}</div>
            <div className="text-xs opacity-75">Project Screenshot</div>
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        {/* Project Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h3>
        
        {/* Project Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Role Information (when provided) */}
        {project.role && (
          <div className="mb-3">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              <span className="font-semibold">Role:</span> {project.role}
            </p>
          </div>
        )}

        {/* Team Information (when provided) */}
        {project.team && project.team.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Team:
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {project.team.map((member, idx) => (
                <div key={idx}>{member}</div>
              ))}
            </div>
          </div>
        )}
        
        {/* Technology Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium"
              role="listitem"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Links */}
        <div className="flex gap-4" role="list" aria-label="Project links">
          {/* GitHub Repository Link */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            Code
          </a>
          
          {/* Live Demo Link (when available) */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
              aria-label={`View ${project.title} live demo (opens in new tab)`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectsSection;

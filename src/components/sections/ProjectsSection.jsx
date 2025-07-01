import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Users } from 'lucide-react';
import { PROJECTS } from '../../utils/projectData';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {PROJECTS
              .sort((a, b) => b.id - a.id) // Sort by ID descending (newest first)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group max-w-sm w-full"
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                    {typeof project.image === 'string' ? (
                      // Placeholder mode (for when using string filenames)
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500 dark:text-gray-400 text-sm text-center px-4">
                          {project.image.split('/').pop()}
                          <br />
                          <span className="text-xs opacity-75">Image placeholder</span>
                        </span>
                      </div>
                    ) : (
                      // Actual image mode (for when using imported images)
                      <img 
                        src={project.image} 
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Role (if provided) */}
                    {project.role && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          Role: {project.role}
                        </p>
                      </div>
                    )}

                    {/* Team (if provided) */}
                    {project.team && project.team.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Optional: View More Projects Link */}
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              View More on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

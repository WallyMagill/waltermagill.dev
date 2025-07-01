import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { experienceData } from '../../utils/experienceData';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sort experiences by ID descending (newest first)
  const sortedExperiences = [...experienceData].sort((a, b) => b.id - a.id);

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Experience
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {sortedExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {experience.title}
                    </h3>
                    
                    {/* Company, Location, and Period */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                {/* Technologies Section */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies & Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optional: Call to action or additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: sortedExperiences.length * 0.1 + 0.2 }}
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

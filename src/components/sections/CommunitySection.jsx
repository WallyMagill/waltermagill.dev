import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Building, Heart } from 'lucide-react';
import { communityData } from '../../utils/communityData';

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sort community data by ID descending (newest first)
  const sortedCommunityData = [...communityData].sort((a, b) => b.id - a.id);

  // Theme color mapping for visual indicators
  const themeColors = {
    Environment: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Education: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Economic Empowerment': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    Children: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200'
  };

  return (
    <section id="community" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Leadership & Community Involvement
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {sortedCommunityData.map((involvement, index) => (
              <motion.div
                key={involvement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {involvement.title}
                    </h3>
                    
                    {/* Organization, Location, and Period */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{involvement.organization}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{involvement.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{involvement.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Theme Tag */}
                  <div className="mt-2 md:mt-0 md:ml-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${themeColors[involvement.theme]}`}>
                      <Heart className="w-3 h-3" />
                      {involvement.theme}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {involvement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optional: Call to action or additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: sortedCommunityData.length * 0.1 + 0.2 }}
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
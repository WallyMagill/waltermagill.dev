/**
 * Individual project showcase component with dynamic routing
 * 
 * Dedicated project detail page component that provides comprehensive
 * project information through dynamic routing and professional presentation.
 * Currently serves as a foundation for detailed project showcases while
 * maintaining responsive design and navigation patterns.
 * 
 * Features React Router integration, animation-ready components, and
 * scalable architecture for rich project detail implementation.
 * 
 * @author Walter Magill
 */

import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  // Extract project ID from URL parameters for dynamic content loading
  const { id } = useParams();

  return (
    <div className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Navigation back to projects with visual feedback */}
          <a
            href="/projects"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </a>

          {/* Dynamic project title with responsive typography */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Project {id}
          </h1>

          {/* Content placeholder with consistent styling */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
            <p className="text-gray-600 dark:text-gray-300">
              Project details coming soon...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

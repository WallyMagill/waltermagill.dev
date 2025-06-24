import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
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
          <a
            href="/projects"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </a>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Project {id}
          </h1>

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

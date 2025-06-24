import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About Me
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              I'm a passionate full-stack developer with a strong foundation in
              computer science and a love for creating innovative web
              applications. My journey in technology started with curiosity and
              has evolved into a career focused on building scalable,
              user-friendly solutions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Background
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              With a degree in Computer Science, I've developed expertise in
              both frontend and backend technologies. I enjoy working with
              modern frameworks and tools that enable rapid development while
              maintaining code quality and performance.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I specialize in building full-stack web applications using React,
              Node.js, and modern cloud technologies. My approach combines
              technical expertise with creative problem-solving to deliver
              exceptional user experiences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Beyond Code
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community. I believe in continuous learning and
              staying up-to-date with industry trends.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

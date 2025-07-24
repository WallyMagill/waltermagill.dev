/**
 * Project portfolio data management
 * 
 * Centralized repository for all project information displayed in the portfolio.
 * Contains comprehensive project metadata including technical implementations,
 * visual assets, and professional context for recruiter evaluation.
 * 
 * Features unique project identification, technical stack documentation,
 * visual asset management, and professional presentation optimization.
 * 
 * @author Walter Magill
 */

// Project screenshot imports for optimal bundling and performance
// Images stored in assets directory with descriptive naming convention
import lessonlinkImage from '../assets/lessonlink-screenshot.jpg';
import echoEchoImage from '../assets/echo-echo-screenshot.jpg';
import neuralNetworkImage from '../assets/neural-network-chart.jpg';
import tseImage from '../assets/tse-diagram.jpg';

/**
 * Comprehensive project portfolio data array
 * 
 * Each project object contains:
 * @property {number} id - Unique identifier for sorting and key management
 * @property {string} title - Professional project name
 * @property {string} description - Concise summary emphasizing technical achievements
 * @property {Array<string>} technologies - Array of frameworks, languages, and tools used
 * @property {string|null} image - Imported image asset or null for fallback handling
 * @property {string} github - GitHub repository URL for source code review
 * @property {string|null} live - Live demo URL or null if not deployed
 * @property {string} [role] - Specific role and contributions (for team projects)
 * @property {Array<string>} [team] - Team member information (for collaborative projects)
 * 
 * Projects are intentionally numbered with gaps (1,2,3,4) to allow for easy insertion
 * of additional projects without disrupting the chronological ordering system.
 */
export const PROJECTS = [
  {
    id: 5,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my journey as a software engineer, recent Dartmouth graduate, and former NCAA Division I athlete. Features interactive particle background, smooth animations, dark/light theme support, and dynamic content with optimized performance.",
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'EmailJS', 'Lucide React', 'HTML5 Canvas'],
    image: 'https://github.com/WallyMagill/lessonlink',
    github: 'https://github.com/WallyMagill/waltermagill.dev',
    live: 'https://waltermagill.dev'
  },
  {
    id: 4,
    title: "LessonLink",
    description: "A collaborative web platform for educators to create, share, and remix interactive lesson plans. Features real-time collaboration, rich text editing, and a community-driven approach to educational content creation.",
    technologies: ['React', 'Vite', 'Chakra UI', 'Zustand', 'Tiptap', 'Node.js', 'Express', 'MongoDB'],
    image: lessonlinkImage,
    github: 'https://github.com/WallyMagill/lessonlink',
    live: 'https://project-lessonlink.onrender.com',
    role: 'Frontend architecture, rich text editor integration, remixing logic',
    team: ['Wally Magill – Frontend, editor, remixing logic']
  },
  {
    id: 3,
    title: "Echo Echo",
    description: "A 2D time-travel puzzle-platformer built in Unity where players manipulate past versions of themselves to solve increasingly complex challenges. Features custom physics, smooth animations, and innovative gameplay mechanics.",
    technologies: ['Unity', 'C#', 'Tilemap', 'Animator', '2D Physics'],
    image: echoEchoImage,
    github: 'https://github.com/WallyMagill/echo-echo-game',
    live: null // Game requires download, no live web demo available
  },
  {
    id: 2,
    title: "Build My Own Neural Network",
    description: "A fully custom neural network built from scratch in Python to understand the fundamentals of machine learning. Implements forward propagation, backpropagation, and gradient descent without external ML libraries, trained on the MNIST dataset.",
    technologies: ['Python', 'NumPy', 'Gradient Descent', 'MNIST'],
    image: neuralNetworkImage,
    github: 'https://github.com/WallyMagill/Build-My-Own-Neural-Network',
    live: null // Research project, no live demo applicable
  },
  {
    id: 1,
    title: "Tiny Search Engine",
    description: "A modular search engine backend built in C that implements web crawling, indexing, and querying functionality. Features memory-efficient data structures, robust error handling, and comprehensive testing with Valgrind.",
    technologies: ['C', 'Make', 'Bash', 'Valgrind', 'File I/O'],
    image: tseImage,
    github: 'https://github.com/WallyMagill/TSE',
    live: null // Backend system, no web interface available
  }
];

/**
 * Helper function to get projects sorted by recency (newest first)
 * Useful for components that need chronological ordering
 * 
 * @returns {Array} Projects sorted by ID in descending order
 */
export const getProjectsByRecency = () => {
  return [...PROJECTS].sort((a, b) => b.id - a.id);
};

/**
 * Helper function to get featured projects (top 3 most recent)
 * Useful for summary sections or landing page highlights
 * 
 * @param {number} count - Number of featured projects to return (default: 3)
 * @returns {Array} Most recent projects limited by count
 */
export const getFeaturedProjects = (count = 3) => {
  return getProjectsByRecency().slice(0, count);
};

/**
 * Helper function to get projects by technology
 * Useful for filtering or showcasing specific technical skills
 * 
 * @param {string} technology - Technology name to filter by
 * @returns {Array} Projects that include the specified technology
 */
export const getProjectsByTechnology = (technology) => {
  return PROJECTS.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

/**
 * Helper function to get projects with live demos
 * Useful for creating interactive portfolio sections
 * 
 * @returns {Array} Projects that have live demo URLs
 */
export const getLiveDemoProjects = () => {
  return PROJECTS.filter(project => project.live !== null);
};

// Default export for components that need the full project array
export default PROJECTS;

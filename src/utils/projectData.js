// Project data for portfolio website
// This file centralizes all project information for the Projects section

export const PROJECTS = [
  {
    id: 4,
    title: "LessonLink",
    description: "A collaborative web platform for educators to create, share, and remix interactive lesson plans. Features real-time collaboration, rich text editing, and a community-driven approach to educational content creation.",
    technologies: ['React', 'Vite', 'Chakra UI', 'Zustand', 'Tiptap', 'Node.js', 'Express', 'MongoDB'],
    image: '../../assets/images/lessonlink-screenshot.jpg',
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
    image: '../../assets/images/echo-echo-screenshot.jpg',
    github: 'https://github.com/WallyMagill/echo-echo-game',
    live: null
  },
  {
    id: 2,
    title: "Build My Own Neural Network",
    description: "A fully custom neural network built from scratch in Python to understand the fundamentals of machine learning. Implements forward propagation, backpropagation, and gradient descent without external ML libraries, trained on the MNIST dataset.",
    technologies: ['Python', 'NumPy', 'Gradient Descent', 'MNIST'],
    image: '../../assets/images/neural-network-chart.jpg',
    github: 'https://github.com/WallyMagill/Build-My-Own-Neural-Network',
    live: null
  },
  {
    id: 1,
    title: "Tiny Search Engine",
    description: "A modular search engine backend built in C that implements web crawling, indexing, and querying functionality. Features memory-efficient data structures, robust error handling, and comprehensive testing with Valgrind.",
    technologies: ['C', 'Make', 'Bash', 'Valgrind', 'File I/O'],
    image: '../../assets/images/tse-diagram.jpg',
    github: 'https://github.com/WallyMagill/TSE',
    live: null
  }
];

export default PROJECTS;
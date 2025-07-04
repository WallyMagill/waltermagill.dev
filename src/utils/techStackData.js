/**
 * Technology stack data and configuration
 * 
 * Comprehensive data structure for technical skills showcase featuring
 * 6 technology categories with expandable descriptions, usage examples,
 * and professional context for portfolio presentation.
 * 
 * Features category-based organization, detailed descriptions, and 
 * real-world usage examples for each technology and tool.
 * 
 * @author Walter Magill
 */

/**
 * Complete technology stack organized by category
 * 
 * Each category contains:
 * @property {string} title - Display name for the category
 * @property {Object} technologies - Object mapping technology names to details
 * 
 * Each technology object contains:
 * @property {string} description - Brief technical description of the technology
 * @property {string} usage - Specific context of how I've used this technology
 */
export const TECH_STACK = {
  languages: {
    title: "Languages",
    technologies: {
      "Python": {
        description: "High-level programming language known for readability and versatility.",
        usage: "Built neural networks from scratch, data analysis projects, and automation scripts."
      },
      "JavaScript": {
        description: "Dynamic programming language essential for modern web development.",
        usage: "Frontend interactivity, React applications, API integrations, and full-stack development."
      },
      "C": {
        description: "Low-level systems programming language for performance-critical applications.",
        usage: "Built a complete search engine with memory management and data structures."
      },
      "C#": {
        description: "Object-oriented language primarily used for Unity game development.",
        usage: "Developed a 2D time-travel puzzle game with custom physics and animations."
      },
      "Java": {
        description: "Object-oriented language used for enterprise applications and algorithms.",
        usage: "Coursework in algorithms, data structures, and object-oriented design patterns."
      }
    }
  },
  frontend: {
    title: "Frontend",
    technologies: {
      "React": {
        description: "Component-based JavaScript library for building user interfaces.",
        usage: "Built multiple web applications including this portfolio and collaborative educational tools."
      },
      "HTML/CSS": {
        description: "Markup and styling languages fundamental to web development.",
        usage: "Semantic markup, responsive design, CSS Grid/Flexbox, and modern styling techniques."
      },
      "Tailwind CSS": {
        description: "Utility-first CSS framework for rapid UI development.",
        usage: "Styled this portfolio and other projects with responsive, maintainable CSS."
      },
      "Vite": {
        description: "Fast build tool and development server for modern web projects.",
        usage: "Used as the build system for React applications, improving development speed."
      },
      "Framer Motion": {
        description: "React animation library for creating smooth, interactive animations.",
        usage: "Added scroll-triggered animations and micro-interactions to enhance user experience."
      }
    }
  },
  backend: {
    title: "Backend",
    technologies: {
      "Node.js": {
        description: "JavaScript runtime for building scalable server-side applications.",
        usage: "Created REST APIs and backend services for full-stack web applications."
      },
      "Express": {
        description: "Minimal web framework for Node.js applications.",
        usage: "Built RESTful APIs with authentication, routing, and middleware integration."
      },
      "MongoDB": {
        description: "NoSQL document database for flexible data storage.",
        usage: "Designed schemas and managed data for collaborative educational platform."
      },
      "RESTful APIs": {
        description: "Architectural style for designing networked applications.",
        usage: "Designed and implemented APIs for data exchange between frontend and backend."
      }
    }
  },
  cloud: {
    title: "Cloud & DevOps",
    technologies: {
      "Google Cloud Functions": {
        description: "Serverless computing platform for event-driven applications.",
        usage: "Optimized API call sequences and reduced latency for chatbot integrations."
      },
      "OpenAI API": {
        description: "AI-powered API for natural language processing and generation.",
        usage: "Integrated chatbot functionality and prompt engineering for AI applications."
      },
      "Git": {
        description: "Distributed version control system for tracking code changes.",
        usage: "Daily workflow for project management, collaboration, and code history."
      },
      "GitHub": {
        description: "Web-based Git repository hosting and collaboration platform.",
        usage: "Code hosting, issue tracking, project management, and portfolio showcase."
      }
    }
  },
  tools: {
    title: "Tools & Environments",
    technologies: {
      "Unity": {
        description: "Cross-platform game engine for 2D and 3D game development.",
        usage: "Developed complete 2D puzzle game with physics, animations, and level design."
      },
      "AutoCAD Civil 3D": {
        description: "Professional CAD software for civil engineering and surveying.",
        usage: "Created high-precision topographic maps and engineering drawings."
      },
      "VS Code": {
        description: "Popular code editor with extensive extension ecosystem.",
        usage: "Primary development environment for all coding projects and debugging."
      },
      "NumPy": {
        description: "Fundamental package for scientific computing in Python.",
        usage: "Mathematical operations and array processing for neural network implementation."
      }
    }
  },
  practices: {
    title: "Practices & Methodologies",
    technologies: {
      "Responsive Design": {
        description: "Design approach ensuring optimal viewing across all device sizes.",
        usage: "All web projects built mobile-first with flexible layouts and media queries."
      },
      "Component Architecture": {
        description: "Building applications as collections of reusable, modular components.",
        usage: "Structured React applications with clean separation of concerns and reusability."
      },
      "Version Control": {
        description: "Systematic tracking and management of code changes over time.",
        usage: "Git workflow with meaningful commits, branching strategies, and collaboration."
      },
      "API Design": {
        description: "Creating well-structured, documented interfaces for system communication.",
        usage: "Designed RESTful endpoints with proper status codes and data validation."
      },
      "Testing & Debugging": {
        description: "Systematic approach to finding and fixing software issues.",
        usage: "Used Valgrind for memory debugging, console testing, and error handling."
      }
    }
  }
};

/**
 * Helper function to get all technology categories
 * 
 * @returns {Array} Array of category keys
 * @usage const categories = getTechCategories();
 */
export const getTechCategories = () => {
  return Object.keys(TECH_STACK);
};

/**
 * Helper function to get technologies by category
 * 
 * @param {string} category - Category key to retrieve
 * @returns {Object|null} Technologies object for the category or null if not found
 * @usage const frontendTechs = getTechnologiesByCategory('frontend');
 */
export const getTechnologiesByCategory = (category) => {
  return TECH_STACK[category]?.technologies || null;
};

/**
 * Helper function to get all technologies across all categories
 * 
 * @returns {Array} Flat array of all technology names
 * @usage const allTechs = getAllTechnologies();
 */
export const getAllTechnologies = () => {
  return Object.values(TECH_STACK).flatMap(category => 
    Object.keys(category.technologies)
  );
};

/**
 * Helper function to search technologies by name or description
 * 
 * @param {string} query - Search term to match against
 * @returns {Array} Array of matching technology objects with category info
 * @usage const results = searchTechnologies('react');
 */
export const searchTechnologies = (query) => {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  Object.entries(TECH_STACK).forEach(([categoryKey, category]) => {
    Object.entries(category.technologies).forEach(([techName, techData]) => {
      if (
        techName.toLowerCase().includes(searchTerm) ||
        techData.description.toLowerCase().includes(searchTerm) ||
        techData.usage.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          name: techName,
          category: categoryKey,
          categoryTitle: category.title,
          ...techData
        });
      }
    });
  });
  
  return results;
};

/**
 * Default export for components that need the complete tech stack
 */
export default TECH_STACK;

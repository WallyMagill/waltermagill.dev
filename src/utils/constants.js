export const SITE_CONFIG = {
  name: 'Walter Magill',
  title: 'Full-Stack Developer',
  description: 'Recent graduate with a Bachelor\'s of Arts in Computer Science, modified with Economics from Dartmouth College.',
  url: 'https://waltermagill.dev',
  email: 'walter.g.magill@gmail.com',
  github: 'https://github.com/WallyMagill',
  linkedin: 'https://www.linkedin.com/in/walter-magill-40023a249/',
};

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Contact', href: '/contact' },
];

// Updated TECH_STACK with detailed descriptions for interactive dropdowns
export const TECH_STACK = {
  languages: {
    title: "Languages",
    technologies: {
      "JavaScript (ES6+)": {
        description: "A dynamic scripting language for building interactive websites.",
        usage: "I've used it to create responsive UIs and handle client-side logic."
      },
      "TypeScript": {
        description: "A statically typed superset of JavaScript that improves error detection.",
        usage: "I've used it to add type safety and refactor large React codebases."
      },
      "Python": {
        description: "A versatile, beginner-friendly language used in many domains.",
        usage: "I've used it for scripting, backend APIs, and algorithm practice."
      },
      "Java": {
        description: "An object-oriented language known for reliability and scalability.",
        usage: "I used it to implement data structures and solving object-oriented problems."
      },
      "C": {
        description: "A low-level language commonly used in systems programming.",
        usage: "I've worked with C to understand memory management."
      },
      "C#": {
        description: "A Microsoft-backed language used for desktop, web, and game development.",
        usage: "I used it to create gameplay systems in Unity."
      },
      "HTML5": {
        description: "The markup standard for structuring content on the web.",
        usage: "I've used it to build accessible, semantic web layouts."
      },
      "CSS3": {
        description: "A stylesheet language for customizing web layouts and animations.",
        usage: "I've used it with Tailwind to style responsive UIs."
      }
    }
  },
  frontend: {
    title: "Frontend",
    technologies: {
      "React.js": {
        description: "A JavaScript library for building component-based user interfaces.",
        usage: "I used React to build dynamic, single-page apps and reusable UI elements."
      },
      "Next.js": {
        description: "A React framework that adds SSR, routing, and optimizations.",
        usage: "I used it for statically generated project pages and routing in my portfolio."
      },
      "Tailwind CSS": {
        description: "A utility-first CSS framework for building custom designs rapidly.",
        usage: "I've used it across my frontend projects for responsive styling."
      },
      "Redux Toolkit": {
        description: "A modern approach to state management in React apps.",
        usage: "I used it to manage global UI state in complex component trees."
      },
      "Framer Motion": {
        description: "A React animation library for UI transitions and motion effects.",
        usage: "I used it to add subtle animations to navbars and interactive elements."
      }
    }
  },
  backend: {
    title: "Backend & APIs",
    technologies: {
      "Node.js": {
        description: "A JavaScript runtime that allows server-side development.",
        usage: "I've used Node.js to create backend servers for full-stack apps."
      },
      "Express.js": {
        description: "A minimal Node.js framework for handling HTTP requests.",
        usage: "I used Express to build RESTful APIs for user and project data."
      },
      "MongoDB": {
        description: "A document-based NoSQL database.",
        usage: "I used it to store user info and project metadata in web apps."
      },
      "REST APIs": {
        description: "Standard web APIs that use HTTP for communication.",
        usage: "I built and consumed REST APIs for frontend/backend integration."
      },
      "OpenAI API": {
        description: "A powerful API for accessing GPT models.",
        usage: "I used it to experiment with generative AI in an internship."
      }
    }
  },
  cloud: {
    title: "Cloud & DevOps",
    technologies: {
      "Docker": {
        description: "A platform for creating isolated, reproducible app environments.",
        usage: "I've used it to containerize my Node apps for testing and deployment."
      },
      "Amazon Web Services (AWS)": {
        description: "A cloud platform offering compute, storage, and services.",
        usage: "I've explored AWS to host projects and manage assets."
      },
      "Google Cloud Platform (GCP)": {
        description: "A cloud provider with services for hosting and ML.",
        usage: "I've used GCP for deploying APIs and running experiments."
      },
      "Render": {
        description: "A simple PaaS for full-stack app hosting.",
        usage: "I used Render to deploy websites and projects."
      },
      "Vercel": {
        description: "A frontend-optimized hosting service, ideal for Next.js.",
        usage: "I used Vercel to deploy my portfolio and static frontend projects."
      }
    }
  },
  tools: {
    title: "Tools & Platforms",
    technologies: {
      "Git": {
        description: "A version control system for tracking code changes.",
        usage: "I use Git daily for branching and committing in collaborative projects."
      },
      "GitHub": {
        description: "A cloud platform for sharing and deploying Git repositories.",
        usage: "I host all my public projects and manage issues on GitHub."
      },
      "Linux": {
        description: "An open-source operating system widely used in dev environments.",
        usage: "I use Linux commands for scripting and managing local servers."
      },
      "Postman": {
        description: "A tool for testing and debugging APIs.",
        usage: "I used Postman to test REST endpoints during backend development."
      },
      "VS Code": {
        description: "A fast, extensible code editor.",
        usage: "I've customized VS Code extensively for frontend and backend workflows."
      },
      "Figma": {
        description: "A design tool for UI prototyping and collaboration.",
        usage: "I've used Figma to mock layouts before building them in code."
      }
    }
  },
  practices: {
    title: "Engineering Practices",
    technologies: {
      "Object-Oriented Programming (OOP)": {
        description: "A paradigm based on classes and encapsulated logic.",
        usage: "I applied OOP in Java and C to design modular systems."
      },
      "Algorithms & Data Structures": {
        description: "Core CS concepts for solving computational problems efficiently.",
        usage: "I practiced these extensively in Python and Java on LeetCode."
      },
      "Agile/Scrum": {
        description: "A collaborative, iterative software development framework.",
        usage: "I've followed Agile methods in class team projects and weekly sprints."
      },
      "System Design": {
        description: "The process of architecting scalable applications.",
        usage: "I studied system design patterns and sketched mock architectures."
      },
      "Test-Driven Development (TDD)": {
        description: "A development practice of writing tests before code.",
        usage: "I've practiced TDD in JavaScript using Jest for key features."
      }
    }
  }
};

// Typewriter animation words for the hero section
export const TYPEWRITER_WORDS = [
  'a Learner',
  'a Coder', 
  'an Athlete',
  'a Problem Solver',
  'a Creator',
  'an Innovator',
  'a Developer',
  'an Analyst'
];
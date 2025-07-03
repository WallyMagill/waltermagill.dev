# Walter Magill - Personal Portfolio

A modern, responsive portfolio website showcasing my journey as a software engineer, recent Dartmouth graduate, and former NCAA Division I athlete. Built with React, Vite, and Tailwind CSS, featuring smooth animations, dark/light theme support, and an interactive particle background.

**Live Site**: [TEMP](TEMP)

## Key Features

- **Interactive Particle System**: Custom-built particle background that responds to mouse movement with physics-based animations
- **Smooth Animations**: Leveraging Framer Motion for engaging scroll-triggered animations and page transitions
- **Responsive Design**: Fully optimized across all devices with mobile-first approach
- **Dark/Light Theme**: Seamless theme switching with system preference detection and localStorage persistence
- **Dynamic Content**: Typewriter effect, expandable tech stack cards, and interactive contact form
- **Performance Optimized**: Lazy loading, efficient re-renders, and optimized bundle splitting

## Tech Stack

**Frontend Framework & Build Tools**
- React 19 with modern hooks and functional components
- Vite for fast development and optimized production builds
- Tailwind CSS for utility-first styling

**Animations & Interactions**
- Framer Motion for complex animations and gestures
- Custom particle physics engine built from scratch
- CSS3 transitions and transforms for micro-interactions

**State Management & Architecture**
- React Context API for theme management
- Custom hooks for reusable logic
- Modular component architecture with clear separation of concerns

**Developer Experience**
- ESLint + Prettier for code quality and consistency
- PostCSS with Autoprefixer for cross-browser compatibility
- Environment-based configuration for different deployment stages

**External Integrations**
- EmailJS for contact form functionality without backend dependencies
- Lucide React for consistent, lightweight iconography

## Technical Highlights

### Custom Particle System
Built a physics-based particle animation system from scratch using HTML5 Canvas and requestAnimationFrame, featuring:
- Real-time mouse interaction with repelling forces
- Dynamic particle connections based on proximity
- Optimized rendering for 60fps performance across devices
- Adaptive particle density based on screen size

### Performance Engineering
- Implemented intersection observer for scroll-triggered animations
- Optimized re-renders using React.memo and useMemo
- Lazy loading for images and heavy components
- Efficient state management to minimize unnecessary updates

### Responsive Architecture
- Mobile-first CSS Grid and Flexbox layouts
- Adaptive navigation with smooth mobile menu transitions
- Touch-friendly interactions and gesture support
- Cross-browser compatibility testing

## Project Structure

```
src/
├── components/
│   ├── effects/           # Custom animations and particle system
│   ├── layout/           # Navigation, header, footer components  
│   └── sections/         # Modular page sections
├── context/              # Theme and global state management
├── hooks/                # Custom React hooks
├── utils/                # Data management and constants
└── styles/               # Global CSS and Tailwind configuration
```

## Development Approach

**Code Quality**
- Consistent component patterns and naming conventions
- Comprehensive prop validation and TypeScript-ready structure
- Modular CSS with Tailwind utilities and custom properties
- Git workflow with semantic commits and feature branches

**Data Management**
- Centralized content management in `/utils` for easy updates
- Structured data objects for projects, experience, and skills
- Environment variable configuration for sensitive data

**User Experience Focus**
- Accessibility-first design with ARIA labels and keyboard navigation
- Progressive enhancement for graceful degradation
- Smooth scroll behavior and intuitive navigation patterns
- Loading states and error handling for robust user experience

## Quick Start

```bash
# Clone and install
git clone https://github.com/WallyMagill/waltermagill.dev.git
cd waltermagill.dev
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Contact Form Setup

The contact form uses EmailJS for serverless email delivery. Set up environment variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

**Walter Magill** - Software Engineer  
walter.g.magill@gmail.com | [LinkedIn](https://www.linkedin.com/in/walter-magill-40023a249/) | [Portfolio](TEMP)

*Building modern web experiences with clean code and thoughtful design*
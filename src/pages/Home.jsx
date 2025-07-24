/**
 * Home page component with strategic section assembly
 * 
 * Orchestrates the complete portfolio experience through strategic section
 * ordering and responsive layout management. Demonstrates advanced React
 * component composition patterns and user experience design for professional
 * portfolio websites optimized for engagement and conversion.
 * 
 * Features strategic section flow, responsive design, and performance
 * optimization ready for lazy loading and bundle splitting.
 * 
 * @author Walter Magill
 */

import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import TechStackSection from '../components/sections/TechStackSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import CommunitySection from '../components/sections/CommunitySection';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <ExperienceSection />
      <CommunitySection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;

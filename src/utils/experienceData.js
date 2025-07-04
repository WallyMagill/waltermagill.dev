/**
 * Professional experience data management
 * 
 * Centralized repository for all work experience information designed for
 * recruiter review and technical screening. Demonstrates career progression,
 * technical skills development, and professional growth across industries.
 * 
 * Features chronological organization, comprehensive role descriptions,
 * technology stack documentation, and results-oriented language.
 * 
 * @author Walter Magill
 */

/**
 * Professional experience data array containing comprehensive work history
 * 
 * Each experience object represents a professional role with:
 * @property {number} id - Unique identifier for sorting and key management (higher = more recent)
 * @property {string} title - Official job title as it appears on resume
 * @property {string} company - Full legal company name for verification purposes
 * @property {string} location - City, State format for geographic context
 * @property {string} period - Date range in "Month YYYY – Month YYYY" format
 * @property {string} description - Comprehensive role summary emphasizing technical contributions
 * @property {Array<string>} technologies - Technical tools, frameworks, and systems used
 * 
 * ID Numbering System:
 * - ID 4: Most recent position (Summer 2024)
 * - ID 3: Previous role showing progression
 * - ID 2: Earlier position demonstrating growth
 * - ID 1: Entry-level role establishing foundation
 * 
 * Professional Context:
 * - Spans 2019-2024 showing consistent work history during college
 * - Demonstrates progression from field work to technical specialization
 * - Shows experience across engineering, tech startup, and consulting environments
 * - Highlights both individual projects and collaborative team contributions
 */
export const experienceData = [
  {
    id: 4,
    title: "Prompt Engineer Intern",
    company: "Audos",
    location: "New York, NY",
    period: "June 2024 – August 2024",
    description: "As a Prompt Engineer Intern at Audos, I led the integration of OpenAI-based chatbot APIs and developed dynamic client-facing micro web pages using HTML, CSS, and JavaScript. I implemented Google Cloud Functions to optimize sequential API calls, reducing latency and improving backend efficiency. This role required balancing technical implementation with real-time support in a fast-paced startup environment.",
    technologies: ['OpenAI API', 'Google Cloud Functions', 'JavaScript', 'HTML', 'CSS']
  },
  {
    id: 3,
    title: "Civil Drafter",
    company: "Four Points Surveying and Engineering",
    location: "Steamboat Springs, CO",
    period: "May 2021 – August 2022",
    description: "At Four Points, I led the creation of high-precision topographic maps using AutoCAD Civil 3D, working closely with clients and survey teams. I ensured technical accuracy by integrating geospatial data with engineering specifications. My role contributed to a reliable field-to-office pipeline supporting complex survey deliverables.",
    technologies: ['AutoCAD Civil 3D', 'GIS']
  },
  {
    id: 2,
    title: "Office Assistant",
    company: "Four Points Surveying and Engineering",
    location: "Steamboat Springs, CO",
    period: "May 2020 – September 2020",
    description: "Supported daily operations by managing inventory, preparing materials, and assisting survey teams with GIS software tasks. I contributed to a GIS-integrated database supporting Routt County's infrastructure project workflows. This role required attention to detail and adaptability across both technical and administrative duties.",
    technologies: ['GIS', 'Microsoft Excel', 'Filing Systems']
  },
  {
    id: 1,
    title: "Survey Assistant",
    company: "Four Points Surveying and Engineering",
    location: "Steamboat Springs, CO",
    period: "May 2019 – September 2019",
    description: "Assisted with on-site land surveying by capturing and recording geospatial data using typical survey tools. I ensured accurate data collection through diligent documentation and direct support of senior field engineers. This entry-level technical experience laid the foundation for my spatial data and field mapping skills.",
    technologies: ['GPS', 'Total Station', 'Survey Field Tools']
  }
];

/**
 * Helper function to get experiences sorted by recency (newest first)
 * 
 * @returns {Array} Experience objects sorted by ID in descending order
 * @usage const recentExperiences = getExperiencesByRecency();
 */
export const getExperiencesByRecency = () => {
  return [...experienceData].sort((a, b) => b.id - a.id);
};

/**
 * Helper function to get experiences by technology/skill
 * Useful for generating skill-based experience summaries
 * 
 * @param {string} technology - Technology name to filter by (case-insensitive)
 * @returns {Array} Experience objects that include the specified technology
 * @usage const jsExperience = getExperiencesByTechnology('JavaScript');
 */
export const getExperiencesByTechnology = (technology) => {
  return experienceData.filter(experience => 
    experience.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

/**
 * Helper function to get experiences within a specific time range
 * Useful for generating period-specific experience summaries
 * 
 * @param {number} startYear - Starting year (inclusive)
 * @param {number} endYear - Ending year (inclusive)
 * @returns {Array} Experience objects within the specified year range
 * @usage const recentExperience = getExperiencesByTimeRange(2022, 2024);
 */
export const getExperiencesByTimeRange = (startYear, endYear) => {
  return experienceData.filter(experience => {
    // Extract end year from period string (assumes "Month YYYY – Month YYYY" format)
    const endYearMatch = experience.period.match(/–\s*([A-Za-z]+\s+)?(\d{4})/);
    const experienceEndYear = endYearMatch ? parseInt(endYearMatch[2]) : 0;
    
    return experienceEndYear >= startYear && experienceEndYear <= endYear;
  });
};

/**
 * Helper function to get comprehensive technology list across all experiences
 * Useful for generating skills summaries and technology overviews
 * 
 * @returns {Array} Unique array of all technologies mentioned across experiences
 * @usage const allTechSkills = getAllTechnologies();
 */
export const getAllTechnologies = () => {
  const allTech = experienceData.flatMap(experience => experience.technologies);
  return [...new Set(allTech)].sort(); // Remove duplicates and sort alphabetically
};

/**
 * Helper function to get total years of professional experience
 * Calculates from earliest start date to most recent end date
 * 
 * @returns {number} Total years of professional experience (rounded to 1 decimal)
 * @usage const totalExperience = getTotalYearsExperience();
 */
export const getTotalYearsExperience = () => {
  if (experienceData.length === 0) return 0;
  
  // Extract all start and end years
  const years = experienceData.flatMap(experience => {
    const matches = experience.period.match(/([A-Za-z]+\s+)?(\d{4})/g);
    return matches ? matches.map(match => parseInt(match.match(/(\d{4})/)[1])) : [];
  });
  
  if (years.length === 0) return 0;
  
  const earliestYear = Math.min(...years);
  const latestYear = Math.max(...years);
  
  return Math.round((latestYear - earliestYear + 1) * 10) / 10; // Round to 1 decimal place
};

/**
 * Default export for components that need the complete experience array
 * Most components should import the named export for clarity
 */
export default experienceData;

/**
 * Leadership and community involvement data management
 * 
 * Comprehensive repository for community engagement, leadership experience,
 * and volunteer work demonstrating character, values, and collaborative
 * leadership capabilities for professional evaluation.
 * 
 * Features thematic organization, leadership progression narrative, and
 * professional competency demonstration across multiple impact domains.
 * 
 * @author Walter Magill
 */

/**
 * Community involvement and leadership experience data array
 * 
 * Each involvement object represents a significant community engagement with:
 * @property {number} id - Unique identifier for chronological sorting (higher = more recent)
 * @property {string} title - Official role or position title
 * @property {string} organization - Full organization name for verification and context
 * @property {string} location - Geographic location (City, State format)
 * @property {string} period - Time period of involvement in "Month YYYY – Month YYYY" format
 * @property {string} description - Comprehensive description emphasizing leadership and impact
 * @property {string} theme - Thematic category for visual organization and impact diversity
 * 
 * Thematic Categories:
 * - "Environment": Environmental advocacy, sustainability, and conservation efforts
 * - "Education": Academic support, mentorship, and educational institutional governance
 * - "Economic Empowerment": Financial education, economic development, and empowerment initiatives
 * - "Children": Youth development, protection, and childhood enrichment programs
 * 
 * Chronological Progression (2017-2023):
 * - Shows continuous community engagement spanning high school through college
 * - Demonstrates increasing responsibility and leadership development over time
 * - Illustrates commitment to sustained impact rather than one-time volunteer efforts
 * - Reflects ability to balance community service with academic and athletic commitments
 */
export const communityData = [
  {
    id: 4,
    title: "Athletic Leader",
    organization: "Dartmouth Peak Performance DRIVE Program",
    location: "Hanover, NH",
    period: "June 2023 – August 2023",
    description: "Cultivated leadership through principles of resilience, excellence, and community. Mentored peers and promoted high-performance mindsets in academic and athletic settings. Encouraged a culture of accountability, personal growth, and collaboration across student cohorts.",
    theme: "Education"
  },
  {
    id: 3,
    title: "Member",
    organization: "Dartmouth Endowment Fellowship",
    location: "Hanover, NH",
    period: "June 2023 – August 2023",
    description: "Participated in intensive sessions to understand endowment operations, investment strategy, and board-level governance. Worked alongside Dartmouth staff and alumni to gain long-term financial stewardship insights. Contributed to discussions on higher ed financial sustainability and institutional ethics.",
    theme: "Economic Empowerment"
  },
  {
    id: 2,
    title: "Member",
    organization: "The DREAM Program, Inc.",
    location: "Upper Valley, NH/VT",
    period: "June 2023 – August 2023",
    description: "Coordinated mentorship programs for underserved youth in the Upper Valley. Paired children with student role models and led developmental activities fostering resilience, trust, and creativity. Helped bridge opportunity gaps through community-building and consistent engagement.",
    theme: "Children"
  },
  {
    id: 1,
    title: "Chair of Events Committee",
    organization: "City of Steamboat Springs",
    location: "Steamboat Springs, CO",
    period: "August 2017 – June 2021",
    description: "Led eco-friendly initiatives and collaborated with city officials and local organizations to pass a plastic bag ban ordinance. Delivered research-based presentations to the City Council and facilitated impactful environmental programs for youth. Organized community events, fundraised for scholarships, and created safe teen alternatives promoting wellness and inclusion.",
    theme: "Environment"
  }
];

/**
 * Helper function to get community involvement sorted by recency (newest first)
 * 
 * @returns {Array} Community involvement objects sorted by ID in descending order
 * @usage const recentInvolvement = getCommunityByRecency();
 */
export const getCommunityByRecency = () => {
  return [...communityData].sort((a, b) => b.id - a.id);
};

/**
 * Helper function to get community involvement by theme/cause area
 * Useful for showcasing specific areas of impact and interest
 * 
 * @param {string} theme - Theme category to filter by
 * @returns {Array} Community involvement objects matching the specified theme
 * @usage const environmentalWork = getCommunityByTheme('Environment');
 */
export const getCommunityByTheme = (theme) => {
  return communityData.filter(involvement => 
    involvement.theme.toLowerCase() === theme.toLowerCase()
  );
};

/**
 * Helper function to get all unique themes represented in community involvement
 * Useful for generating theme-based navigation or impact area summaries
 * 
 * @returns {Array} Unique array of all themes represented in community data
 * @usage const impactAreas = getAllThemes();
 */
export const getAllThemes = () => {
  const themes = communityData.map(involvement => involvement.theme);
  return [...new Set(themes)].sort(); // Remove duplicates and sort alphabetically
};

/**
 * Helper function to get leadership roles specifically
 * Filters for positions that explicitly demonstrate leadership responsibility
 * 
 * @returns {Array} Community involvement objects that include leadership titles
 * @usage const leadershipRoles = getLeadershipRoles();
 */
export const getLeadershipRoles = () => {
  const leadershipKeywords = ['chair', 'leader', 'president', 'director', 'coordinator', 'captain'];
  
  return communityData.filter(involvement => 
    leadershipKeywords.some(keyword => 
      involvement.title.toLowerCase().includes(keyword)
    )
  );
};

/**
 * Helper function to get community involvement within a specific time range
 * Useful for generating period-specific impact summaries
 * 
 * @param {number} startYear - Starting year (inclusive)
 * @param {number} endYear - Ending year (inclusive)
 * @returns {Array} Community involvement objects within the specified year range
 * @usage const collegeInvolvement = getCommunityByTimeRange(2021, 2023);
 */
export const getCommunityByTimeRange = (startYear, endYear) => {
  return communityData.filter(involvement => {
    // Extract end year from period string
    const endYearMatch = involvement.period.match(/–\s*([A-Za-z]+\s+)?(\d{4})/);
    const involvementEndYear = endYearMatch ? parseInt(endYearMatch[2]) : 0;
    
    return involvementEndYear >= startYear && involvementEndYear <= endYear;
  });
};

/**
 * Helper function to calculate total years of community involvement
 * Demonstrates sustained commitment to civic engagement over time
 * 
 * @returns {number} Total years of community involvement (rounded to 1 decimal)
 * @usage const totalServiceYears = getTotalYearsInvolvement();
 */
export const getTotalYearsInvolvement = () => {
  if (communityData.length === 0) return 0;
  
  // Extract all start and end years
  const years = communityData.flatMap(involvement => {
    const matches = involvement.period.match(/([A-Za-z]+\s+)?(\d{4})/g);
    return matches ? matches.map(match => parseInt(match.match(/(\d{4})/)[1])) : [];
  });
  
  if (years.length === 0) return 0;
  
  const earliestYear = Math.min(...years);
  const latestYear = Math.max(...years);
  
  return Math.round((latestYear - earliestYear + 1) * 10) / 10; // Round to 1 decimal place
};

/**
 * Helper function to generate a community impact summary
 * Creates a comprehensive overview of community engagement breadth and depth
 * 
 * @returns {Object} Summary object with key metrics and impact areas
 * @usage const impactSummary = getCommunityImpactSummary();
 */
export const getCommunityImpactSummary = () => {
  const themes = getAllThemes();
  const leadershipRoles = getLeadershipRoles();
  const totalYears = getTotalYearsInvolvement();
  const organizationCount = new Set(communityData.map(inv => inv.organization)).size;
  
  return {
    totalInvolvements: communityData.length,
    impactAreas: themes,
    leadershipPositions: leadershipRoles.length,
    yearsOfService: totalYears,
    organizationsServed: organizationCount,
    geographicReach: [...new Set(communityData.map(inv => inv.location))],
    consistentCommitment: totalYears >= 3, // Indicates sustained engagement
    leadershipProgression: leadershipRoles.length > 0 // Shows advancement to leadership roles
  };
};

/**
 * Default export for components that need the complete community involvement array
 * Most components should import the named export for clarity and intentionality
 */
export default communityData;

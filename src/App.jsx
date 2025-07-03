/**
 * Main application component that sets up the core structure and providers
 * for the Walter Magill portfolio website.
 * 
 * This component establishes the theme context and layout structure,
 * serving as the single page application's root component.
 * 
 * @author Walter Magill
 */

import { ThemeProvider } from './context/ThemeProvider';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import './styles/globals.css';

/**
 * Root App component that wraps the entire application
 * 
 * Provides theme context to all child components and establishes
 * the main layout structure. Uses a single-page design with
 * all content rendered through the Home component.
 * 
 * @returns {JSX.Element} The complete application structure
 */
function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

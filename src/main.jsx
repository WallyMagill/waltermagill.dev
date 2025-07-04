/**
 * Application entry point with React 18 root configuration
 * 
 * Modern React application bootstrap utilizing React 18's new root API
 * for optimal performance, concurrent features, and development tooling
 * integration. Demonstrates production-ready setup patterns for
 * professional web applications.
 * 
 * Features React 18 root API, StrictMode integration, CSS-in-JS readiness,
 * and performance optimization through concurrent rendering capabilities.
 * 
 * @author Walter Magill
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';

// React 18 root creation with StrictMode for development safety and performance insights
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

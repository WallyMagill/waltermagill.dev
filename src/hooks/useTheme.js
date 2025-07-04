/**
 * Custom theme hook with type-safe context access
 * 
 * Provides type-safe access to theme context with comprehensive error handling
 * and developer experience optimizations. Includes context validation and
 * descriptive error messages for proper debugging.
 * 
 * Demonstrates advanced React patterns including custom hook design,
 * error boundaries, and context consumer abstraction.
 * 
 * @author Walter Magill
 */

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Context validation with descriptive error for debugging
  // Prevents runtime errors and provides clear developer guidance
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

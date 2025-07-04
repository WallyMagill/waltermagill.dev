/**
 * Theme context definition for global theme state management
 * 
 * Creates a centralized React context for managing dark/light theme state
 * across the entire application. Follows React Context patterns for
 * prop drilling avoidance and consistent theme management.
 * 
 * Provides foundation for theme provider/consumer pattern with TypeScript
 * integration support and performance-optimized context usage.
 * 
 * @author Walter Magill
 */

import { createContext } from 'react';

export const ThemeContext = createContext();

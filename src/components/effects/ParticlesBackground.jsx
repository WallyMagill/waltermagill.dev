/**
 * Custom particle system with mouse interaction physics
 * 
 * Built from scratch using Canvas API and requestAnimationFrame for optimal performance.
 * Developed with assistance from AI tools for physics calculations and optimization.
 * Inspired by particle systems like particles.js (https://github.com/VincentGarreau/particles.js/)
 * 
 * @author Walter Magill
 */

import { useRef, useEffect } from 'react';

/**
 * Default configuration values for particle system
 * Centralized for easy tweaking and maintenance
 */
const DEFAULT_CONFIG = {
  PARTICLE_DENSITY: 8000,
  PARTICLE_SIZE: { min: 1.2, max: 3.7 },
  VELOCITY: { min: -0.6, max: 0.6 },
  REPELLING_RADIUS: 150,
  REPELLING_STRENGTH: 0.02,
  CONNECTION_DISTANCE: 100,
  OPACITY: { light: 45, dark: 35 },
  VELOCITY_DAMPING: 0.995,
  BOUNCE_ENERGY_LOSS: 0.8,
  MOUSE_CONNECTION_THRESHOLD: { min: 50, max: 120 }
};

/**
 * Custom particle system background with mouse interaction
 * 
 * Creates an animated particle field that responds to mouse movement with
 * physics-based repelling effects. Particles move autonomously and form
 * dynamic connections based on proximity. Optimized for performance across
 * different screen sizes and devices.
 * 
 * Features:
 * - Physics-based particle movement with velocity and acceleration
 * - Mouse repelling forces with realistic falloff
 * - Dynamic particle connections based on distance
 * - Theme-aware color adaptation
 * - Responsive particle density
 * - Edge collision with energy loss simulation
 * 
 * @param {Object} props - Component configuration
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.particleDensity - Pixels per particle (lower = more dense)
 * @param {Object} props.particleSize - Min/max particle radius
 * @param {Object} props.velocity - Min/max initial velocity range
 * @param {number} props.repellingRadius - Mouse interaction distance
 * @param {number} props.repellingStrength - Force multiplier for mouse repelling
 * @param {number} props.connectionDistance - Max distance for particle connections
 * @param {Object} props.opacity - Theme-based opacity settings
 * @param {Object} props.colors - Color scheme for particles and connections
 * @returns {JSX.Element} Canvas element with particle animation
 */
const ParticlesBackground = ({ 
  className = "",
  particleDensity = DEFAULT_CONFIG.PARTICLE_DENSITY,
  particleSize = DEFAULT_CONFIG.PARTICLE_SIZE,
  velocity = DEFAULT_CONFIG.VELOCITY,
  repellingRadius = DEFAULT_CONFIG.REPELLING_RADIUS,
  repellingStrength = DEFAULT_CONFIG.REPELLING_STRENGTH,
  connectionDistance = DEFAULT_CONFIG.CONNECTION_DISTANCE,
  opacity = DEFAULT_CONFIG.OPACITY,
  colors = {
    light: { particle: '#2563eb', connection: '#3b82f6', glow: '#60a5fa' },
    dark: { particle: '#60a5fa', connection: '#60a5fa', glow: '#93c5fd' }
  }
}) => {
  // Refs for persistent state across renders
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  /**
   * Main particle system setup and animation loop
   * Handles canvas sizing, particle creation, and frame-by-frame updates
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('Canvas element not available for particle system');
      return;
    }

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    /**
     * Adjusts canvas size to match window dimensions
     * Maintains pixel-perfect rendering by setting both CSS and canvas dimensions
     */
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    /**
     * Initializes particle array with random positions and velocities
     * Particle count is adaptive based on screen size for consistent performance
     */
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / particleDensity);
      particles.length = 0; // Clear existing particles
      
      for (let i = 0; i < particleCount; i++) {
        // Generate random velocity within specified range
        const vx = velocity.min + Math.random() * (velocity.max - velocity.min);
        const vy = velocity.min + Math.random() * (velocity.max - velocity.min);
        
        const particle = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: vx * 2, // Increased for more noticeable movement
          vy: vy * 2,
          size: particleSize.min + Math.random() * (particleSize.max - particleSize.min),
          baseVx: vx * 2, // Store original velocity for physics calculations
          baseVy: vy * 2,
        };
        
        particles.push(particle);
      }
    };

    /**
     * Updates mouse position for interaction calculations
     * Uses global coordinates relative to viewport
     */
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    /**
     * Main animation loop using requestAnimationFrame
     * Handles particle physics, rendering, and mouse interactions
     */
    const animate = () => {
      // Clear previous frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      
      // Update each particle's position and handle interactions
      particles.forEach((particle, i) => {
        // Apply autonomous movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Handle edge collisions with realistic energy loss
        if (particle.x <= 0) {
          particle.x = 0;
          particle.vx = Math.abs(particle.vx) * DEFAULT_CONFIG.BOUNCE_ENERGY_LOSS;
        }
        if (particle.x >= canvas.width) {
          particle.x = canvas.width;
          particle.vx = -Math.abs(particle.vx) * DEFAULT_CONFIG.BOUNCE_ENERGY_LOSS;
        }
        if (particle.y <= 0) {
          particle.y = 0;
          particle.vy = Math.abs(particle.vy) * DEFAULT_CONFIG.BOUNCE_ENERGY_LOSS;
        }
        if (particle.y >= canvas.height) {
          particle.y = canvas.height;
          particle.vy = -Math.abs(particle.vy) * DEFAULT_CONFIG.BOUNCE_ENERGY_LOSS;
        }

        // Calculate mouse interaction forces
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply repelling force when mouse is nearby
        if (distance < repellingRadius) {
          const force = (repellingRadius - distance) / repellingRadius;
          
          // Push particles away from mouse position
          particle.x -= dx * force * repellingStrength;
          particle.y -= dy * force * repellingStrength;
          
          // Add velocity in repelling direction for continued movement
          particle.vx -= dx * force * 0.001;
          particle.vy -= dy * force * 0.001;
        }

        // Apply velocity damping to prevent runaway acceleration
        particle.vx *= DEFAULT_CONFIG.VELOCITY_DAMPING;
        particle.vy *= DEFAULT_CONFIG.VELOCITY_DAMPING;

        // Calculate dynamic opacity based on mouse proximity
        const baseOpacity = 0.4;
        const proximityBoost = distance < repellingRadius 
          ? (repellingRadius - distance) / repellingRadius * 0.4 
          : 0;
        const finalOpacity = baseOpacity + proximityBoost;

        // Render particle with dynamic opacity
        ctx.globalAlpha = finalOpacity;
        const isDark = document.documentElement.classList.contains('dark');
        const currentColors = isDark ? colors.dark : colors.light;
        ctx.fillStyle = currentColors.particle;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow effect for particles very close to mouse
        if (distance < 80) {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = currentColors.glow;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw connections between nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const connectionDist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (connectionDist < connectionDistance) {
            const connectionOpacity = (connectionDistance - connectionDist) / connectionDistance;
            ctx.globalAlpha = connectionOpacity * 0.3;
            ctx.strokeStyle = currentColors.connection;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        // Draw special mouse-to-particle connections during active repelling
        const { min: minThreshold, max: maxThreshold } = DEFAULT_CONFIG.MOUSE_CONNECTION_THRESHOLD;
        if (distance < maxThreshold && distance > minThreshold) {
          ctx.globalAlpha = (maxThreshold - distance) / maxThreshold * 0.3;
          ctx.strokeStyle = currentColors.glow;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      });

      // Schedule next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize system
    resizeCanvas();
    createParticles();

    // Set up event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation loop
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleDensity, particleSize, velocity, repellingRadius, repellingStrength, connectionDistance, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none opacity-${opacity.light} dark:opacity-${opacity.dark} ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;

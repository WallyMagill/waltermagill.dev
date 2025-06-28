import { useRef, useEffect } from 'react';

const ParticlesBackground = ({ 
  className = "",
  particleDensity = 8000,
  particleSize = { min: 1.2, max: 3.7 },
  velocity = { min: -0.6, max: 0.6 },
  repellingRadius = 150,
  repellingStrength = 0.02,
  connectionDistance = 100,
  opacity = { light: 45, dark: 35 },
  colors = {
    light: { particle: '#2563eb', connection: '#3b82f6', glow: '#60a5fa' },
    dark: { particle: '#60a5fa', connection: '#60a5fa', glow: '#93c5fd' }
  }
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / particleDensity);
      particles.length = 0;
      
      for (let i = 0; i < particleCount; i++) {
        const vx = velocity.min + Math.random() * (velocity.max - velocity.min);
        const vy = velocity.min + Math.random() * (velocity.max - velocity.min);
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: vx * 2, // Increased autonomous movement
          vy: vy * 2,
          size: particleSize.min + Math.random() * (particleSize.max - particleSize.min),
          baseVx: vx * 2,
          baseVy: vy * 2,
        });
      }
      
      // Set base velocities
      particles.forEach(particle => {
        particle.baseVx = particle.vx;
        particle.baseVy = particle.vy;
      });
    };
    createParticles();

    // Mouse movement handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Natural autonomous movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with some energy loss
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx = Math.abs(particle.vx) * 0.8;
        }
        if (particle.x > canvas.width) {
          particle.x = canvas.width;
          particle.vx = -Math.abs(particle.vx) * 0.8;
        }
        if (particle.y < 0) {
          particle.y = 0;
          particle.vy = Math.abs(particle.vy) * 0.8;
        }
        if (particle.y > canvas.height) {
          particle.y = canvas.height;
          particle.vy = -Math.abs(particle.vy) * 0.8;
        }

        // Mouse repelling effect (original behavior)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Repelling radius
          const force = (150 - distance) / 150;
          const repelStrength = 0.02;
          
          // Push particles away from mouse
          particle.x -= dx * force * repelStrength;
          particle.y -= dy * force * repelStrength;
          
          // Add velocity in the repelling direction
          particle.vx -= dx * force * 0.001;
          particle.vy -= dy * force * 0.001;
        }

        // Gentle velocity damping to prevent runaway particles
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        // Calculate particle opacity
        const baseOpacity = 0.4;
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - particle.x, 2) + 
          Math.pow(mouseRef.current.y - particle.y, 2)
        );
        const proximityBoost = mouseDistance < 150 ? (150 - mouseDistance) / 150 * 0.4 : 0;
        const finalOpacity = baseOpacity + proximityBoost;

        // Draw particle
        ctx.globalAlpha = finalOpacity;
        const isDark = document.documentElement.classList.contains('dark');
        const currentColors = isDark ? colors.dark : colors.light;
        ctx.fillStyle = currentColors.particle;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for particles very close to mouse
        if (mouseDistance < 80) {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = currentColors.glow;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw connections between particles
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

        // Special mouse-to-particle connections when particles are being repelled
        if (mouseDistance < 120 && mouseDistance > 50) { // Only show connections when actively repelling
          ctx.globalAlpha = (120 - mouseDistance) / 120 * 0.3; // Reduced opacity for repelling effect
          ctx.strokeStyle = currentColors.glow;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

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
    />
  );
};

export default ParticlesBackground;

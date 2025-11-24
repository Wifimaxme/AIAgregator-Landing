import React, { useRef, useEffect } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouseX = -1000;
    let mouseY = -1000;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Magnetism variables
    let hoveredElement: HTMLElement | null = null;
    let magnetBounds: DOMRect | null = null;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Coordinates are relative to viewport
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Track hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Define what counts as interactive: buttons, links, inputs, and elements with role="button"
      const interactiveEl = target.closest('button, a, input, [role="button"], .group');
      if (interactiveEl) {
        hoveredElement = interactiveEl as HTMLElement;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
       // Only clear if we are leaving the currently tracked element
       // This prevents clearing if we move from a parent button to a child span
       const target = e.target as HTMLElement;
       const interactiveEl = target.closest('button, a, input, [role="button"], .group');
       if (interactiveEl && interactiveEl === hoveredElement) {
         // Check if we moved to a child of the same element
         if (e.relatedTarget && hoveredElement.contains(e.relatedTarget as Node)) {
             return;
         }
         hoveredElement = null;
         magnetBounds = null;
       }
    };

    class Particle {
      x: number;
      y: number;
      baseSize: number;
      size: number;
      speedX: number;
      speedY: number;
      density: number;
      color: string;
      angle: number; // For orbital movement

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseSize = Math.random() * 2 + 0.5;
        this.size = this.baseSize;
        
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        this.density = (Math.random() * 30) + 1;
        this.angle = Math.random() * 360;
        
        // Colors updated to Purple/Violet spectrum to match new brand
        const colors = ['rgba(139, 92, 246, 0.5)', 'rgba(196, 181, 253, 0.3)', 'rgba(255, 255, 255, 0.2)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const currentScrollY = window.scrollY;
        const isHeroSection = currentScrollY < height * 0.8;

        // 0. React to Scroll (Parallax & Warp)
        // Move particles up/down based on scroll speed
        this.y -= scrollVelocity * 0.2 * this.density * 0.1;

        // 1. Autonomous Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // 2. Interaction Logic (Magnetism vs Standard Mouse)
        
        let processedInteraction = false;

        // --- MAGNETISM LOGIC ---
        if (magnetBounds) {
          const centerX = magnetBounds.left + magnetBounds.width / 2;
          const centerY = magnetBounds.top + magnetBounds.height / 2;
          
          // Significantly reduced radius: just around the element plus a small buffer
          // Using 'min' ensures we don't grab from too far on long buttons
          const elementRadius = Math.max(magnetBounds.width, magnetBounds.height) / 2;
          const influenceRadius = elementRadius + 30; // Small buffer

          const dx = centerX - this.x;
          const dy = centerY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < influenceRadius) {
            processedInteraction = true;
            
            // Check if particle is roughly "inside" the element's area
            // We use a slightly smaller radius than the visual bounds to let them flow through
            const isInside = distance < elementRadius * 0.8;

            if (!isInside) {
                // PARTICLE IS NEAR BUT OUTSIDE:
                // Gentle pull towards the vicinity (contours)
                
                const force = (influenceRadius - distance) / influenceRadius;
                
                // Very gentle attraction strength
                const attractionStrength = 0.035; 
                this.x += dx * force * attractionStrength;
                this.y += dy * force * attractionStrength;
            } else {
                // PARTICLE IS INSIDE:
                // Do NOT trap it. Apply almost zero force, allowing its natural speedX/speedY
                // to carry it through the element. This prevents "floundering".
                // Just a tiny guide force to keep it from flying away instantly.
                this.x += dx * 0.002;
                this.y += dy * 0.002;
            }
          }
        }

        // --- STANDARD MOUSE LOGIC (If not captured by magnet) ---
        if (!processedInteraction) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (isHeroSection) {
              // --- HERO MODE: REPULSION ---
              const maxDistance = 150;
              if (distance < maxDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (maxDistance - distance) / maxDistance;
                
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;
                
                this.x -= directionX;
                this.y -= directionY;
              }
            } else {
              // --- CONTENT MODE: ATTRACTION & ORBIT ---
              const attractionRange = 300;
              
              if (distance < attractionRange && distance > 5) { 
                 // Subtle attraction
                 const force = (attractionRange - distance) / attractionRange;
                 
                 // Move towards mouse
                 this.x += (dx / distance) * force * 2; 
                 this.y += (dy / distance) * force * 2;

                 // Orbit effect
                 this.x += -(dy / distance) * force * 1.5;
                 this.y += (dx / distance) * force * 1.5;
              }
            }
        }

        // 3. Boundary Wrap-around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (width * height) / 12000; 
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Calculate scroll velocity
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Update magnet position if element exists
      // We do this every frame because scrolling changes the element's position on screen
      if (hoveredElement) {
         magnetBounds = hoveredElement.getBoundingClientRect();
      }

      // Draw connections
      const isHeroSection = currentScrollY < height * 0.8;
      
      for(let a = 0; a < particles.length; a++) {
        for(let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const connectDistance = isHeroSection ? 100 : 120; 

          if(distance < connectDistance) {
            const opacity = 1 - (distance / connectDistance);
            // Updated to Violet RGB for connections
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.draw();
        particle.update();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }} 
    />
  );
};
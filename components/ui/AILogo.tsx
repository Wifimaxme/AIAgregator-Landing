import React from 'react';
import { motion } from 'framer-motion';

interface AILogoProps {
  className?: string;
}

export const AILogo: React.FC<AILogoProps> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Core Glow - More intense pulse with gradient matching 'Best Seller' badge */}
      <motion.div 
        className="absolute inset-[-20%] bg-gradient-to-r from-brand-500 to-accent-600 blur-xl rounded-full opacity-40"
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="ai-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" /> {/* brand-400 */}
            <stop offset="100%" stopColor="#a78bfa" /> {/* accent-400 */}
          </linearGradient>
        </defs>

        {/* Central Core - Nervous heartbeat */}
        <motion.circle
          cx="12" cy="12" r="2"
          fill="url(#ai-core-gradient)"
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.8, 1, 0.8] 
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner Ring - Turquoise - Fast & Erratic */}
        {/* We animate scale and rotate with different durations to create interference patterns */}
        <motion.g
          animate={{ 
            rotate: 360,
            scale: [0.9, 1.1, 0.9] 
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: "12px", originY: "12px" }}
        >
            <circle cx="12" cy="6" r="1.2" fill="#2dd4bf" />
            <circle cx="18" cy="12" r="1" fill="#2dd4bf" />
            <circle cx="12" cy="18" r="1.2" fill="#2dd4bf" />
            <circle cx="6" cy="12" r="1" fill="#2dd4bf" />
            
            {/* Smaller connecting particles */}
            <circle cx="16.2" cy="7.8" r="0.6" fill="#5eead4" opacity="0.6" />
            <circle cx="16.2" cy="16.2" r="0.6" fill="#5eead4" opacity="0.6" />
            <circle cx="7.8" cy="16.2" r="0.6" fill="#5eead4" opacity="0.6" />
            <circle cx="7.8" cy="7.8" r="0.6" fill="#5eead4" opacity="0.6" />
        </motion.g>

        {/* Middle Ring - Violet - Counter-Rotate & Breathing */}
        <motion.g
          animate={{ 
            rotate: -360,
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: "12px", originY: "12px" }}
        >
           <circle cx="12" cy="3" r="1" fill="#a78bfa" />
           <circle cx="20.6" cy="9.2" r="0.8" fill="#a78bfa" />
           <circle cx="17.3" cy="19.3" r="1" fill="#a78bfa" />
           <circle cx="6.7" cy="19.3" r="0.8" fill="#a78bfa" />
           <circle cx="3.4" cy="9.2" r="1" fill="#a78bfa" />

           {/* Twinkling particles in this ring */}
           <motion.circle 
             cx="17.3" cy="4.7" r="0.6" fill="#c4b5fd" 
             animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} 
           />
           <motion.circle 
             cx="20.6" cy="14.8" r="0.6" fill="#c4b5fd" 
             animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 3, repeat: Infinity }}
           />
           <circle cx="12" cy="21" r="0.6" fill="#c4b5fd" opacity="0.7" />
           <circle cx="3.4" cy="14.8" r="0.6" fill="#c4b5fd" opacity="0.7" />
           <circle cx="6.7" cy="4.7" r="0.6" fill="#c4b5fd" opacity="0.7" />
        </motion.g>

         {/* Outer Dust - Slow Drift & Shimmer */}
         <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ originX: "12px", originY: "12px" }}
        >
            <motion.circle cx="12" cy="1" r="0.5" fill="white" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
            <circle cx="19.8" cy="4.2" r="0.4" fill="white" opacity="0.3" />
            <motion.circle cx="23" cy="12" r="0.5" fill="white" animate={{ opacity: [0.8, 0.2, 0.8] }} transition={{ duration: 5, repeat: Infinity }} />
            <circle cx="19.8" cy="19.8" r="0.4" fill="white" opacity="0.3" />
            <circle cx="12" cy="23" r="0.5" fill="white" opacity="0.5" />
            <circle cx="4.2" cy="19.8" r="0.4" fill="white" opacity="0.3" />
            <motion.circle cx="1" cy="12" r="0.5" fill="white" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
            <circle cx="4.2" cy="4.2" r="0.4" fill="white" opacity="0.3" />
        </motion.g>
      </svg>
    </div>
  );
};
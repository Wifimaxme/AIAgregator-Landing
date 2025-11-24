import React from 'react';
import { motion } from 'framer-motion';

interface AILogoProps {
  className?: string;
}

export const AILogo: React.FC<AILogoProps> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Core Glow - Slow pulsing gradient */}
      <motion.div 
        className="absolute inset-[-20%] bg-gradient-to-r from-brand-500 to-accent-600 blur-xl rounded-full opacity-40"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="ai-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* Swapped colors: Start with Purple (Brand), End with Teal (Accent) */}
            <stop offset="0%" stopColor="#8b5cf6" /> {/* brand-500 (Purple) */}
            <stop offset="100%" stopColor="#14b8a6" /> {/* accent-500 (Teal) */}
          </linearGradient>
        </defs>

        {/* Central Core - Gentle heartbeat */}
        <motion.circle
          cx="12" cy="12" r="2"
          fill="url(#ai-core-gradient)"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.8, 1, 0.8] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner Ring - Purple (Primary) - Slow Rotation */}
        <motion.g
          animate={{ 
            rotate: 360,
            scale: [0.95, 1.05, 0.95] 
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: "12px", originY: "12px" }}
        >
            {/* Color updated to Purple #8b5cf6 */}
            <circle cx="12" cy="6" r="1.2" fill="#8b5cf6" />
            <circle cx="18" cy="12" r="1" fill="#8b5cf6" />
            <circle cx="12" cy="18" r="1.2" fill="#8b5cf6" />
            <circle cx="6" cy="12" r="1" fill="#8b5cf6" />
            
            {/* Smaller connecting particles - Lighter Purple #c4b5fd */}
            <circle cx="16.2" cy="7.8" r="0.6" fill="#c4b5fd" opacity="0.6" />
            <circle cx="16.2" cy="16.2" r="0.6" fill="#c4b5fd" opacity="0.6" />
            <circle cx="7.8" cy="16.2" r="0.6" fill="#c4b5fd" opacity="0.6" />
            <circle cx="7.8" cy="7.8" r="0.6" fill="#c4b5fd" opacity="0.6" />
        </motion.g>

        {/* Middle Ring - Teal (Secondary) - Slow Counter-Rotate & Breathing */}
        <motion.g
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: "12px", originY: "12px" }}
        >
           {/* Color updated to Teal #2dd4bf (Accent-400 equivalent) */}
           <circle cx="12" cy="3" r="1" fill="#2dd4bf" />
           <circle cx="20.6" cy="9.2" r="0.8" fill="#2dd4bf" />
           <circle cx="17.3" cy="19.3" r="1" fill="#2dd4bf" />
           <circle cx="6.7" cy="19.3" r="0.8" fill="#2dd4bf" />
           <circle cx="3.4" cy="9.2" r="1" fill="#2dd4bf" />

           {/* Twinkling particles in this ring - Light Teal #5eead4 */}
           <motion.circle 
             cx="17.3" cy="4.7" r="0.6" fill="#5eead4" 
             animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} 
           />
           <motion.circle 
             cx="20.6" cy="14.8" r="0.6" fill="#5eead4" 
             animate={{ opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 4, repeat: Infinity }}
           />
           <circle cx="12" cy="21" r="0.6" fill="#5eead4" opacity="0.7" />
           <circle cx="3.4" cy="14.8" r="0.6" fill="#5eead4" opacity="0.7" />
           <circle cx="6.7" cy="4.7" r="0.6" fill="#5eead4" opacity="0.7" />
        </motion.g>

         {/* Outer Dust - Very Slow Drift */}
         <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "12px", originY: "12px" }}
        >
            <motion.circle cx="12" cy="1" r="0.5" fill="white" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5, repeat: Infinity }} />
            <circle cx="19.8" cy="4.2" r="0.4" fill="white" opacity="0.3" />
            <motion.circle cx="23" cy="12" r="0.5" fill="white" animate={{ opacity: [0.6, 0.2, 0.6] }} transition={{ duration: 6, repeat: Infinity }} />
            <circle cx="19.8" cy="19.8" r="0.4" fill="white" opacity="0.3" />
            <circle cx="12" cy="23" r="0.5" fill="white" opacity="0.5" />
            <circle cx="4.2" cy="19.8" r="0.4" fill="white" opacity="0.3" />
            <motion.circle cx="1" cy="12" r="0.5" fill="white" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
            <circle cx="4.2" cy="4.2" r="0.4" fill="white" opacity="0.3" />
        </motion.g>
      </svg>
    </div>
  );
};
// src/app/components/SessionLoader.js
'use client';

import { motion, useReducedMotion } from 'framer-motion';

const SessionLoader = () => {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: prefersReducedMotion ? 1 : [1, 1.5, 1],
      opacity: prefersReducedMotion ? 0.3 : [0.3, 0.5, 0.3],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  const particleVariants = (delay) => ({
    animate: {
      rotate: prefersReducedMotion ? 0 : 360,
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'linear',
        delay,
      },
    },
  });

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  const text = 'Loading Drishya Dashboard...'.split('');

  return (
<div className="fixed inset-0 flex items-center justify-center bg-teal-900/70 z-50 font-inter">
      {/* Background Wave Effect */}
      <div className="absolute inset-0 bg-[url('/wave-pattern.png')] opacity-10 animate-wave" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center relative z-10"
        role="status"
        aria-label="Loading Drishya Dashboard"
      >
        {/* Glowing Pulse */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-32 h-32 rounded-full bg-teal-500 opacity-30" />
        </motion.div>

        {/* Custom SVG Spinner */}
        <div className="relative w-24 h-24">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#0d9488"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="141.37 141.37"
              animate={{
                rotate: prefersReducedMotion ? 0 : 360,
                transition: { repeat: Infinity, duration: 2, ease: 'linear' },
              }}
            />
            {/* Inner Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              stroke="#14b8a6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="5 10"
              animate={{
                rotate: prefersReducedMotion ? 0 : -360,
                transition: { repeat: Infinity, duration: 1.5, ease: 'linear' },
              }}
            />
          </svg>

          {/* Orbiting Particles */}
          {[
            { size: 'w-3 h-3', delay: 0 },
            { size: 'w-2 h-2', delay: 0.5 },
            { size: 'w-2.5 h-2.5', delay: 1 },
          ].map((particle, index) => (
            <motion.div
              key={index}
              variants={particleVariants(particle.delay)}
              animate="animate"
              className={`absolute top-0 left-1/2 ${particle.size} bg-teal-300 rounded-full transform -translate-x-1/2`}
              style={{ transformOrigin: '50px 50px' }}
            />
          ))}
        </div>

        {/* Animated Text */}
        <div className="mt-6 flex justify-center space-x-0.5 flex-wrap">
          {text.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="text-teal-200 text-lg font-medium"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SessionLoader;

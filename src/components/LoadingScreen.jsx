import React from 'react';
import { motion } from 'framer-motion';
import siesLogo from '../assets/siesLogo.webp';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden">

      {/* Central Logo Container */}
      <div className="relative flex items-center justify-center">

        {/* Pulsing Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-40 h-40 bg-[var(--color-accent)] rounded-full blur-[80px]"
        />

        {/* Breathing Logo */}
        <motion.img
          src={siesLogo}
          alt="IEEE SIES GST Loading"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-28 h-28 md:w-32 md:h-32 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        />

        {/* Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-48 h-48 rounded-full border border-white/5 border-t-[var(--color-accent-light)]"
        />
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 flex flex-col items-center"
      >
        <span className="font-tech text-lg sm:text-xl tracking-[0.25em] text-white font-bold">IEEE SIES GST</span>
        <span className="text-[var(--color-text-secondary)] text-xs tracking-widest mt-1.5 animate-pulse">
          INITIALIZING
        </span>

        {/* Progress Bar */}
        <motion.div
          className="w-48 h-[2px] bg-white/10 mt-5 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full bg-[var(--color-accent-light)]"
          />
        </motion.div>
      </motion.div>

    </div>
  );
}

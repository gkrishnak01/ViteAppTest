
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="py-6 mb-12 bg-background text-center z-30 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-4"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center space-x-4"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <i className="fas fa-rocket text-primary/50"></i>
          </motion.div>
          <motion.div
            animate={{ 
              rotate: [0, -360]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <i className="fas fa-atom text-secondary/50"></i>
          </motion.div>
          <p className="text-foreground/70 text-sm px-3">
            © 2025 Copyright Arjith Anilkumar Viji — Materials Alchemist & Aerospace Dreamer
          </p>
          <motion.div
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <i className="fas fa-flask text-accent/50"></i>
          </motion.div>
          <motion.div
            animate={{ 
              rotate: [0, -360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <i className="fas fa-globe text-primary/50"></i>
          </motion.div>
        </motion.div>
        
        {mounted && (
          <p className="text-foreground/50 text-xs mt-4">
            Currently viewing in {theme === 'dark' ? 'Dark' : 'Light'} Mode
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;

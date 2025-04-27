
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 mb-16 bg-background text-center z-30 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-8"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-4"
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
      </div>
    </footer>
  );
};

export default Footer;

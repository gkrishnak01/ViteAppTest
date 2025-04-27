
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 bg-background text-center z-30 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex items-center justify-center space-x-2"
      >
        <i className="fas fa-rocket text-primary/50"></i>
        <i className="fas fa-atom text-secondary/50"></i>
        <p className="text-foreground/70 text-sm px-3">
          © 2025 Copyright Arjith Anilkumar Viji — Materials Alchemist & Aerospace Dreamer
        </p>
        <i className="fas fa-flask text-accent/50"></i>
        <i className="fas fa-satellite text-primary/50"></i>
      </motion.div>
    </footer>
  );
};

export default Footer;

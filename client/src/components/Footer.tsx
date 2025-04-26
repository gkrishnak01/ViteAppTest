import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 bg-background text-center z-30 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <p className="text-foreground/70 text-sm">
          Made with <span className="text-red-500">❤</span> by Arjith A V &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
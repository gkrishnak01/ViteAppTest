import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-background py-10 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="font-orbitron text-2xl font-bold text-foreground">
              ARJITHA <span className="text-primary">V</span>
            </h2>
            <p className="text-foreground/50 text-sm mt-2">
              Engineering Tomorrow's Materials, Today
            </p>
          </div>
          
          <div className="flex space-x-6">
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="https://linkedin.com/in/" 
              className="text-foreground/50 hover:text-primary transition-colors duration-300"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="mailto:arjithav2911@gmail.com" 
              className="text-foreground/50 hover:text-primary transition-colors duration-300"
            >
              <i className="fas fa-envelope text-xl"></i>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="tel:+447553689777" 
              className="text-foreground/50 hover:text-primary transition-colors duration-300"
            >
              <i className="fas fa-phone text-xl"></i>
            </motion.a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary/10 text-center">
          <p className="text-foreground/40 text-sm">
            Made with <i className="fas fa-heart text-secondary"></i> by Arjitha V &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { initThreeScene } from '@/lib/ThreeScene';
import profilePhoto from '../assets/profile-photo.jpg';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanupFn = initThreeScene(canvasRef.current);
      return () => cleanupFn(); // Cleanup on unmount
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/90 z-10"></div>
      
      <div className="container mx-auto px-6 z-20 text-center md:text-left">
        <div className="md:max-w-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-40 h-40 rounded-full overflow-hidden shadow-lg shadow-primary/30 border-2 border-primary mb-4 md:mb-0 flex-shrink-0"
          >
            <img src={profilePhoto} alt="Arjith A V" className="w-full h-full object-cover" />
          </motion.div>

          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
            >
              <p className="font-poppins text-sm tracking-wider">Engineering Tomorrow's Materials, Today</p>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-orbitron text-4xl md:text-6xl font-bold text-foreground mb-4"
            >
              ARJITH <span className="text-primary">A V</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-inter text-lg md:text-2xl text-foreground/80 mb-8"
            >
              <span className="text-secondary">Aerospace Engineer</span> | 
              <span className="text-primary"> Material Specialist</span> | 
              <span className="text-accent"> Sustainable Innovator</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-foreground/70 max-w-lg mb-8"
            >
              Pioneering sustainable materials for the aerospace industry with a focus on 
              composite structures, circular economy principles, and breakthrough innovation.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            >
              <a 
                href="#about" 
                className="px-8 py-3 bg-primary hover:bg-primary/80 text-foreground font-medium rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-primary/20 flex items-center justify-center"
              >
                <span>View Portfolio</span>
                <i className="fas fa-arrow-down ml-2 animate-bounce-slow"></i>
              </a>
              
              <a 
                href="#contact" 
                className="px-8 py-3 bg-transparent border border-secondary text-secondary hover:bg-secondary/10 font-medium rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
      >
        <a href="#about" className="text-foreground/50 hover:text-foreground transition-colors duration-300">
          <i className="fas fa-chevron-down text-xl"></i>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const rocketRef = useRef<HTMLDivElement>(null);

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle rocket animation on scroll
  const handleScroll = () => {
    if (!rocketRef.current || !sectionRef.current) return;
    
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.clientHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
      const scrollPercentage = (scrollPosition - sectionTop) / sectionHeight;
      const translateY = scrollPercentage * sectionHeight * 0.8;
      
      rocketRef.current.style.transform = `translateX(-50%) translateY(${translateY}px)`;
    }
  };

  // Add scroll event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="min-h-screen bg-background py-20 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="inline-block text-3xl md:text-4xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary/30 md:transform md:-translate-x-1/2"></div>
          
          {/* Animated Rocket */}
          <div 
            ref={rocketRef}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-12"
          >
            <i className="fas fa-rocket text-2xl text-secondary"></i>
          </div>
          
          {/* Experience: Atomix Materials */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-20 md:ml-auto md:w-1/2 md:pr-12 md:pl-0 pl-10"
          >
            <div className="absolute top-0 left-0 md:left-auto md:right-full md:mr-6 w-8 h-8 rounded-full bg-background border-4 border-secondary flex items-center justify-center">
              <i className="fas fa-flask text-secondary"></i>
            </div>
            
            <div className="bg-background/30 backdrop-blur-sm p-6 rounded-lg border border-secondary/30 shadow-lg shadow-secondary/5 transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-orbitron text-xl font-semibold text-secondary">Atomix Materials</h3>
                <span className="text-xs text-foreground/60 font-medium px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">Apr 2023 - Dec 2023</span>
              </div>
              
              <h4 className="font-poppins text-lg font-medium text-foreground mb-4">Co-Founder | Coimbatore, India</h4>
              
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-secondary mt-1.5 mr-2"></i>
                  <span>Spearheaded a startup focused on sustainable advanced materials for industrial applications.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-secondary mt-1.5 mr-2"></i>
                  <span>Directed product development and technology roadmaps for high-performance composites, projecting 7x market growth in niche sectors.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-secondary mt-1.5 mr-2"></i>
                  <span>Secured pilot funding by designing investor-ready business models and advocating for circular economy principles.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-secondary mt-1.5 mr-2"></i>
                  <span>Streamlined supply chain partnerships and prototype validation for low-carbon materials.</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Experience: Brahmàstra Aerospace */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative md:mr-auto md:w-1/2 md:pl-12 md:pr-0 pl-10"
          >
            <div className="absolute top-0 left-0 md:left-auto md:right-0 md:mr-[-16px] w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center">
              <i className="fas fa-rocket text-primary"></i>
            </div>
            
            <div className="bg-background/30 backdrop-blur-sm p-6 rounded-lg border border-primary/30 shadow-lg shadow-primary/5 transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-orbitron text-xl font-semibold text-primary">Brahmàstra Aerospace</h3>
                <span className="text-xs text-foreground/60 font-medium px-3 py-1 rounded-full bg-primary/10 border border-primary/20">Jun 2021 - Jul 2021</span>
              </div>
              
              <h4 className="font-poppins text-lg font-medium text-foreground mb-4">Project Intern | Chennai, India</h4>
              
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-primary mt-1.5 mr-2"></i>
                  <span>Contributed to the design of a 10 kg payload model rocket, optimizing dual-motor configurations (Aerotech G74W vs H125W) to achieve a 12× altitude increase (0.11 km → 1.33 km).</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-primary mt-1.5 mr-2"></i>
                  <span>Conducted CFD simulations for aerodynamic stability and deployment mechanisms.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chevron-right text-primary mt-1.5 mr-2"></i>
                  <span>Collaborated with cross-functional teams to align engineering workflows with mission objectives.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 transform translate-y-[-50%] translate-x-[30%] opacity-5 pointer-events-none">
        <svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
          <path d="M250,470 L250,30" stroke="#3a86ff" strokeWidth="8" strokeLinecap="round" />
          <path d="M230,470 L230,70" stroke="#3a86ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M270,470 L270,70" stroke="#3a86ff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="250" cy="30" r="20" fill="#3a86ff" />
          <path d="M210,90 L250,30 L290,90 Z" fill="#57cc99" />
          <rect x="220" y="90" width="60" height="100" rx="10" fill="#3a86ff" />
          <rect x="235" y="190" width="30" height="280" rx="5" fill="#3a86ff" />
          <path d="M220,390 L200,430 L300,430 L280,390 Z" fill="#57cc99" />
        </svg>
      </div>
    </section>
  );
};

export default ExperienceSection;

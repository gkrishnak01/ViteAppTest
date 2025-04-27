import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import TimelineItem from './TimelineItem';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="about" 
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
            Who Am I?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300 -m-2 rounded-lg"></div>
              <div className="relative bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
                <h3 className="font-poppins text-xl font-semibold mb-4 text-primary">Background</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Passionate postgraduate Aerospace Materials Engineering student at the University of Sheffield, specializing in composites, sustainable materials, and circular economy principles. I've led groundbreaking research in polymer recycling and Titanium reuse to reduce industrial carbon footprints.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300 -m-2 rounded-lg"></div>
              <div className="relative bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-secondary/20">
                <h3 className="font-poppins text-xl font-semibold mb-4 text-secondary">Entrepreneurial Spirit</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Co-founded Atomix Materials, a startup driving the adoption of eco friendly composite solutions in B2B sectors. Led product development initiatives and secured pilot funding through investor-ready business models focused on sustainability.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300 -m-2 rounded-lg"></div>
              <div className="relative bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-accent/20">
                <h3 className="font-poppins text-xl font-semibold mb-4 text-accent">Technical Excellence</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Optimized rocket apogee by 12× through computational analysis and iterative testing. Adept at CFD simulations, market intelligence, and ESG-aligned product development.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.h3 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-orbitron text-2xl font-semibold text-foreground mb-8"
            >
              Education Timeline
            </motion.h3>

            <div className="relative pl-8 space-y-8">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

              {/* University of Sheffield */}
              <TimelineItem 
                delay={0.3}
                color="primary"
                title="University of Sheffield"
                period="MSc, Aerospace Materials | September 2024 – September 2025"
                description="Focus: Sustainable composites, polymer recycling, and Titanium reuse."
                isInView={isInView}
              />

              {/* Amrita Vishwa Vidyapeetham */}
              <TimelineItem 
                delay={0.5}
                color="secondary"
                title="Amrita Vishwa Vidyapeetham"
                period="BTech, Aerospace Engineering | July 2019 – June 2023"
                description="Key coursework: Aerodynamics, composite materials, propulsion systems."
                isInView={isInView}
              />

              {/* Chavara Public School */}
              <TimelineItem 
                delay={0.7}
                color="accent"
                title="Chavara Public School"
                period="Computer Maths | June 2017 – May 2019"
                description="Foundation in computational thinking and mathematics."
                isInView={isInView}
              />
            </div>

            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 space-y-4"
            >
              <h3 className="font-orbitron text-xl font-semibold text-foreground">Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/30 p-3 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary">Malayalam</p>
                  <p className="text-sm text-foreground/60">Native</p>
                </div>
                <div className="bg-background/30 p-3 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary">English</p>
                  <p className="text-sm text-foreground/60">Professional</p>
                </div>
                <div className="bg-background/30 p-3 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary">Hindi</p>
                  <p className="text-sm text-foreground/60">Elementary</p>
                </div>
                <div className="bg-background/30 p-3 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary">Tamil</p>
                  <p className="text-sm text-foreground/60">Limited</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3D Floating Elements */}
        <div className="hidden lg:block">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotateZ: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6
            }}
            className="absolute top-1/3 right-20 opacity-20 pointer-events-none"
          >
            <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M130 10L10 130L130 250L250 130L130 10Z" stroke="url(#paint0_linear)" strokeWidth="2"/>
              <path d="M130 50L50 130L130 210L210 130L130 50Z" stroke="url(#paint1_linear)" strokeWidth="2"/>
              <path d="M130 90L90 130L130 170L170 130L130 90Z" stroke="url(#paint2_linear)" strokeWidth="2"/>
              <defs>
                <linearGradient id="paint0_linear" x1="10" y1="130" x2="250" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a86ff"/>
                  <stop offset="1" stopColor="#57cc99"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="50" y1="130" x2="210" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a86ff"/>
                  <stop offset="1" stopColor="#57cc99"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="90" y1="130" x2="170" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a86ff"/>
                  <stop offset="1" stopColor="#57cc99"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div 
            animate={{ 
              rotate: 360 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "linear"
            }}
            className="absolute bottom-1/4 left-20 opacity-20 pointer-events-none"
          >
            <svg width="190" height="190" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="95" cy="95" r="90" stroke="url(#paint0_linear_globe)" strokeWidth="2"/>
              <ellipse cx="95" cy="95" rx="60" ry="90" stroke="url(#paint1_linear_globe)" strokeWidth="1"/>
              <ellipse cx="95" cy="95" rx="90" ry="60" stroke="url(#paint2_linear_globe)" strokeWidth="1"/>
              <defs>
                <linearGradient id="paint0_linear_globe" x1="5" y1="95" x2="185" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#57cc99"/>
                  <stop offset="1" stopColor="#3a86ff"/>
                </linearGradient>
                <linearGradient id="paint1_linear_globe" x1="35" y1="95" x2="155" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#57cc99"/>
                  <stop offset="1" stopColor="#3a86ff"/>
                </linearGradient>
                <linearGradient id="paint2_linear_globe" x1="5" y1="95" x2="185" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#57cc99"/>
                  <stop offset="1" stopColor="#3a86ff"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
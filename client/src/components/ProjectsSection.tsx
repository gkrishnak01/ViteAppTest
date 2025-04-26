import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FlipCard from './FlipCard';

// Project data
const projects = [
  {
    title: 'Sustainable Composite Development',
    summary: 'Research focused on creating eco-friendly aerospace-grade composite materials.',
    description: 'Developed composite materials with 40% reduced carbon footprint while maintaining aerospace-grade mechanical properties.',
    achievements: [
      'Optimized fiber-resin ratios for minimal environmental impact',
      'Leveraged bio-based resins without performance compromise',
      'Created testing methodology for circular lifecycle assessment'
    ],
    tags: ['Material Science', 'Sustainability', 'Composites'],
    color: 'primary'
  },
  {
    title: 'Rocket Propulsion Optimization',
    summary: 'Computational analysis for optimizing dual-motor rocket configurations.',
    description: 'Achieved 12× altitude improvement through computational analysis and iterative testing of rocket motor configurations.',
    achievements: [
      'Evaluated performance of Aerotech G74W vs H125W motors',
      'Conducted CFD analysis for aerodynamic stability',
      'Optimized payload capacity while maximizing apogee'
    ],
    tags: ['Propulsion', 'CFD', 'Aerodynamics'],
    color: 'secondary'
  },
  {
    title: 'Medical Supply Chain Optimization',
    summary: 'Research on interdisciplinary strategies for efficient supply chain design.',
    description: 'Published research on integrated approaches to optimize medical supply chains through interdisciplinary strategies.',
    achievements: [
      'Developed multi-factor optimization models',
      'Implemented sustainability metrics in supply chain evaluation',
      'Created framework for cross-industry knowledge transfer'
    ],
    tags: ['Supply Chain', 'Healthcare', 'Research'],
    color: 'accent'
  },
  {
    title: 'Titanium Recycling Process',
    summary: 'Development of energy-efficient titanium recycling for aerospace applications.',
    description: 'Researched novel approaches to titanium recycling that maintains aerospace-grade mechanical properties with reduced energy input.',
    achievements: [
      'Reduced energy consumption by 30% compared to traditional methods',
      'Maintained material integrity through optimized processing',
      'Created closed-loop production model for titanium components'
    ],
    tags: ['Materials', 'Recycling', 'Titanium'],
    color: 'primary'
  },
  {
    title: 'Composite Market Intelligence',
    summary: 'Data-driven analysis of composite material market opportunities.',
    description: 'Conducted comprehensive market analysis to identify growth opportunities for sustainable composite materials across industries.',
    achievements: [
      'Identified 7x growth potential in niche industrial sectors',
      'Created predictive models for market penetration',
      'Developed stakeholder mapping for strategic partnerships'
    ],
    tags: ['Market Research', 'Data Analysis', 'Strategy'],
    color: 'secondary'
  },
  {
    title: 'Polymer Recycling Study',
    summary: 'Research on advanced polymer recycling techniques for aerospace applications.',
    description: 'Conducted groundbreaking research on polymer recycling methodologies that maintain high-performance characteristics required for aerospace applications.',
    achievements: [
      'Developed novel chemical recycling process for thermoset polymers',
      'Created testing framework for recycled polymer performance',
      'Established material property benchmarks for recycled vs. virgin polymers'
    ],
    tags: ['Polymers', 'Recycling', 'Research'],
    color: 'accent'
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="projects" 
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
            Projects & Research
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <FlipCard 
                title={project.title}
                summary={project.summary}
                description={project.description}
                achievements={project.achievements}
                tags={project.tags}
                color={project.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

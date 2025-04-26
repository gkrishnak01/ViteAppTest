import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import FlipCard from './FlipCard';
import { Project } from '@/types';

// Fallback project data in case API call fails
const fallbackProjects = [
  {
    id: 1,
    title: 'Sustainable Composite Development',
    summary: 'Research focused on creating eco-friendly aerospace-grade composite materials.',
    description: 'Developed composite materials with 40% reduced carbon footprint while maintaining aerospace-grade mechanical properties.',
    achievements: [
      'Optimized fiber-resin ratios for minimal environmental impact',
      'Leveraged bio-based resins without performance compromise',
      'Created testing methodology for circular lifecycle assessment'
    ],
    tags: ['Material Science', 'Sustainability', 'Composites'],
    color: 'primary',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Rocket Propulsion Optimization',
    summary: 'Computational analysis for optimizing dual-motor rocket configurations.',
    description: 'Achieved 12× altitude improvement through computational analysis and iterative testing of rocket motor configurations.',
    achievements: [
      'Evaluated performance of Aerotech G74W vs H125W motors',
      'Conducted CFD analysis for aerodynamic stability',
      'Optimized payload capacity while maximizing apogee'
    ],
    tags: ['Propulsion', 'CFD', 'Aerodynamics'],
    color: 'secondary',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: 'Medical Supply Chain Optimization',
    summary: 'Research on interdisciplinary strategies for efficient supply chain design.',
    description: 'Published research on integrated approaches to optimize medical supply chains through interdisciplinary strategies.',
    achievements: [
      'Developed multi-factor optimization models',
      'Implemented sustainability metrics in supply chain evaluation',
      'Created framework for cross-industry knowledge transfer'
    ],
    tags: ['Supply Chain', 'Healthcare', 'Research'],
    color: 'accent',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: 'Titanium Recycling Process',
    summary: 'Development of energy-efficient titanium recycling for aerospace applications.',
    description: 'Researched novel approaches to titanium recycling that maintains aerospace-grade mechanical properties with reduced energy input.',
    achievements: [
      'Reduced energy consumption by 30% compared to traditional methods',
      'Maintained material integrity through optimized processing',
      'Created closed-loop production model for titanium components'
    ],
    tags: ['Materials', 'Recycling', 'Titanium'],
    color: 'primary',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: 'Composite Market Intelligence',
    summary: 'Data-driven analysis of composite material market opportunities.',
    description: 'Conducted comprehensive market analysis to identify growth opportunities for sustainable composite materials across industries.',
    achievements: [
      'Identified 7x growth potential in niche industrial sectors',
      'Created predictive models for market penetration',
      'Developed stakeholder mapping for strategic partnerships'
    ],
    tags: ['Market Research', 'Data Analysis', 'Strategy'],
    color: 'secondary',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    title: 'Polymer Recycling Study',
    summary: 'Research on advanced polymer recycling techniques for aerospace applications.',
    description: 'Conducted groundbreaking research on polymer recycling methodologies that maintain high-performance characteristics required for aerospace applications.',
    achievements: [
      'Developed novel chemical recycling process for thermoset polymers',
      'Created testing framework for recycled polymer performance',
      'Established material property benchmarks for recycled vs. virgin polymers'
    ],
    tags: ['Polymers', 'Recycling', 'Research'],
    color: 'accent',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Fetch projects from API
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['/api/projects'],
    retry: 1, // Only retry once if the request fails
    // Use fallback data if needed
    placeholderData: fallbackProjects
  });

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // SVG connecting lines animation
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    }
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error loading projects. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 relative">
            {/* SVG connecting lines (will appear between cards) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25" style={{ overflow: 'visible' }}>
              {projects && projects.length > 1 && (
                <>
                  {/* Horizontal connecting lines */}
                  <motion.path 
                    d="M 100,150 H 600" 
                    stroke="#57cc99" 
                    strokeWidth="1" 
                    fill="none"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                  />
                  {/* Vertical connecting lines */}
                  <motion.path 
                    d="M 350,50 V 500" 
                    stroke="#3a86ff" 
                    strokeWidth="1" 
                    fill="none" 
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                  />
                  {/* Diagonal paths */}
                  <motion.path 
                    d="M 100,100 Q 350,250 600,400" 
                    stroke="#57cc99" 
                    strokeWidth="1" 
                    fill="none" 
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                  />
                </>
              )}
            </svg>
            
            {/* Project cards */}
            {projects?.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ 
                  scale: 1.03, 
                  transition: { duration: 0.2 } 
                }}
                className="relative z-10"
              >
                <FlipCard 
                  title={project.title}
                  summary={project.summary}
                  description={project.description}
                  achievements={project.achievements as string[]}
                  tags={project.tags as string[]}
                  color={project.color as 'primary' | 'secondary' | 'accent'}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

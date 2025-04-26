import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import FlipCard from './FlipCard';
import { Project } from '@/types';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Fetch projects from API
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    retry: 1,
  });

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="min-h-[1200px] bg-background py-20 relative"
    >
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projects & Research
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[76px] relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
              {projects?.length > 1 && (
                <>
                  <motion.path 
                    d="M 100,150 H 600" 
                    stroke="#57cc99" 
                    strokeWidth="1" 
                    fill="none"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                  />
                  <motion.path 
                    d="M 350,50 V 500" 
                    stroke="#3a86ff" 
                    strokeWidth="1" 
                    fill="none"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                  />
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

            {projects?.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2, type: "spring", stiffness: 300 }
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
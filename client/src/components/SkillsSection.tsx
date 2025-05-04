import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import SkillBar from './SkillBar';
import { Skill, Tool, Certification } from '@/types';

// Fallback data for when API fails
const fallbackTechnicalSkills = [
  { id: 1, name: 'Finite Element Analysis (FEA)', percentage: 85, type: 'technical', createdAt: new Date() },
  { id: 2, name: 'Additive Manufacturing (3D Printing)', percentage: 70, type: 'technical', createdAt: new Date() },
  { id: 3, name: 'Materials Characterization', percentage: 80, type: 'technical', createdAt: new Date() },
  { id: 4, name: 'Compression Molding Techniques', percentage: 85, type: 'technical', createdAt: new Date() },
  { id: 5, name: 'Propulsion System Design', percentage: 75, type: 'technical', createdAt: new Date() },
  { id: 6, name: 'Thermal Analysis (Heat Transfer)', percentage: 80, type: 'technical', createdAt: new Date() },
  { id: 7, name: 'Problem-Solving & Analytical Thinking', percentage: 90, type: 'technical', createdAt: new Date() },
  { id: 8, name: 'Structural Design & Analysis', percentage: 85, type: 'technical', createdAt: new Date() }
];

const fallbackBusinessSkills = [
  { id: 9, name: 'Market Research', percentage: 85, type: 'business', createdAt: new Date() },
  { id: 10, name: 'Investor Pitching', percentage: 80, type: 'business', createdAt: new Date() },
  { id: 11, name: 'Supply Chain Management', percentage: 75, type: 'business', createdAt: new Date() },
  { id: 12, name: 'ESG Compliance', percentage: 90, type: 'business', createdAt: new Date() }
];

const fallbackTools = [
  { 
    id: 1,
    name: 'ANSYS', 
    icon: 'fas fa-wind', 
    tags: ['CFD', 'FEA'],
    createdAt: new Date()
  },
  { 
    id: 2,
    name: 'OpenRocket', 
    icon: 'fas fa-rocket', 
    tags: ['Simulation'],
    createdAt: new Date()
  },
  { 
    id: 3,
    name: 'CAD Software', 
    icon: 'fas fa-drafting-compass', 
    tags: ['3D Modeling'],
    createdAt: new Date()
  },
  {
    id: 4,
    name: 'Python', 
    icon: 'fa-brands fa-python', 
    tags: ['Programming'],
    createdAt: new Date()
  },
  {
    id: 4,
    name: 'Matlab', 
    icon: 'fa-solid fa-calculator', 
    tags: ['Simulation'],
    createdAt: new Date()
  },
  {
    id: 5,
    name: 'SQL', 
    icon: 'fa-solid fa-database', 
    tags: ['Database Management'],
    createdAt: new Date()
  },
  {
    id: 5,
    name: 'Arc GIS', 
    icon: 'fa-solid fa-map', 
    tags: ['Mapping'],
    createdAt: new Date()
  }
];

const fallbackCertifications = [
  {
    id: 1,
    name: 'GE Aerospace',
    description: 'Explore Engineering Job Simulation',
    details: 'Specialized training in aerospace engineering workflows and industry standards.',
    icon: 'fas fa-certificate',
    color: 'primary',
    link: "https://drive.google.com/file/d/1puzg7oJcfaghEEE5kTCKJ3LK0fKli_Cf/view?usp=sharing",
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Web GIS Technology',
    description: 'Geospatial Information Systems',
    details: 'Application of GIS technologies for environmental and aerospace mapping applications.',
    icon: 'fas fa-globe',
    color: 'secondary',
    link : "https://drive.google.com/file/d/1kqrUrpPxNliKC6tZAZF-BtrCKtnM4Dd1/view?usp=sharing",
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'Energy Literacy Training',
    description: 'Sustainable Energy Solutions',
    details: 'Comprehensive understanding of energy systems and sustainability principles for aerospace applications.',
    icon: 'fas fa-bolt',
    color: 'accent',
    link : "https://drive.google.com/file/d/1sDMwElWBKhvd3K_VGRoIf1bL_CypNg7Z/view?usp=sharing",
    createdAt: new Date()
  },
  {
    id: 4,
    name: 'Webinar - Technical Publication & AI/Data Science in Aerospace',
    description: 'Technical Writing and AI Applications in Aerospace',
    details: 'Gained foundational knowledge of aerospace technical writing, data science concepts, and introductory applications of AI in research and communication',
    icon: 'fas fa-person-chalkboard',
    color: 'primary',
    link : "https://drive.google.com/file/d/1gIHYGFv5iU2hAUaxqgTM9z9sg2aFWrmz/view?usp=sharing",
    createdAt: new Date()
  }
  
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Fetch skills from API
  const { data: skills, isLoading: isLoadingSkills } = useQuery({
    queryKey: ['/api/skills'],
    retry: 1,
    placeholderData: [...fallbackTechnicalSkills, ...fallbackBusinessSkills]
  });

  // Fetch tools from API
  const { data: tools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['/api/tools'],
    retry: 1,
    placeholderData: fallbackTools
  });

  // Fetch certifications from API
  const { data: certifications, isLoading: isLoadingCerts } = useQuery({
    queryKey: ['/api/certifications'],
    retry: 1,
    placeholderData: fallbackCertifications
  });

  // Filter skills by type
  const technicalSkills = skills?.filter((skill: Skill) => skill.type === 'technical') || [];
  const businessSkills = skills?.filter((skill: Skill) => skill.type === 'business') || [];

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Skill bar animation
  const barVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${i}%`,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section 
      id="skills" 
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
            Skills & Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <motion.h3 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-poppins text-2xl font-semibold text-foreground mb-8"
            >
              Technical Skills
            </motion.h3>
            
            <div className="space-y-6">
              {false ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                fallbackTechnicalSkills.map((skill: Skill, index: number) => (
                  <SkillBar 
                    key={skill.id}
                    name={skill.name}
                    color="primary"
                    delay={0.1 * (index + 1) + 0.3}
                    isInView={isInView}
                  />
                ))
              )}
            </div>
            
            <motion.h3 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-poppins text-2xl font-semibold text-foreground mt-12 mb-8"
            >
              Business Skills
            </motion.h3>
            
            <div className="space-y-6">
              {false ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary"></div>
                </div>
              ) : (
                fallbackBusinessSkills.map((skill: Skill, index: number) => (
                  <SkillBar 
                    key={skill.id}
                    name={skill.name}
                    color="secondary"
                    delay={0.1 * (index + 1) + 0.9}
                    isInView={isInView}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Tools & Certifications */}
          <div>
            <motion.h3 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-poppins text-2xl font-semibold text-foreground mb-8"
            >
              Tools & Software
            </motion.h3>
            
            {false ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-12"
              >
                {fallbackTools?.map((tool: Tool, index: number) => (
                  <motion.div 
                    key={tool.id} 
                    className="bg-background/30 p-4 rounded-lg border border-primary/20 group hover:border-primary transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <i className={`${tool.icon} text-primary`}></i>
                      </div>
                      <span className="font-medium">{tool.name}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap">
                      {(tool.tags as string[])?.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 ml-2 first:ml-0 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            <motion.h3 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-poppins text-2xl font-semibold text-foreground mb-8"
            >
              Certifications
            </motion.h3>
            
            {false ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {fallbackCertifications?.map((cert: Certification, index: number) => (
                  <a href= {cert?.link} target='blank'>
                  <motion.div 
                    key={cert.id}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUpVariant}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) + 0.5 }}
                    className="relative group"
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2, type: "spring", stiffness: 300 }
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-${cert.color}/30 to-${cert.color === 'primary' ? 'secondary' : cert.color === 'secondary' ? 'accent' : 'primary'}/30 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -m-2 rounded-lg`}></div>
                    <div className={`relative bg-background/30 p-6 rounded-lg border border-${cert.color}/20 group-hover:border-${cert.color}/50 transition-colors duration-300`}>
                      <div className="flex items-center justify-between">
                        <h4 className={`font-poppins text-lg font-medium text-${cert.color}`}>{cert.name}</h4>
                        <div className={`w-12 h-12 flex items-center justify-center bg-${cert.color}/10 rounded-full`}>
                          <i className={`${cert.icon} text-${cert.color}`}></i>
                        </div>
                      </div>
                      <p className="text-sm mt-2 text-foreground/80">{cert.description}</p>
                      <p className="text-xs mt-4 text-foreground/50">{cert.details}</p>
                      
                      {cert.certificate_path && (
                        <a 
                          href={cert.certificate_path.startsWith('/') ? cert.certificate_path.substring(1) : cert.certificate_path}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`mt-4 inline-block px-3 py-1 bg-${cert.color}/10 text-${cert.color} text-xs rounded-md hover:bg-${cert.color}/20 transition-colors`}
                        >
                          View Certificate <i className="fas fa-external-link-alt ml-1"></i>
                        </a>
                      )}
                    </div>
                  </motion.div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

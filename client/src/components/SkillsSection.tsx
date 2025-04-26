import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import SkillBar from './SkillBar';

// Technical skills data
const technicalSkills = [
  { name: 'Composite Structures', percentage: 90 },
  { name: 'CFD Analysis', percentage: 85 },
  { name: 'Aerodynamics', percentage: 80 },
  { name: 'Sustainable Materials', percentage: 95 },
  { name: 'Data Analysis', percentage: 75 }
];

// Business skills data
const businessSkills = [
  { name: 'Market Research', percentage: 85 },
  { name: 'Investor Pitching', percentage: 80 },
  { name: 'Supply Chain Management', percentage: 75 },
  { name: 'ESG Compliance', percentage: 90 }
];

// Tools data
const tools = [
  { 
    name: 'ANSYS', 
    icon: 'fas fa-wind', 
    tags: ['CFD', 'FEA']
  },
  { 
    name: 'OpenRocket', 
    icon: 'fas fa-rocket', 
    tags: ['Simulation']
  },
  { 
    name: 'CAD Software', 
    icon: 'fas fa-drafting-compass', 
    tags: ['3D Modeling']
  },
  { 
    name: 'Data Analysis', 
    icon: 'fas fa-chart-line', 
    tags: ['Market Intelligence']
  }
];

// Certifications data
const certifications = [
  {
    name: 'GE Aerospace',
    description: 'Explore Engineering Job Simulation',
    details: 'Specialized training in aerospace engineering workflows and industry standards.',
    icon: 'fas fa-certificate',
    color: 'primary'
  },
  {
    name: 'Web GIS Technology',
    description: 'Geospatial Information Systems',
    details: 'Application of GIS technologies for environmental and aerospace mapping applications.',
    icon: 'fas fa-globe',
    color: 'secondary'
  },
  {
    name: 'Energy Literacy Training',
    description: 'Sustainable Energy Solutions',
    details: 'Comprehensive understanding of energy systems and sustainability principles for aerospace applications.',
    icon: 'fas fa-bolt',
    color: 'accent'
  }
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
              {technicalSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="primary"
                  delay={0.1 * (index + 1) + 0.3}
                  isInView={isInView}
                />
              ))}
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
              {businessSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="secondary"
                  delay={0.1 * (index + 1) + 0.9}
                  isInView={isInView}
                />
              ))}
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
            
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              {tools.map((tool, index) => (
                <div key={index} className="bg-background/30 p-4 rounded-lg border border-primary/20 group hover:border-primary transition-colors duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <i className={`${tool.icon} text-primary`}></i>
                    </div>
                    <span className="font-medium">{tool.name}</span>
                  </div>
                  <div className="mt-3 flex">
                    {tool.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 ml-2 first:ml-0">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.h3 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-poppins text-2xl font-semibold text-foreground mb-8"
            >
              Certifications
            </motion.h3>
            
            <div className="grid grid-cols-1 gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUpVariant}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) + 0.5 }}
                  className="relative group"
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

import { db } from "../server/db";
import { 
  projects, skills, tools, certifications, 
  experiences, educations 
} from "../shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Check if we already have data
  const existingProjects = await db.select().from(projects);
  if (existingProjects.length > 0) {
    console.log("Database already seeded. Exiting...");
    return;
  }

  // Seed projects
  console.log("Seeding projects...");
  const projectsData = [
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

  await db.insert(projects).values(projectsData);

  // Seed skills
  console.log("Seeding skills...");
  const skillsData = [
    // Technical skills
    { name: 'Composite Structures', percentage: 90, type: 'technical' },
    { name: 'CFD Analysis', percentage: 85, type: 'technical' },
    { name: 'Aerodynamics', percentage: 80, type: 'technical' },
    { name: 'Sustainable Materials', percentage: 95, type: 'technical' },
    { name: 'Data Analysis', percentage: 75, type: 'technical' },
    
    // Business skills
    { name: 'Market Research', percentage: 85, type: 'business' },
    { name: 'Investor Pitching', percentage: 80, type: 'business' },
    { name: 'Supply Chain Management', percentage: 75, type: 'business' },
    { name: 'ESG Compliance', percentage: 90, type: 'business' }
  ];

  await db.insert(skills).values(skillsData);

  // Seed tools
  console.log("Seeding tools...");
  const toolsData = [
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
    }
  ];

  await db.insert(tools).values(toolsData);

  // Seed certifications
  console.log("Seeding certifications...");
  const certificationsData = [
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

  await db.insert(certifications).values(certificationsData);

  // Seed experiences
  console.log("Seeding experiences...");
  const experiencesData = [
    {
      company: 'Atomix Materials',
      position: 'Co-Founder & Material Specialist',
      location: 'Sheffield, UK',
      period: '2023 - Present',
      responsibilities: [
        'Lead R&D for sustainable composite materials with 40% reduced carbon footprint',
        'Developed and implemented circular lifecycle assessment methodologies',
        'Created predictive models for composite performance in aerospace applications',
        'Secured £250,000 in seed funding through university innovation grants'
      ],
      icon: 'fas fa-flask',
      color: 'primary'
    },
    {
      company: 'Brahmàstra Aerospace',
      position: 'Project Engineering Intern',
      location: 'Bangalore, India',
      period: '2022 - 2023',
      responsibilities: [
        'Conducted CFD analysis for aerodynamic optimization of UAV components',
        'Participated in design and testing of dual-motor rocket propulsion systems',
        'Created technical documentation and test reports for certification processes',
        'Contributed to material selection for lightweight structural components'
      ],
      icon: 'fas fa-rocket',
      color: 'secondary'
    }
  ];

  await db.insert(experiences).values(experiencesData);

  // Seed educations
  console.log("Seeding educations...");
  const educationsData = [
    {
      institution: 'University of Sheffield',
      degree: 'MSc, Aerospace Materials',
      period: '2022 - 2023',
      description: 'Specialized in sustainable composite materials for aerospace applications with focus on lifecycle assessment methodologies and performance optimization.',
      color: 'primary'
    },
    {
      institution: 'Amrita Vishwa Vidyapeetham',
      degree: 'BTech, Aerospace Engineering',
      period: '2018 - 2022',
      description: 'Focused on aerodynamics, propulsion systems, and structural analysis. Senior project on dual-motor rocket optimization earned university innovation award.',
      color: 'secondary'
    },
    {
      institution: 'Chavara Public School',
      degree: 'Higher Secondary, Computer Mathematics',
      period: '2016 - 2018',
      description: 'Mathematics and computer science specialization with additional focus on physics and engineering principles.',
      color: 'accent'
    }
  ];

  await db.insert(educations).values(educationsData);

  console.log("✅ Database seeded successfully!");
}

// Execute the seed function
seedDatabase()
  .catch(e => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
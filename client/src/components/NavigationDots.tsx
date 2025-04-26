import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - 300) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[100] hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <a 
            key={section.id}
            href={`#${section.id}`} 
            className={`nav-dot w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id ? 'bg-secondary scale-150' : 'bg-primary opacity-60'
            }`}
            aria-label={`Navigate to ${section.label} section`}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationDots;

import { useState, useEffect } from 'react';

const navigationLinks = [
  { href: '#hero', icon: 'fa-home', label: 'Home' },
  { href: '#about', icon: 'fa-user', label: 'About' },
  { href: '#experience', icon: 'fa-briefcase', label: 'Work' },
  { href: '#projects', icon: 'fa-flask', label: 'Projects' },
  { href: '#skills', icon: 'fa-tools', label: 'Skills' },
  { href: '#contact', icon: 'fa-envelope', label: 'Contact' }
];

const MobileNavigation = () => {
  const [activeLink, setActiveLink] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find the current section
      for (let i = navigationLinks.length - 1; i >= 0; i--) {
        const sectionId = navigationLinks[i].href.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - 300) {
            setActiveLink(navigationLinks[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-primary/30 z-50 md:hidden">
      <div className="flex justify-around items-center p-3">
        {navigationLinks.map((link) => (
          <a 
            key={link.href}
            href={link.href} 
            className={`flex flex-col items-center ${activeLink === link.href ? 'text-secondary' : 'text-primary'}`}
          >
            <i className={`fas ${link.icon} ${activeLink === link.href ? 'text-secondary' : 'text-primary'}`}></i>
            <span className="text-xs mt-1">{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;

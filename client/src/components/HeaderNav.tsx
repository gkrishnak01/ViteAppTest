import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navigationLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' }
];

const HeaderNav = () => {
  const [activeLink, setActiveLink] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Set navbar to scrolled state when scrolling down
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-orbitron text-xl font-bold text-primary">
          Arjith A V
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  activeLink === link.href ? 'text-secondary' : 'text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
        
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
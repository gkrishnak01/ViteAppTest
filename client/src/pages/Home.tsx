import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NavigationDots from "@/components/NavigationDots";
import MobileNavigation from "@/components/MobileNavigation";
import HeaderNav from "@/components/HeaderNav";

const Home = () => {
  useEffect(() => {
    // Set title when component mounts
    document.title = "Arjith A V | Aerospace Engineer & Materials Specialist";

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <HeaderNav />
      <NavigationDots />
      <MobileNavigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;

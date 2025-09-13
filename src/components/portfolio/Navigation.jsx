import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Projects & Startups', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'Recognition', id: 'recognition' },
  { label: 'References', id: 'references' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;
      
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // Close mobile menu immediately
    setIsMobileMenuOpen(false);
    
    // Find the element
    const element = document.getElementById(sectionId);
    if (element) {
      // Use a small timeout to ensure menu animation completes
      setTimeout(() => {
        const yOffset = -80; // Account for fixed header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 150);
    }
  };

  const handleMobileMenuClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-md shadow-deep-emerald/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="font-display text-2xl sm:text-3xl text-charcoal cursor-pointer tracking-tight"
            onClick={() => scrollToSection('hero')}
          >
            Wiem Mimouni
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-deep-emerald'
                    : 'text-charcoal hover:text-deep-emerald'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-soft-rose rounded-full"
                    style={{ borderRadius: '50%' }}
                  />
                )}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="btn-primary ml-6"
            >
              Schedule a 20-min intro
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-pure-white/95 backdrop-blur-md border-t border-subtle"
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileMenuClick(item.id)}
                  className="block w-full text-left py-3 px-2 text-charcoal hover:text-deep-emerald hover:bg-deep-emerald/5 transition-all duration-200 font-medium rounded-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
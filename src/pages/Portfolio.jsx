import React, { useEffect } from 'react';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ServicesSection from '../components/portfolio/ServicesSection';
import ProcessSection from '../components/portfolio/ProcessSection';
import RecognitionSection from '../components/portfolio/RecognitionSection';
import ReferencesSection from '../components/portfolio/ReferencesSection';
import AboutSection from '../components/portfolio/AboutSection';
import ContactSection from '../components/portfolio/ContactSection';

export default function Portfolio() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.classList.add('bg-pure-white');
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.classList.remove('bg-pure-white');
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <RecognitionSection />
        <ReferencesSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-8">
            <div className="text-light-neutral/70 mb-4">
              Operating across Canada • Tunisia • Europe • US
            </div>
            <h3 className="text-2xl font-light mb-4 text-pure-white">Wiem Mimouni</h3>
            <p className="text-light-neutral/80 max-w-2xl mx-auto">
              Entrepreneur & Full-Stack Developer building digital platforms from idea to execution. 
              Let's bring your vision to life with strategy, design, and scalable code.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-light-neutral/20 text-sm text-light-neutral/70">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <span>📞 (+1) 437-830-1154</span>
              <span>📧 wiem.mimouni@voyagr.ca</span>
            </div>
            <div>
              © 2025 All rights reserved • Designed & Developed by Wiem Mimouni
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Calendar, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pure-white via-pure-white to-light-neutral/30">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-soft-rose/50 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-deep-emerald/40 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-1 w-1 bg-soft-rose/50 rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-pure-white/60 backdrop-blur-sm rounded-full border border-subtle mb-8 sm:mb-12 shadow-sm">
              <Globe className="w-4 h-4 text-deep-emerald" />
              <span className="text-xs sm:text-sm font-medium text-charcoal">Global Entrepreneur • Cross-border Innovation</span>
              <Sparkles className="w-4 h-4 text-soft-rose" />
            </div>
          </motion.div>

          <motion.h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal mb-8 sm:mb-10 tracking-tight text-balance leading-[1.1]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            I turn ideas into products
            <span className="block gradient-text font-medium mt-2 sm:mt-3">
              and products into companies.
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-charcoal/80 max-w-5xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Founder, strategist, and hands-on product leader shipping teams from concept to meaningful scale.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-charcoal/70 max-w-4xl mx-auto mb-12 sm:mb-16 leading-relaxed text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            I design and build investor-ready products across SaaS, fintech, logistics and AI, combining product strategy with hands-on engineering and design.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button 
                className="btn-primary text-base"
                onClick={() => window.open('https://calendly.com/wiem-mimouni-innothink/30min?preview_source=et_card&month=2024-09', '_blank')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a 20-min intro
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button 
                className="btn-secondary text-base"
                onClick={() => window.open('https://wa.me/14378301154', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2 text-deep-emerald group-hover:text-white transition-colors" />
                WhatsApp me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-12 w-full flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-charcoal/50 hover:text-deep-emerald transition-colors group cursor-pointer"
          onClick={scrollToProjects}
        >
          <ArrowDown className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium text-center">Explore My Work</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

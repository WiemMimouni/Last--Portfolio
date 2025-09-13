import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { Experience } from '@/api/entities';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const allExperiences = await Experience.list('-created_date');
      setExperiences(allExperiences);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (experiences.length === 0 && !isLoading) {
    return (
      <section id="experience" className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">
            Professional
            <span className="block gradient-text font-medium">Experience</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Career highlights and professional experience will be showcased here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">
            Professional
            <span className="block gradient-text font-medium">Experience</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Leadership roles and strategic positions that have driven innovation and growth across diverse industries.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                {/* Company logo */}
                {exp.logo_url && (
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-xl overflow-hidden">
                    <img
                      src={exp.logo_url}
                      alt={exp.company}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-charcoal mb-2">{exp.title}</h3>
                      <div className="flex items-center text-sage font-medium text-lg mb-2">
                        <Building2 className="w-5 h-5 mr-2" />
                        {exp.company}
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:text-right text-slate-600 space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 lg:hidden" />
                        {exp.start_year} - {exp.end_year || 'Present'}
                      </div>
                      {exp.location && (
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 lg:hidden" />
                          {exp.location}
                        </div>
                      )}
                      <span className="px-3 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full w-fit lg:ml-auto">
                        {exp.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.website && (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sage hover:text-sage-dark font-medium transition-colors"
                    >
                      View company
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
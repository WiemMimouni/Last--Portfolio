
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReferencesSection() {
  const projectEmails = [
    { project: "Voyagr CEO", subtitle: "Main Email - voyagr.ca", email: "wiem.mimouni@voyagr.ca" },
    { project: "InnoThink CEO", subtitle: "Main Email - in-no-think.com", email: "wiem.mimouni@innothink.net" },
    { project: "SML Gold Project", subtitle: "smlgold.com", email: "wiem.mimouni@smlgold.com" },
    { project: "Oleyes Security", subtitle: "oleyes.com", email: "wiem.mimouni@oleyes.com" },
    { project: "BeBer Project", subtitle: "nex-build.net", email: "wiem.beber@nex-build.net" },
    { project: "PromptCRM Project", subtitle: "nex-build.net", email: "wiem.promptcrm@nex-build.net" },
    { project: "Madit Agency", subtitle: "madit-agency.com", email: "wiem@madit-agency.com" }
  ];

  const professionalReferences = [
    { 
      name: "Hamdi Ayari", 
      title: "CTO - Nex Build & Destock Africa & Madit Agency", 
      relationship: "Strategic partnership between InnoThink and Nex Build/Destock Africa and Madit Agency. Hamdi trusted me with these projects.", 
      projects: "SML Gold, BeBer, PromptCRM, Oleyes Security", 
      email: "destockafrica@gmail.com", 
      phone: "+216 24 734 647" 
    },
    { 
      name: "Dr. Zeineb Belkhiria", 
      title: "Client Reference - Medical Professional", 
      relationship: "Client Reference", 
      projects: "Professional Services", 
      email: "drzeinebbelkhiria@gmail.com" 
    },
    { 
      name: "Aymen Manai", 
      title: "Lead Engineer & AI Consultant - University of California, Office of the President", 
      relationship: "UC Initiatives Collaborator", 
      projects: "UC System Technology Projects", 
      email: "Available upon request" 
    },
    { 
      name: "Rakia Mediouni",
      title: "Pedagogy and Cohort Lead - RBK Tunisia",
      relationship: "Former Colleague & Mentor",
      projects: "RBK Tunisia",
      email: "rakia.mediouni@rbk.tn"
    },
    { 
      name: "Mohamed Wahabi", 
      title: "Operation Manager - Concentrix", 
      relationship: "Former Manager", 
      projects: "Operations Management", 
      email: "mo7amed.wahabi@outlook.fr" 
    },
    { 
      name: "Ezzedin Cherni", 
      title: "Trade Commissioner - Trade Commissioner Service of Canada", 
      relationship: "Trade Commissioner Contact", 
      projects: "Canada-Tunisia Trade Relations", 
      email: "Available upon request" 
    },
    { 
      name: "Aladin Legault d'Auteuil", 
      title: "Conseiller commercial - Trade Commissioner Service of Canada", 
      relationship: "Trade Commissioner Contact", 
      projects: "International Trade Development", 
      email: "Available upon request" 
    },
    { 
      name: "Faicel Lalioui", 
      title: "Licensed Gold Trader & CEO - SML Gold LLC", 
      relationship: "Client & Business Partner", 
      projects: "SML Gold Trading Platform", 
      email: "Available upon request" 
    }
  ];

  return (
    <section id="references" className="py-32 bg-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">References</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">Email me if you are interested.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
          >
            <Card className="h-full bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-light text-charcoal flex items-center">
                  <Building2 className="w-6 h-6 mr-3 text-deep-emerald" />
                  Project Emails
                </CardTitle>
                <p className="text-charcoal/70">Contact points from projects I've led or contributed to.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="space-y-4">
                  {projectEmails.map((contact, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5, delay: index * 0.05 }} 
                      viewport={{ once: true }} 
                      className="flex items-center justify-between p-4 bg-light-neutral/50 rounded-lg hover:bg-light-neutral/80 transition-colors group"
                    >
                      <div>
                        <div className="font-medium text-charcoal group-hover:text-deep-emerald transition-colors">
                          {contact.project}
                        </div>
                        <div className="text-sm text-charcoal/70">{contact.subtitle}</div>
                        <div className="text-sm text-charcoal/60 mt-1">{contact.email}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => window.open(`mailto:${contact.email}`, '_blank')} 
                        className="text-deep-emerald hover:bg-deep-emerald hover:text-white"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            viewport={{ once: true }}
          >
            <Card className="h-full bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-light text-charcoal flex items-center">
                  <User className="w-6 h-6 mr-3 text-deep-emerald" />
                  Professional References
                </CardTitle>
                <p className="text-charcoal/70">A network of trusted collaborators and clients.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="space-y-6">
                  {professionalReferences.map((reference, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5, delay: index * 0.1 }} 
                      viewport={{ once: true }} 
                      className="p-4 border border-subtle rounded-lg hover:border-deep-emerald/30 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="mb-3">
                        <h4 className="font-semibold text-charcoal group-hover:text-deep-emerald transition-colors">
                          {reference.name}
                        </h4>
                        <p className="text-deep-emerald font-medium">{reference.title}</p>
                      </div>
                      <div className="text-sm text-charcoal/70 space-y-2 mb-3">
                        <p><strong>Relationship:</strong> {reference.relationship}</p>
                        <p><strong>Project:</strong> {reference.projects}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center text-charcoal/70">
                          <Mail className="w-4 h-4 mr-1 text-deep-emerald/70" />
                          {reference.email}
                        </div>
                        {reference.phone && (
                          <div className="flex items-center text-charcoal/70">
                            <Phone className="w-4 h-4 mr-1 text-deep-emerald/70" />
                            {reference.phone}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

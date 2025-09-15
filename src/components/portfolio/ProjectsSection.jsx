import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import projectsData from '@/data/projects.json'; // ✅ local JSON

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'founded', label: 'Founded' },
    { id: 'technical', label: 'Technical' },
    { id: 'client', label: 'Client' }
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  // 🔁 now reads from src/data/projects.json
  const loadProjects = async () => {
    try {
      // normalize a tiny bit so your JSX keeps working
      const allProjects = (projectsData ?? []).map(p => ({
        ...p,
        // your component reads "subtitle" in a few places;
        // use description or category as a fallback so it's never empty
        subtitle: p.subtitle ?? p.description ?? p.category ?? ''
      }));
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading local projects.json:', error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const organizeProjects = () => {
    const founded = projects.filter(p => ['Voyagr', 'InnoThink'].includes(p.title));
    const technical = projects.filter(p => ['SML Gold', 'BeBer', 'MyEasyTransfer', 'Oleyes Security', 'PromptCRM'].includes(p.title));
    const client = projects.filter(p => ['DepoGro', 'PillPall', 'AMS Dynamic', 'UC Initiatives'].includes(p.title));

    const foundedSorted = [
      founded.find(p => p.title === 'Voyagr'),
      founded.find(p => p.title === 'InnoThink')
    ].filter(Boolean);

    const technicalSorted = [
      technical.find(p => p.title === 'SML Gold'),
      technical.find(p => p.title === 'BeBer'),
      technical.find(p => p.title === 'MyEasyTransfer'),
      technical.find(p => p.title === 'Oleyes Security'),
      technical.find(p => p.title === 'PromptCRM')
    ].filter(Boolean);

    const clientSorted = [
      client.find(p => p.title === 'DepoGro'),
      client.find(p => p.title === 'PillPall'),
      client.find(p => p.title === 'AMS Dynamic'),
      client.find(p => p.title === 'UC Initiatives')
    ].filter(Boolean);

    return { founded: foundedSorted, technical: technicalSorted, client: clientSorted };
  };

  const getFilteredProjects = () => {
    const organized = organizeProjects();
    if (selectedCategory === 'founded') return organized.founded;
    if (selectedCategory === 'technical') return organized.technical;
    if (selectedCategory === 'client') return organized.client;
    return [...organized.founded, ...organized.technical, ...organized.client];
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const ProjectGroup = ({ title, projects, delay = 0 }) => (
    <div className="mb-20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="text-2xl font-light text-charcoal mb-12 tracking-tight"
      >
        {title}
      </motion.h3>
      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectItem key={project.id ?? project.title} project={project} index={index} delay={delay + (index * 0.1)} />
        ))}
      </div>
    </div>
  );

  const ProjectItem = ({ project, index, delay }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="border-b border-subtle pb-16 last:border-b-0"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h4 className="text-3xl font-light text-charcoal mb-3 tracking-tight">
              {project.title}
            </h4>
            <p className="text-lg text-charcoal/70 mb-4 leading-relaxed">
              {project.title === 'MyEasyTransfer' ? (
                <>
                  Product Manager (with{' '}
                  <a
                    href="https://madit-agency.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-deep-emerald hover:underline font-medium"
                  >
                    Madit Agency
                  </a>
                  {' '}team as CTO)
                </>
              ) : (
                project.subtitle
              )}
            </p>
            <div className="flex items-center gap-4 mb-6">
              {project.role && (
                <Badge variant="outline" className="text-xs font-medium px-3 py-1 border-charcoal/50 text-charcoal">
                  {project.role}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-charcoal/80 leading-relaxed mb-6">
            <span className="font-medium text-charcoal">Snapshot:</span> {project.description}
          </p>
          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <div className="mb-6">
              <h5 className="text-sm font-medium text-charcoal mb-3 uppercase tracking-wider">Highlights</h5>
              <ul className="space-y-2">
                {project.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-soft-rose rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-charcoal/80 text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.stage && <p className="text-sm text-charcoal/70 mb-6"><span className="font-medium text-charcoal">Stage:</span> {project.stage}</p>}
          {project.reference_email && <p className="text-sm text-charcoal/70 mb-6"><span className="font-medium text-charcoal">Reference:</span> {project.reference_email}</p>}
          {project.title === 'UC Initiatives' && (
            <div className="mb-6">
              <h5 className="text-sm font-medium text-charcoal mb-3 uppercase tracking-wider">External Links</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <a href="https://mesa.ucop.edu" target="_blank" rel="noopener noreferrer" className="text-deep-emerald hover:underline">MESASpace</a>
                <a href="https://data.ucop.edu" target="_blank" rel="noopener noreferrer" className="text-deep-emerald hover:underline">UC Data Warehouse</a>
                <a href="https://apply.universityofcalifornia.edu/my-application/login" target="_blank" rel="noopener noreferrer" className="text-deep-emerald hover:underline">ApplyUC Platform</a>
                <a href="https://www.universityofcalifornia.edu/ai-projects" target="_blank" rel="noopener noreferrer" className="text-deep-emerald hover:underline">UC AI Projects</a>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.url && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-medium text-charcoal border-charcoal/50 hover:bg-charcoal hover:text-white group"
              onClick={() => window.open(project.url.startsWith('http') ? project.url : `https://${project.url}`, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1 text-charcoal/80 group-hover:text-white transition-colors" /> View Live
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-medium text-charcoal border-charcoal/50 hover:bg-charcoal hover:text-white group"
            onClick={scrollToContact}
          >
            <Mail className="w-3 h-3 mr-1 text-charcoal/80 group-hover:text-white transition-colors" /> Contact
          </Button>
        </div>
      </motion.div>
    );
  };

  const organized = organizeProjects();
  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-32 bg-pure-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-charcoal mb-6 tracking-tight">Projects & Startups</h2>
          <p className="text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed mb-12">
            High-value, investor-friendly work. Each tile lists outcome, model, and link.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 text-sm font-medium transition-all duration-300 border rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-deep-emerald text-white border-deep-emerald'
                    : 'text-charcoal border-light-neutral hover:border-deep-emerald hover:text-deep-emerald'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="text-center text-charcoal/70">Loading projects...</div>
        ) : selectedCategory === 'all' ? (
          <div>
            <ProjectGroup title="Founded & Leading" projects={organized.founded} delay={0.1} />
            <ProjectGroup title="Led as Technical Lead & Product Manager" projects={organized.technical} delay={0.2} />
            <ProjectGroup title="Selected Client/Managed Builds" projects={organized.client} delay={0.3} />
          </div>
        ) : (
          <div className="space-y-16">
            {filteredProjects.map((project, index) => (
              <ProjectItem key={project.id ?? `${project.title}-${index}`} project={project} index={index} delay={index * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

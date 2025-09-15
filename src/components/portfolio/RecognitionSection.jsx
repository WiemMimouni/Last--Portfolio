import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin, Trophy, Users, Handshake, Link as LinkIcon, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import recData from '@/data/recognition.json'; // ✅ local JSON

export default function RecognitionSection() {
  const [recognitions, setRecognitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecognitions();
  }, []);

  // ---- Local loader (no network, no auth) ----
  const loadRecognitions = async () => {
    try {
      const norm = (r) => ({
        id: r.id ?? `${r.title || 'item'}-${r.year || 'noyear'}`,
        title: (r.title || '').trim(),
        organization: (r.organization || r.org || '').trim(),
        description: (r.description || '').trim(),
        year: r.year != null ? Number(r.year) : null,
        location: (r.location || '').trim(),
        type: (r.type || '').trim(),           // 'award' | 'summit' | 'recognition' | 'partnership' …
        link_url: r.link_url || r.url || '',
      });

      const cleaned = (recData ?? []).map(norm);
      cleaned.sort((a, b) => {
        const ya = a.year ?? -Infinity, yb = b.year ?? -Infinity;
        if (yb !== ya) return yb - ya;                    // newest first
        return a.title.localeCompare(b.title);
      });

      setRecognitions(cleaned);
    } catch (error) {
      console.error('Error loading local recognition.json:', error);
      setRecognitions([]);
    } finally {
      setIsLoading(false);
    }
  };
  // --------------------------------------------

  const getIcon = (type) => {
    switch (type) {
      case 'award': return Trophy;
      case 'summit': return Users;
      case 'recognition': return Star;
      case 'partnership': return Handshake;
      default: return Award;
    }
  };

  const strategicPartners = [
    { name: "AWS Partner Network", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/fce872c74_unnamed2.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "UN Global Compact", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/9d6aa7b36_image0011.jpg" },
    { name: "ISO", logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/ISO_logo.svg" },
    { name: "EcoVadis", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/21fb60dd9_unnamed1.png" },
    { name: "Choose Europe", logo: "https://www.chooseeurope.eu/images/logo.png" },
    { name: "Keystone", logo: "https://www.keystone-corporation.com/images/keystone_logo.svg" },
  ];

  const projectPartners = [
    { name: "Voyagr", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/627ba91fd_Voyagr_Option-01.jpg" },
    { name: "InnoThink", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/d31cab639_1.jpg" },
    { name: "SML Gold", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/09637d779_logo.png" },
    { name: "Madit Agency", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/8feb61526_Screenshot2025-09-12at74705PM.png" },
    { name: "MyEasyTransfer", logo: "https://myeasytransfer.com/_next/static/media/logoEasy.058e5783.svg" },
    { name: "BeBer", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/5462723b2_logo1.png" },
    { name: "Oleyes Security", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c09bda8d291c998f9da4d0/9671eff51_oley-solution-logo-black.png" },
    { name: "DepoGro", logo: "https://depogro.com/images/logo/logo.png" },
    { name: "Destock Africa", logo: "https://destockafrica.com/wp-content/uploads/2021/10/logo-black-destock-africa-1.png" },
    { name: "Axelor", logo: "https://www.axelor.com/wp-content/uploads/2022/10/logo-axelor.svg" },
  ];

  const LogoScroller = ({ logos, speed = 40, direction = 'left' }) => {
    const duplicatedLogos = [...logos, ...logos];
    return (
      <div className="w-full overflow-hidden relative group mask-gradient">
        <div 
          className="flex gap-16 animate-scroll"
          style={{ 
            '--scroll-duration': `${speed}s`, 
            '--scroll-direction': direction === 'left' ? 'normal' : 'reverse',
            willChange: 'transform'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 h-12 w-40 flex items-center justify-center">
              <img 
                src={logo.logo} 
                alt={logo.name} 
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="recognition" className="py-32 bg-pure-white">
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll var(--scroll-duration) linear infinite;
          animation-direction: var(--scroll-direction);
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
        .mask-gradient {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">
            Recognition & Achievements
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Highlights of achievements and partnerships I’m proud of.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center text-charcoal/70">Loading achievements...</div>
        ) : (
          <div className="space-y-10">
            {recognitions.map((recognition, index) => {
              const IconComponent = getIcon(recognition.type);
              return (
                <motion.div
                  key={recognition.id ?? `${recognition.title}-${recognition.year}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card className="bg-pure-white/60 border border-subtle shadow-lg hover:shadow-xl transition-all duration-400 rounded-2xl overflow-hidden group hover-lift">
                    <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 gap-6 items-start">
                      <div className="md:col-span-2 flex flex-col items-center text-center">
                        <div className="p-4 bg-deep-emerald/10 rounded-full mb-3">
                          <IconComponent className="w-7 h-7 text-deep-emerald" />
                        </div>
                        {recognition.year != null && (
                          <p className="font-bold text-xl text-deep-emerald">{recognition.year}</p>
                        )}
                        {recognition.type && (
                          <Badge variant="outline" className="mt-2 capitalize border-deep-emerald/30 text-deep-emerald/80">
                            {recognition.type}
                          </Badge>
                        )}
                      </div>

                      <div className="md:col-span-10">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl font-light text-charcoal leading-snug group-hover:text-deep-emerald transition-colors duration-300">
                            {recognition.title}
                          </CardTitle>
                          {recognition.organization && (
                            <p className="text-md text-charcoal/70 font-medium pt-2">
                              {recognition.organization}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="p-0">
                          {recognition.description && (
                            <p className="text-charcoal/80 leading-relaxed">
                              {recognition.description}
                            </p>
                          )}
                        </CardContent>
                        <CardFooter className="p-0 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-charcoal/60">
                          {recognition.location && (
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-2 text-deep-emerald/70" />
                              {recognition.location}
                            </div>
                          )}
                          {recognition.link_url && (
                            <Button asChild variant="link" size="sm" className="p-0 h-auto text-deep-emerald hover:text-soft-rose text-sm font-medium">
                              <a
                                href={recognition.link_url.startsWith('http') ? recognition.link_url : `https://${recognition.link_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkIcon className="w-4 h-4 mr-1.5" />
                                View Link
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-pure-white rounded-3xl p-12 mt-24 overflow-x-hidden"
        >
          <div className="space-y-8">
            <LogoScroller logos={strategicPartners} speed={50} direction="left" />
            <LogoScroller logos={projectPartners} speed={70} direction="right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

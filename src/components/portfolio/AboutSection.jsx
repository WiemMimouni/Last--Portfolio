
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Guitar, BookOpen, BrainCircuit, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const journey = [
    {
      period: "2024–Present",
      title: "Founder & CEO - Voyagr",
      description: "Building cross-border P2P logistics platform from ideation to market. Leading product development, fundraising, and international expansion.",
      highlights: [
        "Pitched at CIX Summit to international investors",
        "Built MVP and recruited technical team",
        "Developed AI-powered solution for first- and last-mile logistics",
        "Advancing smart matching algorithms for senders, travelers, and recipients"
      ],
      current: true
    },
    {
      period: "2023–Present",
      title: "Founder - InnoThink",
      description: "Founded and scaled a software services company from the ground up — starting with no client base, no references, and no existing network. Built trust and credibility through persistent prospecting, relationship-building, and successful delivery.",
      highlights: [
        "Secured strategic partnerships with AWS, Microsoft, UNDP, and partners like Nex-Build, Destock Africa, Madit Agency",
        "Led 15+ successful project deliveries across web and mobile development",
        "Achieved a 95% client success rate with repeat engagements",
        "Negotiated and delivered enterprise-level service agreements"
      ],
      current: true
    },
    {
      period: "2022–2023",
      title: "Technical Leadership & Education - RBK & Concentrix",
      description: "Built strong foundations in technical leadership through an instructor role at Re:Coded Bootcamp (Hack Reactor affiliate) and a management role at Concentrix.",
      highlights: [
        "Promoted rapidly at Concentrix through night shift operations",
        "Taught full-stack development to cohorts of students aged 15–45, including professionals seeking career reconversion (e.g., engineers, healthcare specialists)",
        "Guided students from non-technical fields into successful IT careers — including Soumaya Aouadi, who transitioned from the health sector to tech during her pregnancy",
        "Earned respect as the youngest instructor, teaching students often older than myself while focusing on mentorship, adaptability, and professional growth",
        "Developed technical mentorship capabilities and an operational excellence mindset"
      ],
      current: false
    }
  ];

  const values = [
    "I take full responsibility and don't overpromise.",
    "I work only on projects where I can truly contribute.",
    "I keep clients up to date - process, risks, trade-offs.",
    "I deliver what I promised, mostly on time."
  ];

  const books = [
    {
      title: "Think & Grow Rich",
      author: "Napoleon Hill",
      impact: "This book gave me real confidence in my vision. It showed me that being a dreamer isn't delusional — it's a sign you're meant to pursue big goals. It validated my way of thinking, sharpened the process of turning dreams into action, and reminded me (as Steve Harvey says) that \"it's impossible to think about the impossible.\""
    },
    {
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      impact: "Helped me understand the deeper strategies behind influence, leadership, and human dynamics. It reshaped how I approach negotiation, positioning, and long-term moves in business."
    },
    {
      title: "The Laws of Human Nature",
      author: "Robert Greene",
      impact: "Taught me to see patterns in people's behavior, motivations, and influence. It strengthened my ability to read situations clearly, build stronger relationships, and lead with awareness."
    }
  ];

  const professionalStrengths = [
    { icon: Sparkles, title: "Sharper UX judgment", description: "Sense quickly when a design feels distracting or off." },
    { icon: BrainCircuit, title: "Faster bug-pattern recognition", description: "Small irregularities stand out immediately." },
    { icon: Zap, title: "Focus-protective systems", description: "I create workspaces and workflows that protect deep work and attention." }
  ];

  const whatItMeans = [
    "Quick to spot patterns or inconsistencies others might overlook",
    "Drawn to clear, calm, uncluttered environments",
    "Naturally focused on reducing noise and distraction in how I communicate and work"
  ];

  return (
    <section id="about" className="py-32 bg-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">About Me</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">Building projects and partnerships across Canada, Tunisia, Europe, and the US.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="bg-pure-white shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-12">
              <h3 className="text-3xl font-light text-charcoal mb-8 text-center">My Story</h3>
              <div className="prose prose-lg max-w-none text-charcoal/70">
                <p className="mb-6 leading-relaxed">I started my career working night shifts at Concentrix, managing KPI pipelines and quickly rising to lead operations for global clients like ByteDance (TikTok), Uber, HP Canada, Xerox, Rona and Capital One. At the same time, I taught full-stack development as a Hacker in Residence at RBK, mentoring students from diverse backgrounds many older than me who trusted me to guide their career transformations.</p>
                <p className="mb-6 leading-relaxed">But I knew I wanted more than stability. I made the difficult decision to leave both roles, giving up a fixed salary and financial balance, to follow my instinct and pursue my vision as an entrepreneur. I started from the ground up with no clients, no network, and no references driven only by passion, skills, and the belief that I could build something meaningful.</p>
                <p className="mb-6 leading-relaxed">That leap taught me more than any classroom or corporate role could. It revealed my entrepreneurial spirit, sharpened my resilience, and gave me the freedom to create, innovate, and lead on my own terms. The corporate world gave me discipline, mentorship, and lessons from inspiring managers; entrepreneurship gave me ownership, creativity, and the chance to push my potential to the fullest.</p>
                <p className="leading-relaxed">Today, I’m building Voyagr while running InnoThink client delivery across Canada, Tunisia, Europe, and the US committed to transparent communication, empowering non-technical stakeholders, and delivering solutions people can trust.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-light text-charcoal text-center mb-12">Professional Journey</h3>
          <div className="space-y-8">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className={`bg-pure-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl hover-lift ${item.current ? 'border-l-4 border-deep-emerald' : ''}`}>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-48 flex-shrink-0">
                        <div className="flex items-center text-deep-emerald font-semibold text-lg mb-2">
                          <Calendar className="w-5 h-5 mr-2" />
                          {item.period}
                        </div>
                        {item.current && <span className="inline-block bg-deep-emerald/20 text-deep-emerald text-xs px-2 py-1 rounded-full">Current</span>}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-deep-emerald transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-charcoal/70 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="flex items-start">
                              <span className="w-2 h-2 bg-soft-rose rounded-full mt-2.5 mr-3 flex-shrink-0" />
                              <span className="text-charcoal/70">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-r from-deep-emerald/5 to-soft-rose/5 border border-subtle p-12 rounded-2xl">
            <CardContent className="text-center">
              <h3 className="text-3xl font-light text-charcoal mb-8">What you need to know about me</h3>
              <div className="prose prose-lg max-w-3xl mx-auto text-charcoal/70 text-left mb-12">
                <p>I've been diagnosed with both misophonia (strong reactions to certain sounds) and trypophobia (discomfort when seeing clusters of small holes). Early on, I worried about sharing this. Now I don't, because it explains a lot about how I naturally work.</p>
              </div>
              <div className="max-w-3xl mx-auto text-left mb-12">
                <h4 className="text-xl font-light text-charcoal mb-4">What it means</h4>
                <ul className="space-y-2">
                  {whatItMeans.map((item, index) => (
                    <li key={index} className="flex items-start text-charcoal/70">
                      <span className="w-2 h-2 bg-soft-rose rounded-full mt-2 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <h4 className="text-2xl font-light text-charcoal mb-8">What this gives me professionally</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {professionalStrengths.map((strength, index) => (
                  <div key={index}>
                    <strength.icon className="w-8 h-8 text-deep-emerald mx-auto mb-4" />
                    <h5 className="text-xl font-semibold text-charcoal mb-2">{strength.title}</h5>
                    <p className="text-charcoal/70">{strength.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-charcoal/60 max-w-2xl mx-auto mt-12">I'm not alone. Misophonia has been linked to figures like Charles Darwin, Franz Kafka, and Anton Chekhov, and publicly discussed by Melissa Gilbert and Kelly Ripa. Kendall Jenner has spoken about living with trypophobia. These examples show how hyper sensitivity, when understood, has always gone hand-in-hand with creativity, insight, and originality.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-r from-deep-emerald/5 to-soft-rose/5 border border-subtle rounded-2xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-light text-charcoal mb-8">Founder Stance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-left"
                  >
                    <span className="w-2 h-2 bg-soft-rose rounded-full mt-2 mr-4 flex-shrink-0" />
                    <span className="text-charcoal/70 font-medium">{value}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Guitar className="w-6 h-6 text-deep-emerald mr-3" />
                  <h3 className="text-2xl font-light text-charcoal">Personal</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed mb-6">Plays guitar.</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-deep-emerald mb-2">Networking Strength</h4>
                    <p className="text-charcoal/70">I actively broker partnerships and open doors. If you're a startup looking to scale (especially on AWS), I can guide the process - from partner benefits to accelerator selection and pitch preparation.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-deep-emerald mb-2">Upcoming</h4>
                    <p className="text-charcoal/70">Founder magazine/blog - UX critiques and product tear-downs on consumer apps (constructive, design-focused).</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-deep-emerald mr-3" />
                  <h3 className="text-2xl font-light text-charcoal">📚 Books That Shaped Me</h3>
                </div>
                <div className="space-y-6">
                  {books.map((book, index) => (
                    <div key={index} className="border-l-2 border-deep-emerald/20 pl-4">
                      <h4 className="font-semibold text-charcoal mb-2">{book.title} – <span className="font-normal text-deep-emerald">{book.author}</span></h4>
                      <p className="text-charcoal/70 text-sm leading-relaxed">{book.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center">
            <div className="flex items-center justify-center text-charcoal/70 font-medium">
              <MapPin className="w-5 h-5 mr-2 text-deep-emerald/80" />
              Operating across Canada • Tunisia • Europe • US
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

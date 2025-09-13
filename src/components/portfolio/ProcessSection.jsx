import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, Target, Clock, Users, Rocket, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ProcessSection() {
  const consultingSteps = [
    { icon: Shield, title: "NDA signed", description: "Secure foundation for confidential discussions." },
    { icon: Lightbulb, title: "Rough sizing & ideas", description: "What you need vs. don't need—strategic scoping." },
    { icon: Target, title: "Deep dive into goals & constraints", description: "Understanding business objectives and technical limitations." },
    { icon: CheckCircle, title: "Free wireframes to align", description: "Visual alignment before development begins." },
    { icon: TrendingUp, title: '"Buffet estimate"', description: "Line-item cost by section/feature for full transparency." },
    { icon: Clock, title: "Share hour estimates", description: "Complete transparency—compare our breakdown anywhere." }
  ];

  const workingSteps = [
    { icon: Clock, title: "1–2 week sprints", description: "Agile delivery with focused, achievable goals." },
    { icon: Users, title: "Daily end-of-day updates", description: "Transparent progress tracking + optional 15-min stand-up." },
    { icon: Target, title: "Weekly showcase", description: "You test & approve next sprint—continuous validation." },
    { icon: Rocket, title: "Deployment-ready demos", description: "Everything demoed is production-ready code." },
    { icon: CheckCircle, title: "Final QA → Launch → Handover", description: "Comprehensive quality control and seamless transition." }
  ];

  const partnershipSteps = [
    { icon: Users, title: "Team Building Support", description: "Recruiting, vetting, code reviews, and onboarding." },
    { icon: TrendingUp, title: "Investment & Growth", description: "VC/angel intros, accelerators, and pitch preparation." },
    { icon: Award, title: "AWS Partnership Benefits", description: "SaaS guidance and $170K+ benefits/funding packages via partners." }
  ];

  const ProcessStep = ({ step, index, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full bg-pure-white/50 hover:shadow-xl transition-all duration-300 border border-subtle hover-lift rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-soft-rose/10 rounded-xl flex-shrink-0">
              <step.icon className="w-6 h-6 text-soft-rose" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-deep-emerald transition-colors">
                {step.title}
              </h4>
              <p className="text-charcoal/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section id="process" className="py-32 bg-pure-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">
            Our
            <span className="block gradient-text font-medium">Process</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Transparent methodology from initial consultation to post-launch partnership. Built for enterprise-level predictability and startup-level agility.
          </p>
        </motion.div>

        <div className="space-y-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-light text-charcoal mb-4">How We Consult</h3>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                Building the foundation for successful project delivery through strategic planning and transparent communication.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultingSteps.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} />
              ))}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-light text-charcoal mb-4">How We Work (Sprints)</h3>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                Agile methodology with continuous delivery and transparent progress tracking for optimal results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {workingSteps.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} delay={0.2} />
              ))}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-light text-charcoal mb-4">How We Partner (Post-launch)</h3>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                Beyond development—strategic support for scaling teams, securing funding, and enterprise growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partnershipSteps.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} delay={0.4} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-deep-emerald/5 to-soft-rose/5 rounded-3xl p-12 border border-subtle text-center"
          >
            <h3 className="text-3xl font-light text-charcoal mb-8">Why This Process Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-deep-emerald mb-3">Transparent</h4>
                <p className="text-charcoal/70">Complete visibility into costs, timelines, and progress—no surprises.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-deep-emerald mb-3">Agile</h4>
                <p className="text-charcoal/70">Flexible adaptation to changing requirements while maintaining quality.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-deep-emerald mb-3">Scalable</h4>
                <p className="text-charcoal/70">From startup MVP to enterprise solution—a process that grows with you.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
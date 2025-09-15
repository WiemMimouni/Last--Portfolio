// src/components/portfolio/ServicesSection.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Target, MessageCircle, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function ServicesSection() {
  const defaultServices = [
    { title: "Launch in 8 Weeks (MVP)", outcome: "A working, investor-ready product in just two months. We strip ideas down to the essentials and deliver a polished MVP in 4 agile sprints.", features: ["Demo-ready in 60 days", "Scope shaped around your top 3–6 priorities", "Weekly approvals to guarantee no surprises", "30-day bug-fix warranty included"], icon: Zap, color: "emerald" },
    { title: "Growth Pod (Monthly Squad)", outcome: "A stable product team without the hiring drama. Plug in a squad that works like your own in-house team, compounding knowledge and output sprint after sprint.", features: ["Ongoing delivery with velocity floor published after 2 sprints", "Risk-free 1-week trial", "Scale up or down with 30 days' notice"], icon: Users, color: "rose" },
    { title: "Fixed Price per Sprint", outcome: "Predictable burn with agile cadence. Each sprint is a defined unit with agreed scope and acceptance criteria.", pricing: "$4,500 per sprint", features: ["Shippable increment guaranteed", "Only pay for accepted work", "Clear sprint planning"], icon: Target, color: "emerald" }
  ];

  const processSteps = [
    { title: "Tell us what you need", description: "Complete the form with your requirements" },
    { title: "We shortlist the best fit", description: "Our team matches you with pre-vetted developers" },
    { title: "1-week trial", description: "Give tasks, we deliver - see the quality firsthand" },
    { title: "Review what worked", description: "Provide feedback and adjust as needed" },
    { title: "2-week commitment", description: "Start long-term collaboration with confidence" }
  ];

  const [devFormData, setDevFormData] = useState({
    dev_type: '',
    how_many: '1',
    framework_needed: 'no',
    when_needed: '',
    name: '',
    email: '',
    phone: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const devFormRef = useRef(null);

  const whoYouGet = [
    "Pre-vetted by our local office",
    "5+ yrs application experience; 3+ yrs core language",
    "Trained in agile; NDAs mandatory",
    "40h/week availability; overlap guaranteed"
  ];

  const tags = ["$25/hr", "Bulk discounts", "NDAs", "Risk-free trial", "Flexible contracts", "Time-logged hours", "5h overlap guaranteed"];

  const faqs = [
    { q: "What if I don't continue after trial?", a: "No problem. The trial is risk-free. You only pay if you decide to continue. It's our way of proving the quality of our developers." },
    { q: "What engagement models do you offer?", a: "We offer flexible models including full-time dedicated developers, part-time resources, and hourly contracts to suit your project needs." },
    { q: "How flexible is availability?", a: "Very flexible. We offer full-time, part-time, and even overtime availability to match your project's pace and deadlines." }
  ];

  const handleDevRequestSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');

    try {
      // ✅ Send to your Vercel function (works on vercel.com and with `vercel dev` locally)
      const res = await fetch('/api/dev-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(devFormData),
      });
      if (!res.ok) throw new Error('Request failed');

      setFormStatus('success');
      devFormRef.current?.reset();
      setDevFormData({
        dev_type: '', how_many: '1', framework_needed: 'no', when_needed: '',
        name: '', email: '', phone: ''
      });
    } catch (error) {
      console.error("Failed to send dev request:", error);
      setErrorMessage("Sorry, something went wrong. Please try again.");
      setFormStatus('error');
    }
  };

  const handleDevFormChange = (e) => {
    const { name, value } = e.target;
    setDevFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDevRadioChange = (value) => {
    setDevFormData(prev => ({ ...prev, framework_needed: value }));
  };

  return (
    <section id="services" className="py-32 bg-light-neutral/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">Services</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">Pick the path that matches your urgency, vision, and appetite for flexibility. Every option is designed to give you clarity, momentum, and trust.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {defaultServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-pure-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 hover-lift rounded-2xl flex flex-col">
                <CardHeader className="p-8 pb-4">
                  <div className={`p-4 rounded-xl mb-6 w-fit ${service.color === 'emerald' ? 'bg-deep-emerald/10' : 'bg-soft-rose/10'}`}>
                    <service.icon className={`w-8 h-8 ${service.color === 'emerald' ? 'text-deep-emerald' : 'text-soft-rose'}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-charcoal mb-4">{service.title}</CardTitle>
                  {service.pricing && <div className="text-2xl font-bold text-deep-emerald mb-4">{service.pricing}</div>}
                </CardHeader>
                <CardContent className="p-8 pt-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <p className="text-charcoal/70 leading-relaxed mb-6"><strong>Outcome:</strong> {service.outcome}</p>
                    {service.features && (
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="w-2 h-2 bg-soft-rose rounded-full mt-2.5 mr-3 flex-shrink-0" />
                            <span className="text-charcoal/70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="space-y-3 mt-auto pt-6">
                    <Button
                      className="w-full btn-primary"
                      onClick={() =>
                        window.open('https://calendly.com/wiem-mimouni-innothink/30min?preview_source=et_card&month=2024-09', '_blank')
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a 20-min intro
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full btn-secondary"
                      onClick={() => window.open('https://wa.me/14378301154', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-pure-white rounded-3xl p-6 sm:p-12 border border-subtle shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light text-charcoal mb-4">DeveloperOnDemand</h3>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">Instantly scale your dev team - pre-vetted, ready to start, $25/hr (bulk discounts).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16 text-center">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-soft-rose text-white rounded-full font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-charcoal mb-1">{step.title}</h4>
                <p className="text-sm text-charcoal/70">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-light-neutral/50 rounded-xl p-8 mb-12">
            <h4 className="text-xl font-semibold text-charcoal mb-6 text-center">Who you get:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {whoYouGet.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-deep-emerald mr-3 flex-shrink-0" />
                  <span className="text-charcoal/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-2xl font-light text-charcoal mb-8 text-center">Get Started</h4>

            <form ref={devFormRef} onSubmit={handleDevRequestSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div>
                <Label htmlFor="dev_type">Developer type</Label>
                <Input
                  name="dev_type"
                  id="dev_type"
                  placeholder="e.g., Frontend React Developer"
                  onChange={handleDevFormChange}
                  value={devFormData.dev_type}
                />
              </div>

              <div>
                <Label htmlFor="how_many">How many</Label>
                <Input
                  name="how_many"
                  id="how_many"
                  type="number"
                  onChange={handleDevFormChange}
                  value={devFormData.how_many}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Framework needed?</Label>
                <RadioGroup
                  name="framework_needed"
                  value={devFormData.framework_needed}
                  onValueChange={handleDevRadioChange}
                  className="flex items-center gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="fw-yes" />
                    <Label htmlFor="fw-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fw-no" />
                    <Label htmlFor="fw-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="when_needed">When needed</Label>
                <Input
                  name="when_needed"
                  id="when_needed"
                  placeholder="e.g., ASAP, Next month, Q2 2024"
                  onChange={handleDevFormChange}
                  value={devFormData.when_needed}
                />
              </div>

              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  onChange={handleDevFormChange}
                  value={devFormData.name}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  onChange={handleDevFormChange}
                  value={devFormData.email}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  name="phone"
                  id="phone"
                  placeholder="Your Phone Number"
                  onChange={handleDevFormChange}
                  value={devFormData.phone}
                />
              </div>

              <div className="md:col-span-2 text-center">
                <Button type="submit" className="btn-primary px-10 py-3 text-base" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                  {formStatus === 'idle' && 'Submit Request →'}
                  {formStatus === 'sending' && 'Submitting...'}
                  {formStatus === 'success' && (<><CheckCircle className="w-5 h-5 mr-2" />Request Sent!</>)}
                  {formStatus === 'error' && 'Try Again'}
                </Button>
              </div>
            </form>

            {formStatus === 'success' && (
              <p className="text-center text-sm text-deep-emerald mt-4">
                Thank you! I've received your request and will be in touch shortly.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-center text-sm text-soft-rose mt-4">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="bg-deep-emerald/10 text-deep-emerald border-deep-emerald/20">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <h4 className="text-2xl font-light text-charcoal mb-8 text-center">Frequently Asked Questions</h4>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

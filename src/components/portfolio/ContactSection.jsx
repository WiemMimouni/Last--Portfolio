
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Calendar, MapPin, Clock, FileText, Globe, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SendEmail } from '@/api/integrations';
import { Message } from '@/api/entities';
import { User } from '@/api/entities';

export default function ContactSection() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: 'partnership'
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const inquiryTypes = [
    { value: 'investment', label: 'Request Voyagr Pitch Deck', icon: FileText, description: 'Get detailed investment information for Voyagr' },
    { value: 'partnership', label: 'Partnership Opportunity', icon: Globe, description: 'Discuss strategic partnerships and collaboration' },
    { value: 'development', label: 'Development Services', icon: Calendar, description: 'Custom software development and technical consulting' },
    { value: 'general', label: 'General Inquiry', icon: Mail, description: 'Other questions or opportunities' }
  ];

  const responseTimes = [
    { icon: FileText, label: 'Investment discussions', time: 'within 12 hours' },
    { icon: Globe, label: 'Partnership inquiries', time: 'within 24 hours' },
    { icon: Calendar, label: 'Development projects', time: 'within 48 hours' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');

    const selectedInquiry = inquiryTypes.find(t => t.value === formData.inquiry_type);
    const fullSubject = formData.subject || `Inquiry: ${selectedInquiry?.label || 'General'}`;

    try {
      // 1. Save the message to the database
      await Message.create({ ...formData, subject: fullSubject });

      // 2. Get the current user to send them an email
      const currentUser = await User.me();

      // 3. Send the email notification TO THE APP OWNER
      if (currentUser && currentUser.email) {
        const emailBody = `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2 style="color: #103B2E;">New Portfolio Inquiry: ${selectedInquiry?.label}</h2>
            <p>You have received a new message from your portfolio contact form.</p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Subject:</strong> ${fullSubject}</p>
            <h3 style="margin-top: 25px; color: #103B2E;">Message:</h3>
            <div style="background-color: #f7f7f7; padding: 15px; border-radius: 8px; white-space: pre-wrap; word-wrap: break-word;">${formData.message}</div>
          </div>
        `;

        await SendEmail({
          to: currentUser.email, // Send to the logged-in app owner
          from_name: 'Portfolio Bot',
          subject: `New Message: ${fullSubject}`,
          body: emailBody,
        });
      }

      setFormStatus('success');
      formRef.current.reset();
      setFormData({ name: '', email: '', subject: '', message: '', inquiry_type: 'partnership' });
    } catch (error) {
      console.error("Failed to send message:", error);
      setErrorMessage("Sorry, something went wrong. Please try again or email me directly.");
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-light-neutral/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">Let's Connect</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">Ready to discuss your next venture, partnership, or development project? Let's explore how we can work together.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <Card className="bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="p-8"><CardTitle className="text-2xl font-light text-charcoal">Send a Message</CardTitle></CardHeader>
              <CardContent className="p-8 pt-0">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">What would you like to discuss?</label>
                    <Select name="inquiry_type" value={formData.inquiry_type} onValueChange={(value) => setFormData({...formData, inquiry_type: value})}>
                      <SelectTrigger><SelectValue placeholder="Select inquiry type" /></SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4 text-charcoal/70" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-charcoal/60 mt-2">{inquiryTypes.find(t => t.value === formData.inquiry_type)?.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md::grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-charcoal/70 mb-2">Name *</label><Input required name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your name"/></div>
                    <div><label className="block text-sm font-medium text-charcoal/70 mb-2">Email *</label><Input type="email" required name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your.email@example.com"/></div>
                  </div>
                  <div><label className="block text-sm font-medium text-charcoal/70 mb-2">Subject *</label><Input required name="subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Brief description of your inquiry"/></div>
                  <div><label className="block text-sm font-medium text-charcoal/70 mb-2">Message *</label><Textarea required name="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell me more about your project, partnership idea, or question…" rows={6}/></div>
                  
                  <Button type="submit" className="w-full btn-primary" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {formStatus === 'idle' && <><Send className="w-4 h-4 mr-2" />Send Message</>}
                    {formStatus === 'sending' && 'Sending...'}
                    {formStatus === 'success' && <><CheckCircle className="w-4 h-4 mr-2" />Message Sent!</>}
                    {formStatus === 'error' && 'Try Again'}
                  </Button>

                  {formStatus === 'success' && <p className="text-center text-sm text-deep-emerald">Thank you for your message. I'll get back to you shortly.</p>}
                  {formStatus === 'error' && <p className="text-center text-sm text-soft-rose">{errorMessage}</p>}
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-8">
            <Card className="bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="p-8"><CardTitle className="text-2xl font-light text-charcoal">Get in Touch</CardTitle></CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="flex items-start space-x-4"><Mail className="w-5 h-5 text-deep-emerald mt-1 flex-shrink-0" /><div><p className="font-medium text-charcoal">Email</p><p className="text-charcoal/70">wiem.mimouni@voyagr.ca (Primary contact)</p><p className="text-charcoal/70">wiemmimouni74@gmail.com (Personal contact)</p></div></div>
                <div className="flex items-start space-x-4"><MessageCircle className="w-5 h-5 text-deep-emerald mt-1 flex-shrink-0" /><div><p className="font-medium text-charcoal">WhatsApp</p><p className="text-charcoal/70">+1 437-830-1154 (Direct messaging)</p></div></div>
                <div className="flex items-start space-x-4"><MapPin className="w-5 h-5 text-deep-emerald mt-1 flex-shrink-0" /><div><p className="font-medium text-charcoal">Location</p><p className="text-charcoal/70">Canada • Tunisia • Europe • US</p><p className="text-sm text-charcoal/60">(Remote-first with global presence)</p></div></div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="btn-primary flex-1" onClick={() => window.open('https://wa.me/14378301154', '_blank')}><MessageCircle className="w-4 h-4 mr-2" />WhatsApp</Button>
                  <Button variant="outline" className="btn-secondary flex-1 group" onClick={() => window.open('https://calendly.com/wiem-mimouni-innothink/30min?preview_source=et_card&month=2024-09', '_blank')}><Calendar className="w-4 h-4 mr-2 text-deep-emerald group-hover:text-white transition-colors" />Schedule a Call</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-pure-white shadow-lg border-0 rounded-2xl">
              <CardHeader className="p-8"><CardTitle className="text-2xl font-light text-charcoal flex items-center"><Clock className="w-6 h-6 mr-3 text-deep-emerald" />Response Time</CardTitle></CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  {responseTimes.map((item, index) => (
                    <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-center justify-between p-3 bg-light-neutral/50 rounded-lg">
                      <div className="flex items-center">
                        <item.icon className="w-4 h-4 text-deep-emerald mr-3" />
                        <span className="text-charcoal/80">{item.label}</span>
                      </div>
                      <span className="text-deep-emerald font-medium">{item.time}</span>
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

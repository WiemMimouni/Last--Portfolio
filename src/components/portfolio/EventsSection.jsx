import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, PlayCircle, Mic } from 'lucide-react';
// ❌ import { Event } from '@/api/entities';
import eventsData from '@/data/events.json'; // ✅ local JSON

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadEvents(); }, []);

  // Load from local JSON (no network/auth)
  const loadEvents = async () => {
    try {
      const norm = (e) => ({
        id: e.id ?? `${e.title || 'event'}-${e.date || 'nodate'}`,
        title: (e.title || '').trim(),
        description: (e.description || '').trim(),
        event_name: (e.event_name || e.name || '').trim(),
        type: (e.type || 'event').toLowerCase(), // keynote | panel | podcast | event
        date: e.date ? String(e.date) : null,
        location: (e.location || '').trim(),
        audience_size: e.audience_size ?? null,
        video_url: e.video_url || '',
      });

      const cleaned = (eventsData ?? []).map(norm);
      cleaned.sort((a, b) => {
        const ta = a.date ? Date.parse(a.date) : 0;
        const tb = b.date ? Date.parse(b.date) : 0;
        return tb - ta; // newest first
      });

      setEvents(cleaned);
    } catch (err) {
      console.error('Error loading local events.json:', err);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'keynote': return Mic;
      case 'panel': return Users;
      case 'podcast': return PlayCircle;
      default: return Calendar;
    }
  };

  if (events.length === 0 && !isLoading) {
    return (
      <section id="events" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-tight">
            Speaking & <span className="block gradient-text font-medium">Events</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Speaking engagements and event appearances will be featured here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-32 bg-white">
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
            Speaking & <span className="block gradient-text font-medium">Events</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Sharing insights on entrepreneurship, innovation, and global business strategy across international platforms.
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => {
            const EventIcon = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover-lift"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-sage/10 rounded-xl">
                      <EventIcon className="w-6 h-6 text-sage" />
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full capitalize">
                      {event.type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {event.title}
                  </h3>

                  {event.event_name && (
                    <div className="text-sage font-medium mb-3">
                      {event.event_name}
                    </div>
                  )}

                  {event.description && (
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-6">
                    {event.date && (
                      <div className="flex items-center text-slate-600 text-sm">
                        <Calendar className="w-4 h-4 mr-3" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 mr-3" />
                        {event.location}
                      </div>
                    )}

                    {event.audience_size && (
                      <div className="flex items-center text-slate-600 text-sm">
                        <Users className="w-4 h-4 mr-3" />
                        {event.audience_size} attendees
                      </div>
                    )}
                  </div>

                  {event.video_url && (
                    <a
                      href={event.video_url.startsWith('http') ? event.video_url : `https://${event.video_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sage hover:text-sage-dark font-medium transition-colors"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Recording
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

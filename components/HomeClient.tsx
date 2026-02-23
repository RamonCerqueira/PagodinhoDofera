'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import {
  EventTypes,
  FinalCta,
  FloatingWhatsApp,
  Gallery,
  Hero,
  InstagramSection,
  NextShow,
  Testimonials,
  VideoSection,
  WeekAvailability
} from '@/components/sections';
import { EventItem, getEvents } from '@/lib/getEvents';

export function HomeClient() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <WeekAvailability events={events} />
      <NextShow events={events} />
      <VideoSection />
      <InstagramSection />
      <EventTypes />
      <Testimonials />
      <Gallery />
      <FinalCta />
      <FloatingWhatsApp />
    </main>
  );
}

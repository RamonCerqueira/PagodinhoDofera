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
import { LoadingScreen } from './LoadingScreen';

export function HomeClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  if (showLoader) return <LoadingScreen />;

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

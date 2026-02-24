'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WeekAvailability } from '@/components/WeekAvailability';
import { NextShow } from '@/components/NextShow';
import { VideoSection } from '@/components/VideoSection';
import { InstagramSection } from '@/components/InstagramSection';
import { EventTypes } from '@/components/EventTypes';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { FinalCta } from '@/components/FinalCta';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BannerSeparator } from '@/components/BannerSeparator';
import { LoadingScreen } from './LoadingScreen';
import { EventItem, getEvents } from '@/lib/getEvents';

export function HomeClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <main className="relative min-h-screen bg-background">
      {showLoader && <LoadingScreen />}
      
      <div className={`transition-opacity duration-700 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Hero />
        <WeekAvailability events={events} />
        <BannerSeparator />
        <NextShow events={events} />
        <VideoSection />
        <InstagramSection />
        <EventTypes />
        <Testimonials />
        <Gallery />
        <FinalCta />
        <FloatingWhatsApp />
      </div>
    </main>
  );
}

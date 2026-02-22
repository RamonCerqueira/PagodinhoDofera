import { Navbar } from '@/components/Navbar';
import { EventTypes, FinalCta, FloatingWhatsApp, Gallery, Hero, NextShow, Testimonials, VideoSection, WeekAvailability } from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WeekAvailability />
      <NextShow />
      <VideoSection />
      <EventTypes />
      <Testimonials />
      <Gallery />
      <FinalCta />
      <FloatingWhatsApp />
    </main>
  );
}

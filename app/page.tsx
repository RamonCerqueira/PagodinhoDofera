import { Navbar } from '@/components/Navbar';
import { EventTypes, FinalCta, FloatingWhatsApp, Gallery, Hero, InstagramSection, NextShow, Testimonials, VideoSection, WeekAvailability } from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WeekAvailability />
      <NextShow />
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

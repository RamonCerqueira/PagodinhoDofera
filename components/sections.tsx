'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { EventItem } from '@/lib/getEvents';
import { fallbackEvents, testimonials } from './data';

const wa = 'https://wa.me/5500000000000?text=Quero%20contratar%20o%20show';

export function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-center">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="https://cdn.coverr.co/videos/coverr-crowd-dancing-at-concert-1579/1080p.mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ember/60" />
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl px-6">
        <p className="mb-2 text-neon">PAGODINHO DO FERA</p>
        <h1 className="mb-4 text-5xl font-bold uppercase md:text-7xl" style={{ fontFamily: 'var(--font-title)' }}>
          O pagode que transforma qualquer evento em festa.
        </h1>
        <p className="mb-8 text-lg">Energia ao vivo para eventos inesquecíveis.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a className="rounded-full bg-green-500 px-7 py-3 font-bold text-black" href={wa}>Contratar Agora</a>
          <a className="rounded-full border border-white px-7 py-3 font-semibold" href="#agenda">Ver Disponibilidade</a>
        </div>
      </motion.div>
    </section>
  );
}

export function WeekAvailability({ events }: { events?: EventItem[] }) {
  const base = events?.length ? events : fallbackEvents;
  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  return (
    <section id="agenda" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="section-title">📅 Essa Semana</h2>
      <div className="grid gap-3 md:grid-cols-7">
        {days.map((day, i) => {
          const event = base[i];
          const active = !!event;
          return (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={day}
              className={`rounded-xl border p-4 ${active ? 'border-neon glow bg-zinc-900' : 'border-zinc-800 bg-zinc-950'}`}
            >
              <p className="mb-2 text-neon">{day}</p>
              {active ? (
                <>
                  <p className="font-semibold">{event.local}</p>
                  <p className="text-sm text-zinc-300">{event.hora}</p>
                </>
              ) : (
                <p className="text-sm">🔥 Disponível para contratação</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function NextShow({ events }: { events?: EventItem[] }) {
  const highlight = useMemo(() => events?.find((e) => e.destaque) || events?.[0] || fallbackEvents[0], [events]);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a')] bg-cover bg-center p-8">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative">
          <p className="text-neon">Próximo Show</p>
          <h3 className="text-4xl font-bold">{highlight.data}</h3>
          <p>{highlight.local} • {highlight.cidade}</p>
          <p className="mt-4 inline-block rounded bg-ember px-3 py-1 text-sm">Contagem regressiva ativa</p>
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section id="vídeos" className="mx-auto max-w-5xl px-6 pb-20 text-center">
      <h2 className="section-title">Veja a energia ao vivo.</h2>
      <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-800">
        <iframe className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="show" allowFullScreen />
      </div>
      <a href={wa} className="mt-6 inline-block rounded-full bg-neon px-8 py-3 font-bold text-black">Quero isso no meu evento</a>
    </section>
  );
}

export function EventTypes() {
  const items = [
    ['🎉', 'Aniversários', 'Set list que levanta convidados e mantém pista lotada.'],
    ['💍', 'Casamentos', 'Entrada elegante e explosão de energia na hora da festa.'],
    ['🏢', 'Corporativos', 'Show alinhado com marca, cronograma e impacto.']
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title">Tipos de Evento</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map(([icon, title, desc]) => (
          <div key={title} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="mb-2 text-2xl">{icon} {title}</h3>
            <p className="text-zinc-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title">Depoimentos</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.nome} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="mb-4 text-zinc-200">“{t.texto}”</p>
            <p className="font-semibold">{t.nome}</p>
            <p className="text-sm text-neon">{t.tipo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title">Galeria</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <img
            key={i}
            className="h-48 w-full rounded-xl object-cover transition hover:scale-[1.03]"
            src={`https://picsum.photos/seed/pagode-${i}/600/400`}
            alt="show"
          />
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contato" className="bg-black px-6 py-20 text-center">
      <h2 className="mb-6 text-4xl font-bold uppercase" style={{ fontFamily: 'var(--font-title)' }}>
        Sua data ainda está disponível?
      </h2>
      <a href={wa} className="rounded-full bg-green-500 px-10 py-4 text-lg font-bold text-black">Fechar no WhatsApp</a>
    </section>
  );
}

export function FloatingWhatsApp() {
  return (
    <a href={wa} className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 px-6 py-3 font-bold text-black shadow-xl">
      WhatsApp
    </a>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { EventItem } from '@/lib/getEvents';
import { fallbackEvents, testimonials } from './data';
import { INSTAGRAM_EMBED_CODES, INSTAGRAM_PROFILE_URL, INSTAGRAM_REEL_URL, WHATSAPP_URL } from '@/lib/constants';

function formatCountdown(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return 'Começou ou já aconteceu';

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${hours}h ${minutes}m`;
}

export function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-center">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="https://cdn.coverr.co/videos/coverr-crowd-dancing-at-concert-1579/1080p.mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ember/60" />
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl px-6">
        <Image src="/logo-pagodinho.svg" alt="Logomarca Pagodinho do Fera" width={280} height={120} className="mx-auto mb-4 h-20 w-auto" priority />
        <h1 className="mb-4 text-5xl font-bold uppercase md:text-7xl" style={{ fontFamily: 'var(--font-title)' }}>
          O pagode que transforma qualquer evento em festa.
        </h1>
        <p className="mb-8 text-lg">Energia ao vivo para eventos inesquecíveis.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a className="rounded-full bg-green-500 px-7 py-3 font-bold text-black" href={WHATSAPP_URL}>Contratar Agora</a>
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
  const [countdown, setCountdown] = useState(() => formatCountdown(`${highlight.data}T${highlight.hora}:00`));

  useEffect(() => {
    setCountdown(formatCountdown(`${highlight.data}T${highlight.hora}:00`));
    const timer = setInterval(() => {
      setCountdown(formatCountdown(`${highlight.data}T${highlight.hora}:00`));
    }, 60000);

    return () => clearInterval(timer);
  }, [highlight.data, highlight.hora]);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a')] bg-cover bg-center p-8">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative">
          <p className="text-neon">Próximo Show</p>
          <h3 className="text-4xl font-bold">{highlight.data}</h3>
          <p>{highlight.local} • {highlight.cidade}</p>
          <p className="mt-4 inline-block rounded bg-ember px-3 py-1 text-sm font-semibold">Faltam {countdown}</p>
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section id="videos" className="mx-auto max-w-5xl px-6 pb-20 text-center">
      <h2 className="section-title">Veja a energia ao vivo.</h2>
      <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-800">
        <iframe className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="show" allowFullScreen />
      </div>
      <a href={WHATSAPP_URL} className="mt-6 inline-block rounded-full bg-neon px-8 py-3 font-bold text-black">Quero isso no meu evento</a>
    </section>
  );
}



export function ReelHighlightSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
      <h2 className="section-title">Reels em Destaque</h2>
      <p className="mb-6 text-zinc-300">Esse vídeo é real do Instagram oficial e mostra a energia do show ao vivo.</p>
      <div className="mx-auto max-w-[420px] overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <iframe
          title="Reel Pagodinho do Fera"
          src={INSTAGRAM_REEL_URL}
          className="h-[600px] w-full"
          allow="encrypted-media"
        />
      </div>
      <a href={WHATSAPP_URL} className="mt-6 inline-block rounded-full bg-neon px-8 py-3 font-bold text-black">Quero esse nível no meu evento</a>
    </section>
  );
}

export function InstagramSection() {
  const hasEmbeds = INSTAGRAM_EMBED_CODES.length > 0;

  return (
    <section id="instagram" className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title">Instagram Oficial</h2>
      <div className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-400">Perfil oficial</p>
        <p className="mt-2 text-2xl font-semibold text-neon">@pagodinhodofera</p>
        <p className="mt-3 text-zinc-300">Feed real com os posts do artista. Sem conteúdo genérico.</p>
        <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-neon px-6 py-3 font-bold text-black">
          Abrir perfil no Instagram
        </a>
      </div>

      {hasEmbeds ? (
        <div className="grid gap-5 md:grid-cols-3">
          {INSTAGRAM_EMBED_CODES.map((code) => (
            <iframe
              key={code}
              title={`Instagram ${code}`}
              src={`https://www.instagram.com/p/${code}/embed`}
              className="h-[440px] w-full rounded-xl border border-zinc-800 bg-black"
              allow="encrypted-media"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          {[
            'Bastidores com público cantando junto',
            'Trechos reais dos shows e energia no palco',
            'Agenda atualizada e chamadas para novos eventos'
          ].map((item) => (
            <a
              key={item}
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-4 transition hover:scale-[1.03] hover:border-neon"
            >
              <p className="text-sm text-zinc-300">{item}</p>
              <p className="mt-6 text-xs uppercase tracking-wide text-neon">Abrir no Instagram ↗</p>
            </a>
          ))}
        </div>
      )}
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
      <a href={WHATSAPP_URL} className="rounded-full bg-green-500 px-10 py-4 text-lg font-bold text-black">Fechar no WhatsApp</a>
    </section>
  );
}

export function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 px-6 py-3 font-bold text-black shadow-xl">
      WhatsApp
    </a>
  );
}

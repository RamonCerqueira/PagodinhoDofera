'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { EventItem } from '@/lib/getEvents';
import { fallbackEvents, testimonials } from './data';
import {
  INSTAGRAM_EMBED_CODES,
  INSTAGRAM_PROFILE_URL,
  WHATSAPP_URL,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_VIDEO_URL
} from '@/lib/constants';

function formatCountdown(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return 'Começou ou já aconteceu';

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${hours}h ${minutes}m`;
}

function getCurrentWeekMap(events: EventItem[]) {
  const now = new Date();
  const monday = new Date(now);
  const day = (now.getDay() + 6) % 7;
  monday.setDate(now.getDate() - day);
  monday.setHours(0, 0, 0, 0);

  const labels = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  return labels.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const iso = date.toISOString().slice(0, 10);
    const event = events.find((item) => item.data === iso);

    return {
      label,
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      event,
      isToday: iso === now.toISOString().slice(0, 10)
    };
  });
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center" id="top">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="https://cdn.coverr.co/videos/coverr-crowd-dancing-at-concert-1579/1080p.mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/70 via-yellow-100/60 to-red-200/60" />
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl px-6 py-24">
        <Image src="/logo-pagodinho.svg" alt="Logomarca Pagodinho do Fera" width={300} height={130} className="mx-auto mb-5 h-20 w-auto md:h-24" priority />
        <h1 className="mb-4 text-5xl font-bold uppercase md:text-7xl" style={{ fontFamily: 'var(--font-title)' }}>
          O pagode que transforma qualquer evento em festa.
        </h1>
        <p className="mb-8 text-lg text-zinc-700">Energia ao vivo para eventos inesquecíveis.</p>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <a className="rounded-full bg-emerald-500 px-7 py-3 font-bold text-black" href={WHATSAPP_URL}>Contratar Agora</a>
          <a className="rounded-full border border-white px-7 py-3 font-semibold" href="#agenda">Ver Disponibilidade</a>
        </div>
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3 rounded-xl border border-white/20 bg-white/70 p-3 backdrop-blur-sm">
          {['+50 eventos realizados', 'Show 100% ao vivo', 'Atendimento em minutos no WhatsApp'].map((item) => (
            <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-zinc-700">{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function WeekAvailability({ events }: { events?: EventItem[] }) {
  const base = events?.length ? events : fallbackEvents;
  const week = getCurrentWeekMap(base);

  return (
    <section id="agenda" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="section-title">📅 Essa Semana</h2>
      <div className="grid gap-3 md:grid-cols-7">
        {week.map(({ label, date, event, isToday }) => {
          const active = !!event;
          return (
            <motion.div whileHover={{ scale: 1.03 }} key={label} className={`rounded-xl border p-4 ${active ? 'border-amber-400 glow bg-amber-50' : 'border-amber-200 bg-white'} ${isToday ? 'ring-2 ring-emerald-400' : ''}`}>
              <p className="text-amber-500">{label}</p>
              <p className="mb-2 text-xs text-zinc-500">{date}</p>
              {isToday && <p className="mb-2 text-xs font-semibold text-emerald-600">HOJE</p>}
              {active ? (
                <>
                  <p className="font-semibold">{event.local}</p>
                  <p className="text-sm text-zinc-700">{event.hora}</p>
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
    const timer = setInterval(() => setCountdown(formatCountdown(`${highlight.data}T${highlight.hora}:00`)), 60000);
    return () => clearInterval(timer);
  }, [highlight.data, highlight.hora]);

  const formattedDate = new Date(`${highlight.data}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a')] bg-cover bg-center p-8">
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative">
          <p className="text-amber-500">Próximo Show</p>
          <h3 className="text-4xl font-bold capitalize">{formattedDate}</h3>
          <p>{highlight.local} • {highlight.cidade} • {highlight.hora}</p>
          <p className="mt-4 inline-block rounded bg-ember px-3 py-1 text-sm font-semibold">Faltam {countdown}</p>
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section id="videos" className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title text-center">Veja a energia ao vivo.</h2>
      <div className="grid items-center gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="mx-auto w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          <div className="aspect-video">
            <iframe
              title="YouTube Pagodinho do Fera"
              src={YOUTUBE_VIDEO_URL}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className="soft-panel p-6">
          <h3 className="mb-4 text-2xl font-semibold">Canal oficial no YouTube</h3>
          <ul className="mb-6 space-y-2 text-zinc-700">
            <li>• Vídeos reais de shows e bastidores</li>
            <li>• Prova social forte para fechar contrato</li>
            <li>• Conteúdo atualizado direto do canal</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} className="inline-block rounded-full bg-neon px-8 py-3 font-bold text-black">Quero isso no meu evento</a>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-zinc-500 px-6 py-3 font-semibold text-zinc-800">Abrir canal</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InstagramSection() {
  const hasEmbeds = INSTAGRAM_EMBED_CODES.length > 0;

  return (
    <section id="instagram" className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title">Instagram Oficial</h2>
      <div className="mb-5 soft-panel p-6">
        <p className="text-sm text-zinc-400">Perfil oficial</p>
        <p className="mt-2 text-2xl font-semibold text-amber-500">@pagodinhodofera</p>
        <p className="mt-3 text-zinc-700">Conteúdo social ativo toda semana, com reels reais dos shows.</p>
        <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-neon px-6 py-3 font-bold text-black">
          Abrir perfil no Instagram
        </a>
      </div>

      {hasEmbeds ? (
        <div className="grid gap-5 md:grid-cols-3">
          {INSTAGRAM_EMBED_CODES.map((code) => (
            <iframe key={code} title={`Instagram ${code}`} src={`https://www.instagram.com/p/${code}/embed`} className="h-[440px] w-full rounded-xl border border-zinc-800 bg-black" allow="encrypted-media" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          {['Bastidores com público cantando junto', 'Trechos reais dos shows e energia no palco', 'Agenda atualizada e chamadas para novos eventos'].map((item) => (
            <a key={item} href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-amber-200 bg-white p-4 transition hover:scale-[1.03] hover:border-amber-400">
              <p className="text-sm text-zinc-700">{item}</p>
              <p className="mt-6 text-xs uppercase tracking-wide text-amber-500">Abrir no Instagram ↗</p>
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
          <motion.div whileHover={{ scale: 1.03 }} key={title} className="soft-panel p-6">
            <h3 className="mb-2 text-2xl">{icon} {title}</h3>
            <p className="text-zinc-700">{desc}</p>
          </motion.div>
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
          <motion.div whileHover={{ scale: 1.03 }} key={t.nome} className="soft-panel p-5">
            <p className="mb-4 text-zinc-700">“{t.texto}”</p>
            <p className="font-semibold">{t.nome}</p>
            <p className="text-sm text-amber-500">{t.tipo}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Gallery() {
  const photos = [
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
    'https://images.unsplash.com/photo-1521334884684-d80222895322',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee',
    'https://images.unsplash.com/photo-1464375117522-1311dd7d0b51'
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="section-title">Galeria</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {photos.map((url, i) => (
          <img key={url} className="h-48 w-full rounded-xl object-cover transition hover:scale-[1.03]" src={`${url}?auto=format&fit=crop&w=900&q=80`} alt={`show-${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contato" className="bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-20 text-center">
      <h2 className="mb-6 text-4xl font-bold uppercase" style={{ fontFamily: 'var(--font-title)' }}>
        Sua data ainda está disponível?
      </h2>
      <p className="mb-6 text-zinc-700">Agenda limitada. Garanta o show agora e receba resposta rápida no WhatsApp.</p>
      <a href={WHATSAPP_URL} className="rounded-full bg-emerald-500 px-10 py-4 text-lg font-bold text-black">Fechar no WhatsApp</a>
    </section>
  );
}

export function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-500 px-6 py-3 font-bold text-black shadow-xl">
      WhatsApp
    </a>
  );
}

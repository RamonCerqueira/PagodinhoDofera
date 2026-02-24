'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';
import { EventItem } from '@/lib/getEvents';
import { fallbackEvents } from '@/components/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function formatCountdown(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return 'Começou ou já aconteceu';

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${hours}h ${minutes}m`;
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
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        
        <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <Badge variant="gold" className="mb-4">Próximo Show</Badge>
            <h3 className="text-5xl md:text-7xl font-bold capitalize text-white mb-2">{formattedDate}</h3>
            <div className="flex flex-col gap-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-xl">{highlight.local} • {highlight.cidade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-xl">{highlight.hora}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 min-w-[200px]">
            <span className="text-sm uppercase tracking-widest text-zinc-400 mb-2">Faltam apenas</span>
            <span className="text-3xl font-mono font-bold text-primary">{countdown}</span>
            <Button className="mt-6 w-full bg-primary text-black hover:bg-primary/90 font-bold" asChild>
               <a href={WHATSAPP_URL}>Garantir Lugar</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

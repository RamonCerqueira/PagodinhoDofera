'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Calendar, MessageCircle, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventItem } from '@/lib/getEvents';
import { fallbackEvents } from '@/components/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgendaModal } from '@/components/AgendaModal';
import { WHATSAPP_URL } from '@/lib/constants';

function getExtendedDates(events: EventItem[]) {
  const now = new Date();
  const dates = [];
  const daysBefore = 5;
  const daysAfter = 15;

  const shortLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  const labels = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];

  for (let i = -daysBefore; i <= daysAfter; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    date.setHours(0, 0, 0, 0);
    
    const iso = date.toISOString().slice(0, 10);
    const event = events.find((item) => item.data === iso);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long' }).toUpperCase();
    const dayOfWeek = date.getDay();

    dates.push({
      label: labels[dayOfWeek],
      shortLabel: shortLabels[dayOfWeek],
      dayNumber: date.getDate().toString().padStart(2, '0'),
      monthName,
      fullDate: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }),
      iso,
      event,
      isToday: i === 0,
      isPast: i < 0
    });
  }
  return dates;
}

export function WeekAvailability({ events }: { events?: EventItem[] }) {
  const base = events?.length ? events : fallbackEvents;
  const dateList = getExtendedDates(base);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Scroll to "Today" on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Each card is ~260px + 24px gap = ~284px
      // 5 days before means index 5 is today. 5 * 284 = ~1420px
      // A bit of offset to center it better
      const cardWidth = 284;
      const todayIndex = 5;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPos = (todayIndex * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
      
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: 'smooth'
      });
    }
  }, []);

  const shortLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="agenda" className="relative py-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">
            Agenda <span className="text-primary">Semanal</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">Navegue pelas datas e garanta seu show</p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={scrollLeft}
            variant="outline" 
            size="icon"
            className="rounded-full border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            onClick={scrollRight}
            variant="outline" 
            size="icon"
            className="rounded-full border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="outline" 
            className="rounded-full px-6 border-primary/20 hover:bg-primary/10 hover:text-primary gap-2 ml-4 hidden md:flex"
          >
            <Calendar className="h-4 w-4" /> Ver Agenda Completa
          </Button>
        </div>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto pb-8 pt-8 md:pb-12 md:pt-12 px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          if (!scrollContainerRef.current) return;
          isDraggingRef.current = true;
          startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
          scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
        }}
        onMouseLeave={() => { isDraggingRef.current = false; }}
        onMouseUp={() => { isDraggingRef.current = false; }}
        onMouseMove={(e) => {
          if (!isDraggingRef.current || !scrollContainerRef.current) return;
          e.preventDefault();
          const x = e.pageX - scrollContainerRef.current.offsetLeft;
          const walk = (x - startXRef.current) * 1; // scroll-fast factor
          scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
        }}
      >
        <div className="flex justify-start gap-6 min-w-max px-6">
          {dateList.map(({ label, shortLabel, dayNumber, monthName, fullDate, event, isToday, isPast }, index) => {
            const active = !!event;
            const available = !active && !isPast;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <motion.div 
                key={`${label}-${dayNumber}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                animate={{
                  scale: isHovered ? 1.05 : (isAnyHovered ? 0.95 : 1),
                  opacity: isPast ? 0.5 : (isAnyHovered && !isHovered ? 0.6 : 1),
                  y: isHovered ? -10 : 0,
                  filter: isPast ? 'grayscale(100%)' : 'none'
                }}
                className={`
                  relative flex flex-col items-center justify-between
                  w-[220px] h-[320px] md:w-[260px] md:h-[400px] rounded-[1.75rem] md:rounded-[2rem] p-4 md:p-6 shadow-2xl transition-all duration-300 select-none
                  ${active 
                    ? 'bg-zinc-900 border-2 border-primary/50' 
                    : available 
                      ? 'bg-white border-2 border-zinc-100' 
                      : 'bg-zinc-100 opacity-50'
                  }
                  ${isToday ? 'ring-4 ring-primary ring-offset-4 ring-offset-background z-10' : ''}
                `}
              >
                {/* Top Badge Month */}
                <div className={`
                  px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4
                  ${active ? 'bg-primary text-black' : (isPast ? 'bg-zinc-400 text-white' : 'bg-red-500 text-white')}
                `}>
                  {isPast ? 'PASSOU' : monthName}
                </div>

                {/* Big Number */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <span className={`
                    text-[6rem] md:text-[8rem] leading-none font-bold tracking-tighter
                    ${active ? 'text-white' : 'text-zinc-900'}
                    font-heading drop-shadow-xl
                  `}>
                    {dayNumber}
                  </span>
                  
                  <span className={`
                    text-lg md:text-xl font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase mt-2
                    ${active ? 'text-primary' : 'text-zinc-400'}
                  `}>
                    {shortLabel}
                  </span>
                </div>

                {/* Event Info or Action */}
                <div className="w-full mt-6">
                  {active ? (
                    <div className="text-center">
                       <div className="flex items-center justify-center gap-2 text-zinc-300 text-sm mb-1">
                        <MapPin className="h-3 w-3 text-primary" /> {event.local}
                       </div>
                       <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
                        <Clock className="h-3 w-3" /> {event.hora} • {event.cidade}
                       </div>
                    </div>
                  ) : available ? (
                    <Button 
                      className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 md:h-12 shadow-lg shadow-emerald-900/20"
                      asChild
                    >
                      <a 
                        href={`${WHATSAPP_URL}&text=Olá, vi que o dia ${fullDate} está disponível na agenda. Gostaria de saber mais informações.`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" /> Contratar Dia
                      </a>
                    </Button>
                  ) : (
                    <div className="w-full h-12 flex items-center justify-center text-zinc-400 font-bold text-sm uppercase tracking-wider">
                      Sem agenda
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="md:hidden px-6 mt-4">
        <Button 
            onClick={() => setIsModalOpen(true)}
            variant="outline" 
            className="w-full rounded-full px-6 border-primary/20 hover:bg-primary/10 hover:text-primary gap-2"
        >
            <Calendar className="h-4 w-4" /> Ver Agenda Completa
        </Button>
      </div>

      <AgendaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} events={base} />
    </section>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import { EventItem } from '@/lib/getEvents';
import { fallbackEvents } from '@/components/data';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WHATSAPP_URL } from '@/lib/constants';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events?: EventItem[];
}

export function CalendarModal({ isOpen, onClose, events }: CalendarModalProps) {
  const allEvents = events?.length ? events : fallbackEvents;
  
  // Group by month
  const groupedEvents = useMemo(() => {
    const groups: Record<string, EventItem[]> = {};
    
    allEvents.forEach(event => {
      const date = new Date(event.data);
      const monthYear = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      const key = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
    });
    
    return groups;
  }, [allEvents]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agenda Completa">
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <div key={month}>
            <h4 className="text-lg font-bold text-amber-500 mb-4 sticky top-0 bg-zinc-900 py-2 z-10 border-b border-zinc-800">
              {month}
            </h4>
            <div className="space-y-4">
              {monthEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-800/50 p-4 transition-colors hover:border-amber-500/50 hover:bg-zinc-800"
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-white text-lg">{event.titulo}</h5>
                    {event.destaque && <Badge className="bg-amber-500 text-black text-[10px]">Destaque</Badge>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-500" />
                      <span>{new Date(event.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>{event.hora}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      <span>{event.local}, {event.cidade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-zinc-800">
          <p className="text-center text-sm text-zinc-500 mb-4">
            Quer o Pagodinho do Fera no seu evento?
          </p>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Solicitar Orçamento
            </a>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

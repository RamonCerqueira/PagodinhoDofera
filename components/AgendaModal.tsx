'use client';

import { useMemo, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { EventItem } from '@/lib/getEvents';
import { WHATSAPP_URL } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function toISO(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString().slice(0, 10);
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function getMonthMatrix(base: Date) {
  const first = startOfMonth(base);
  const last = endOfMonth(base);
  const firstWeekday = first.getDay();
  const daysInMonth = last.getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(base.getFullYear(), base.getMonth(), d));
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

export function AgendaModal({ isOpen, onClose, events }: { isOpen: boolean; onClose: () => void; events: EventItem[] }) {
  const [view, setView] = useState<'semana' | 'mes'>('mes');
  const [cursor, setCursor] = useState<Date>(new Date());
  const isoSet = useMemo(() => new Set(events.map((e) => e.data)), [events]);

  const monthName = cursor.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();
  const monthMatrix = useMemo(() => getMonthMatrix(cursor), [cursor]);

  const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const startOfWeek = useMemo(() => {
    const d = new Date();
    const diff = d.getDay();
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  function openWhatsApp(date: Date) {
    const txt = encodeURIComponent(`Olá! Quero agendar o Pagodinho do Fera para o dia ${date.toLocaleDateString('pt-BR')}. Está disponível?`);
    window.open(`${WHATSAPP_URL}&text=${txt}`, '_blank');
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agenda Completa">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex rounded-full bg-zinc-900 p-1">
          <Button variant={view === 'semana' ? 'default' : 'ghost'} onClick={() => setView('semana')} className="rounded-full px-4">
            Semanal
          </Button>
          <Button variant={view === 'mes' ? 'default' : 'ghost'} onClick={() => setView('mes')} className="rounded-full px-4">
            Mensal
          </Button>
        </div>
        {view === 'mes' && (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="rounded-full" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[180px] text-center font-bold">{monthName}</div>
            <Button size="icon" variant="outline" className="rounded-full" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {view === 'mes' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-7 text-center text-xs text-zinc-400">
            {weekDays.map((w) => (
              <div key={w} className="py-2">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {monthMatrix.flatMap((row, ri) =>
              row.map((cell, ci) => {
                if (!cell) {
                  return <div key={`${ri}-${ci}`} className="h-24 rounded-xl border border-zinc-900 bg-zinc-950" />;
                }
                const iso = toISO(cell);
                const busy = isoSet.has(iso);
                return (
                  <button
                    key={iso}
                    onClick={() => openWhatsApp(cell)}
                    className={`h-24 rounded-xl border flex flex-col items-center justify-center gap-1 transition-colors ${
                      busy ? 'border-rose-500/50 bg-rose-500/10 text-rose-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    <span className="text-2xl font-bold">{cell.getDate()}</span>
                    <span className="text-[10px] uppercase">{busy ? 'Reservado' : 'Disponível'}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {week.map((d) => {
            const iso = toISO(d);
            const busy = isoSet.has(iso);
            return (
              <div key={iso} className={`flex items-center justify-between rounded-xl border p-4 ${busy ? 'border-rose-500/50 bg-rose-500/10' : 'border-emerald-500/30 bg-emerald-500/10'}`}>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center text-lg font-bold">{d.getDate().toString().padStart(2, '0')}</div>
                  <div>
                    <div className="text-sm font-bold">{d.toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase()}</div>
                    <div className="text-xs text-zinc-400">{d.toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>
                <Button onClick={() => openWhatsApp(d)} className={`${busy ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-full`}>
                  {busy ? 'Ver detalhes' : 'Agendar'}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}

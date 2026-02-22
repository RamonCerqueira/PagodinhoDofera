import { EventItem } from '@/lib/getEvents';

export const fallbackEvents: EventItem[] = [
  { id: '1', titulo: 'Pagode no Rooftop', data: '2026-02-27', hora: '22:00', cidade: 'Salvador', local: 'Rooftop Barra', destaque: true },
  { id: '2', titulo: 'Casamento Premium', data: '2026-02-28', hora: '20:00', cidade: 'Salvador', local: 'Casa Amarela', destaque: false },
  { id: '3', titulo: 'Corporativo Sunset', data: '2026-03-01', hora: '18:00', cidade: 'Lauro de Freitas', local: 'Beach Club', destaque: false }
];

export const testimonials = [
  { nome: 'Juliana M.', tipo: 'Casamento', texto: 'A pista ficou lotada do início ao fim. Energia impecável!' },
  { nome: 'Rafael S.', tipo: 'Aniversário', texto: 'Transformaram minha festa numa experiência inesquecível.' },
  { nome: 'Ana C.', tipo: 'Corporativo', texto: 'Profissionais, pontuais e com presença de palco absurda.' }
];

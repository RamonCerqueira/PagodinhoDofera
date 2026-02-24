import { EventItem } from '@/lib/getEvents';

export const fallbackEvents: EventItem[] = [
  { 
    id: '1', 
    titulo: 'Pagode no Rooftop', 
    data: '2026-02-27', 
    hora: '22:00', 
    cidade: 'Salvador', 
    local: 'Rooftop Barra', 
    destaque: true 
  },
  { 
    id: '2', 
    titulo: 'Casamento Premium', 
    data: '2026-02-28', 
    hora: '20:00', 
    cidade: 'Salvador', 
    local: 'Casa Amarela', 
    destaque: false 
  },
  { 
    id: '3', 
    titulo: 'Corporativo Sunset', 
    data: '2026-03-01', 
    hora: '18:00', 
    cidade: 'Lauro de Freitas', 
    local: 'Beach Club', 
    destaque: false 
  },
  { 
    id: '4', 
    titulo: 'Aniversário Privado', 
    data: '2026-03-05', 
    hora: '21:00', 
    cidade: 'Salvador', 
    local: 'Vila do Atlântico', 
    destaque: false 
  }
];

export const testimonials = [
  { 
    nome: 'Juliana Mendes', 
    tipo: 'Casamento', 
    texto: 'A pista ficou lotada do início ao fim! A energia do Fera é surreal, transformou nossa festa num verdadeiro espetáculo. Recomendo de olhos fechados!' 
  },
  { 
    nome: 'Rafael Santos', 
    tipo: 'Aniversário', 
    texto: 'Contratei para meus 30 anos e foi a melhor escolha. Repertório atualizado, banda animada e todo mundo elogiou. Profissionalismo nota 1000.' 
  },
  { 
    nome: 'Ana Clara', 
    tipo: 'Corporativo', 
    texto: 'Pontuais, organizados e com uma presença de palco absurda. O evento da empresa ganhou outra vida com o show deles. Já queremos de novo!' 
  }
];

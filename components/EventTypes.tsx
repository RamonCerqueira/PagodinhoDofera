'use client';

import { motion } from 'framer-motion';
import { PartyPopper, HeartHandshake, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EventTypes() {
  const items = [
    {
      icon: <PartyPopper className="h-10 w-10 text-primary mb-4" />,
      title: 'Aniversários',
      desc: 'Set list que levanta convidados e mantém pista lotada. Tornamos seu dia inesquecível.'
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-primary mb-4" />,
      title: 'Casamentos',
      desc: 'Entrada elegante e explosão de energia na hora da festa. O equilíbrio perfeito.'
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
      title: 'Corporativos',
      desc: 'Show alinhado com a marca, cronograma e impacto. Profissionalismo do início ao fim.'
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold uppercase mb-4">Tipos de Evento</h2>
        <p className="text-muted-foreground">Personalizamos o show para cada ocasião</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <motion.div whileHover={{ y: -5 }} key={item.title}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4 ring-1 ring-primary/20">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

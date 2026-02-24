'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/components/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <h2 className="text-4xl font-bold uppercase mb-12 text-center">O que dizem sobre nós</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div whileHover={{ y: -5 }} key={i}>
            <Card className="h-full border-none bg-gradient-to-br from-zinc-900 to-black text-white shadow-xl">
              <CardContent className="p-8 relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-white/10" />
                <div className="mb-6 flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="mb-6 text-zinc-300 text-lg italic">{t.texto}</p>
                <div>
                  <p className="font-bold text-white text-lg">{t.nome}</p>
                  <Badge variant="secondary" className="mt-2">{t.tipo}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

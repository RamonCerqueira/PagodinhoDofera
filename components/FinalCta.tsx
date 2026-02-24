'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden py-32 px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-white">
        <h2 className="mb-6 text-5xl md:text-6xl font-bold uppercase tracking-tight">
          Sua data ainda está disponível?
        </h2>
        <p className="mb-10 text-xl md:text-2xl text-white/90 font-light">
          Agenda limitada. Garanta o show agora e receba resposta rápida no WhatsApp.
        </p>
        <Button 
          size="lg" 
          className="rounded-full bg-white text-orange-600 hover:bg-gray-100 text-xl font-bold px-12 py-8 shadow-2xl transition-transform hover:scale-105" 
          asChild
        >
          <a href={WHATSAPP_URL}>
            <MessageCircle className="mr-3 h-6 w-6" /> Fechar no WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-center" id="top">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="https://cdn.coverr.co/videos/coverr-crowd-dancing-at-concert-1579/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl px-6 py-24 flex flex-col items-center"
      >
        <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-primary/20 animate-float">
           <Image 
            src="/images/logo.jpg" 
            alt="Logomarca Pagodinho do Fera" 
            fill
            className="object-cover"
            priority 
          />
        </div>
        
        <h1 className="mb-6 text-5xl font-bold uppercase md:text-8xl tracking-tighter text-white drop-shadow-2xl">
          O pagode que <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600">transforma</span>
        </h1>
        
        <p className="mb-10 text-xl md:text-2xl text-zinc-300 max-w-2xl font-light drop-shadow-md">
          Energia ao vivo para eventos inesquecíveis. Leve o melhor do samba e pagode para sua festa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Button 
            size="lg" 
            className="w-full sm:w-auto rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-bold shadow-lg shadow-emerald-900/20 hover:scale-105 transition-all duration-300" 
            asChild
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-6 w-6" /> Contratar Agora
            </a>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300" 
            asChild
          >
            <a href="#agenda">
              Ver Agenda <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {['+ Show 100% Ao Vivo', '+ Repertório Atualizado', '+ Energia Surreal'].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
            >
              <Badge variant="outline" className="px-4 py-2 text-sm border-white/10 text-zinc-400 bg-black/40 backdrop-blur-md">
                {item}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

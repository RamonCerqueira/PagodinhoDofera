'use client';

import { Youtube, Play } from 'lucide-react';
import { YOUTUBE_VIDEO_URL, WHATSAPP_URL, YOUTUBE_CHANNEL_URL } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function VideoSection() {
  return (
    <section id="videos" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="text-center mb-16">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">Veja a energia ao vivo</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Confira um pouco do que acontece nos nossos shows.</p>
      </div>
      
      <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
          <div className="aspect-video bg-black">
            <iframe
              title="YouTube Pagodinho do Fera"
              src={YOUTUBE_VIDEO_URL}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {/* Overlay to detect click and pause music */}
            <div 
              className="absolute inset-0 bg-transparent cursor-pointer z-10"
              onClick={(e) => {
                 window.dispatchEvent(new Event('pause-music-player'));
                 // Hide overlay to allow interaction with iframe underneath
                 e.currentTarget.style.display = 'none';
              }}
              title="Clique para assistir e pausar o player de música"
            />
          </div>
        </div>
        
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Canal Oficial</h3>
              <p className="text-sm text-muted-foreground">Inscreva-se e acompanhe</p>
            </div>
          </div>
          
          <ul className="mb-8 space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3">
              <Play className="h-4 w-4 text-primary" /> Vídeos reais de shows e bastidores
            </li>
            <li className="flex items-center gap-3">
              <Play className="h-4 w-4 text-primary" /> Energia contagiante do público
            </li>
            <li className="flex items-center gap-3">
              <Play className="h-4 w-4 text-primary" /> Repertório atualizado
            </li>
          </ul>
          
          <div className="flex flex-col gap-3">
            <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold" asChild>
              <a href={WHATSAPP_URL}>Quero essa energia no meu evento</a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
                Visitar Canal
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

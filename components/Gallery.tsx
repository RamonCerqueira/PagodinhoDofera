'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Gallery() {
  const photos = [
    '/images/galeria/1.jpg',
    '/images/galeria/2.jpg',
    '/images/galeria/3.jpg',
    '/images/galeria/4.jpg',
    '/images/galeria/5.jpg',
    '/images/galeria/6.jpg'
  ];
  const scroller = useRef<HTMLDivElement>(null);
  const borders = ['border-red-500','border-orange-500','border-amber-500','border-emerald-500','border-sky-500','border-violet-500'];

  return (
    <section className="relative w-full px-0 py-0">
      <h2 className="text-4xl font-bold uppercase px-4 md:px-6 pt-8 md:pt-12 pb-4">Galeria</h2>
      <div className="relative">
        <div 
          ref={scroller}
          className="w-full overflow-x-auto snap-x snap-mandatory px-4 md:px-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          <div className="flex gap-6 w-max items-center">
            {photos.map((url, i) => (
              <motion.div
                key={url}
                whileHover={{ scale: 1.01 }}
                className={`relative shrink-0 snap-center rounded-3xl border-4 ${borders[i % borders.length]} bg-white overflow-hidden inline-flex items-center justify-center p-3`}
              >
                <img
                  src={url}
                  alt={`show-${i + 1}`}
                  className="h-auto w-auto max-h-[80vh] max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] object-contain"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex absolute inset-y-0 left-2 items-center">
          <button
            onClick={() => scroller.current?.scrollBy({ left: -(scroller.current.clientWidth * 0.8), behavior: 'smooth' })}
            className="h-12 w-12 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/10 hover:bg-black/80"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden md:flex absolute inset-y-0 right-2 items-center">
          <button
            onClick={() => scroller.current?.scrollBy({ left: (scroller.current.clientWidth * 0.8), behavior: 'smooth' })}
            className="h-12 w-12 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/10 hover:bg-black/80"
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

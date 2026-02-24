'use client';

import { motion } from 'framer-motion';

export function Gallery() {
  const photos = [
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
    'https://images.unsplash.com/photo-1521334884684-d80222895322',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee',
    'https://images.unsplash.com/photo-1464375117522-1311dd7d0b51'
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <h2 className="text-4xl font-bold uppercase mb-12">Galeria</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((url, i) => (
          <motion.div 
            key={url} 
            whileHover={{ scale: 1.02 }} 
            className="overflow-hidden rounded-2xl shadow-lg cursor-pointer group relative aspect-[4/3]"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
            <img 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              src={`${url}?auto=format&fit=crop&w=900&q=80`} 
              alt={`show-${i + 1}`} 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

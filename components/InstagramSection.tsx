'use client';

import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { INSTAGRAM_PROFILE_URL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

const INSTAGRAM_POSTS = [
  { id: 1, likes: 1240, comments: 45, image: '/images/instagram/1.jpg' }, // crowd
  { id: 2, likes: 856, comments: 32, image: '/images/instagram/2.jpg' }, // performance
  { id: 3, likes: 2100, comments: 120, image: '/images/instagram/3.jpg' }, // music vibes
  { id: 4, likes: 945, comments: 28, image: '/images/instagram/4.jpg' }, // crowd
  { id: 5, likes: 1500, comments: 60, image: '/images/instagram/5.jpg' }, // celebration
  { id: 6, likes: 3200, comments: 150, image: '/images/instagram/6.jpg' }, // concert
];

export function InstagramSection() {
  return (
    <section id="instagram" className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
              <Instagram className="h-8 w-8 text-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight">@pagodinhodofera</h2>
            <p className="text-muted-foreground">Bastidores, agenda e muita resenha.</p>
          </div>
        </div>
        <Button 
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 gap-2 shadow-lg shadow-pink-500/20" 
          asChild
        >
          <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer">
            <Instagram className="h-4 w-4" /> Seguir no Instagram
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        {INSTAGRAM_POSTS.map((post, i) => (
          <motion.a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            key={post.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900 cursor-pointer block"
          >
            <Image
              src={post.image}
              alt="Instagram Post"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 16vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 text-white z-10">
              <div className="flex items-center gap-2 font-bold">
                <Heart className="h-5 w-5 fill-white" /> {post.likes}
              </div>
              <div className="flex items-center gap-2 font-bold">
                <MessageCircle className="h-5 w-5 fill-white" /> {post.comments}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <ExternalLink className="h-3 w-3" /> Clique nos posts para ver o conteúdo real
        </p>
      </div>
    </section>
  );
}

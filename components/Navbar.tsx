'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WHATSAPP_URL } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? 'bg-black/85 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-3">
          <Image src="/logo-pagodinho.svg" alt="Logomarca Pagodinho do Fera" width={120} height={52} className="h-10 w-auto" priority />
        </Link>
        <div className="hidden gap-6 text-sm md:flex">
          {['Agenda', 'Vídeos', 'Instagram', 'Contato'].map((item) => (
            <Link key={item} href={`#${item === 'Vídeos' ? 'videos' : item.toLowerCase()}`} className="hover:text-neon">
              {item}
            </Link>
          ))}
        </div>
        <a href={WHATSAPP_URL} className="rounded-full bg-neon px-5 py-2 text-sm font-bold text-black">Contratar</a>
      </nav>
    </motion.header>
  );
}

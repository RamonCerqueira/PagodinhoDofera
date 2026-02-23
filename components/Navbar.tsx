'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WHATSAPP_URL } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme-dark') === '1';
    setDark(saved);
    document.body.classList.toggle('theme-dark', saved);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme-dark', next ? '1' : '0');
    document.body.classList.toggle('theme-dark', next);
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-3">
          <Image src="/logo-pagodinho.svg" alt="Logomarca Pagodinho do Fera" width={120} height={52} className="h-10 w-auto rounded" priority />
        </Link>
        <div className="hidden gap-6 text-sm md:flex">
          {['Agenda', 'Vídeos', 'Instagram', 'Contato'].map((item) => (
            <Link key={item} href={`#${item === 'Vídeos' ? 'videos' : item.toLowerCase()}`} className="hover:text-amber-500">
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-full border border-zinc-400 px-3 py-1 text-xs font-semibold">
            {dark ? '☀️ Claro' : '🌙 Escuro'}
          </button>
          <a href={WHATSAPP_URL} className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-black">Contratar</a>
        </div>
      </nav>
    </motion.header>
  );
}

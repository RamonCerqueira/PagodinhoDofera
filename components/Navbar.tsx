'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
        <div className="text-xl font-bold tracking-wider text-neon">PAGODINHO DO FERA</div>
        <div className="hidden gap-6 text-sm md:flex">
          {['Agenda', 'Vídeos', 'Sobre', 'Contato'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-neon">
              {item}
            </Link>
          ))}
        </div>
        <a href="https://wa.me/5500000000000" className="rounded-full bg-neon px-5 py-2 text-sm font-bold text-black">Contratar</a>
      </nav>
    </motion.header>
  );
}

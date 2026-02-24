'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WHATSAPP_URL } from '@/lib/constants';
import { Moon, Sun, User } from 'lucide-react';
import { Button } from './ui/button';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';

import { MusicPlayer } from './MusicPlayer';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true); // Default to dark for premium feel
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    
    // Check local storage or system preference
    const saved = localStorage.getItem('theme-dark');
    const isDark = saved === null ? true : saved === '1'; // Default true if not set
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme-dark', next ? '1' : '0');
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="#top" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image 
            src="/images/logo.jpg" 
            alt="Pagodinho do Fera" 
            width={120} 
            height={52} 
            className="h-12 w-auto" 
            priority 
          />
        </Link>
        
        <div className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          {['Agenda', 'Vídeos', 'Instagram', 'Contato'].map((item) => (
            <Link 
              key={item} 
              href={`#${item === 'Vídeos' ? 'videos' : item.toLowerCase()}`} 
              className={`transition-colors relative group ${
                scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${
                scrolled ? 'w-0' : 'w-0 bg-white'
              }`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <Button 
              asChild
              variant="ghost" 
              size="icon" 
              className={`rounded-full hover:bg-foreground/10 ${user ? 'ring-2 ring-emerald-500/70' : ''}`}
              aria-label="Admin"
              title={user ? (user.email || 'Admin') : 'Admin'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Link href="/admin">
                <User className={`h-5 w-5 ${user ? 'text-emerald-400' : 'text-foreground/60 hover:text-foreground'}`} />
              </Link>
            </Button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-background/95 backdrop-blur shadow-lg p-1 z-50">
                <Link className="block px-3 py-2 text-sm rounded-md hover:bg-foreground/10" href="/admin" onClick={() => setMenuOpen(false)}>
                  Abrir Admin
                </Link>
                {user ? (
                  <button
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-foreground/10"
                    onClick={async () => {
                      setMenuOpen(false);
                      if (auth) await signOut(auth);
                    }}
                  >
                    Sair
                  </button>
                ) : null}
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full hover:bg-foreground/10"
            aria-label="Alternar tema"
          >
            {dark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </Button>
          
          <MusicPlayer inline />
          
          <Button 
            asChild 
            className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none shadow-lg shadow-orange-500/20 font-bold px-6"
          >
            <a href={WHATSAPP_URL}>Contratar Show</a>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}

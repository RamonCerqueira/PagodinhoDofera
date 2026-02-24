'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function FloatingWhatsApp() {
  return (
    <a 
      href={WHATSAPP_URL} 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-4 font-bold text-white shadow-2xl transition-transform hover:scale-110 hover:bg-emerald-600 animate-bounce"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline">WhatsApp</span>
    </a>
  );
}

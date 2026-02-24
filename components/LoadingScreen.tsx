'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8"
      >
        <Image
          src="/images/logo.jpg"
          alt="Pagodinho do Fera"
          width={200}
          height={100}
          className="h-24 w-auto drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]"
          priority
        />
      </motion.div>

      <div className="flex items-end gap-1 h-12 mb-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-full"
            animate={{
              height: ["20%", "100%", "20%"],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm uppercase tracking-[0.3em] text-zinc-400"
      >
        Carregando energia...
      </motion.p>
    </div>
  );
}

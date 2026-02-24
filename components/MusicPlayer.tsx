'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const PLAYLIST = [
  { url: 'https://youtu.be/bjksC63eHvU?si=pVXkUrC1nlyA_rcf', title: 'CPF Novo', artist: 'Pagodinho do Fera' },
  { url: 'https://youtu.be/06kT15eVLvQ?si=mORgt9lMj54pPGSY', title: 'Pra Você', artist: 'Pagodinho do Fera' },
  { url: 'https://youtu.be/i9hD0ElIKxg?si=h2iTmxOu5P2kRI9z', title: 'Devendo e Luxando', artist: 'Pagodinho do Fera' },
  { url: 'https://youtu.be/hIgp3S9vzwU?si=La6cVD9SGV8hR3Yq', title: 'Resiliência', artist: 'Pagodinho do Fera' },
  { url: 'https://youtu.be/Mu2uPHe3yLM?si=UMdUGZULqMaAglvE', title: 'Pagodinho do Fera', artist: 'Pagodinho do Fera' },
];

export function MusicPlayer({ inline = false }: { inline?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [consentOpen, setConsentOpen] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(true);

  const currentTrack = PLAYLIST[currentTrackIndex];
  const containerPosition = inline ? 'relative' : 'fixed bottom-4 right-4 z-40';
  const discSize = inline ? 'h-8 w-8' : 'h-10 w-10';
  const titleMax = inline ? 'max-w-[100px]' : 'max-w-[120px]';
  const prevNextSize = inline ? 'h-7 w-7' : 'h-8 w-8';
  const playSize = inline ? 'h-8 w-8' : 'h-10 w-10';

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setIsMuted(false);
      setShowAudioPrompt(false);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    // Listen for custom event to pause music
    const handleExternalPlay = () => setIsPlaying(false);
    window.addEventListener('pause-music-player', handleExternalPlay);
    return () => window.removeEventListener('pause-music-player', handleExternalPlay);
  }, []);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('audio-consent') : null;
    if (saved === '1') {
      setShowAudioPrompt(false);
      setIsMuted(false);
    } else {
      setConsentOpen(true);
    }
  }, []);

  const allowAudio = () => {
    setShowAudioPrompt(false);
    setIsMuted(false);
    setIsPlaying(true);
    if (rememberChoice) {
      localStorage.setItem('audio-consent', '1');
    }
    setConsentOpen(false);
  };

  return (
    <div className={`${containerPosition} flex items-center gap-2`}>
      <Modal isOpen={consentOpen} onClose={() => setConsentOpen(false)} title="Permitir áudio?">
        <div className="space-y-4">
          <p className="text-sm text-zinc-300">
            Para tocar as músicas do Pagodinho do Fera, precisamos da sua permissão de áudio.
          </p>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
            />
            Lembrar minha escolha
          </label>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setConsentOpen(false)} className="rounded-full">
              Agora não
            </Button>
            <Button onClick={allowAudio} className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Permitir áudio
            </Button>
          </div>
        </div>
      </Modal>

      {!showAudioPrompt && (
        <div className="hidden">
          <ReactPlayer
            url={currentTrack.url as string}
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            onEnded={handleNext}
            onReady={() => setIsReady(true)}
            onPlay={() => setShowAudioPrompt(false)}
            width="0"
            height="0"
            config={{
              youtube: {
                playsinline: 1,
                rel: 0,
                origin: typeof window !== 'undefined' ? window.location.origin : undefined
              }
            }}
          />
        </div>
      )}

      {/* Mini Player UI */}
      <div 
        className={`
          flex items-center gap-3 rounded-full bg-black/80 backdrop-blur-md border border-white/10 p-2 pr-4 shadow-2xl transition-all duration-300
          ${isExpanded ? 'w-auto' : 'w-auto'}
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`
          relative ${discSize} flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-400 to-red-600 flex items-center justify-center animate-spin-slow
          ${isPlaying ? 'animate-spin' : ''}
        `} style={{ animationDuration: '8s' }}>
          <Music className="h-5 w-5 text-white" />
        </div>

        <div className={`flex flex-col mr-2 ${titleMax}`}>
          <span className="text-xs font-bold text-white truncate">{currentTrack.title}</span>
          <span className="text-[10px] text-zinc-400 truncate">{isPlaying ? 'Tocando agora' : 'Pausado'}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`${prevNextSize} rounded-full text-white hover:bg-white/10`}
            onClick={handlePrev}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`${playSize} rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-transform`}
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black ml-1" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`${prevNextSize} rounded-full text-white hover:bg-white/10`}
            onClick={handleNext}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {showAudioPrompt && (
          <Button
            onClick={() => { setShowAudioPrompt(false); setIsMuted(false); setIsPlaying(true); }}
            className="ml-2 h-8 rounded-full px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
          >
            Permitir áudio
          </Button>
        )}
      </div>
    </div>
  );
}

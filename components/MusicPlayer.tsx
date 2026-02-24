'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

// Playlist of Pagode songs (YouTube IDs)
// SUBSTITUA OS IDs ABAIXO PELOS VÍDEOS REAIS DO CANAL @VALFERA
const PLAYLIST = [
  { id: 'VIDEO_ID_1', title: 'CPF NOVO', artist: 'Pagodinho do Fera' }, 
  { id: 'VIDEO_ID_2', title: 'PRA VOCÊ (Tears In Heaven)', artist: 'Pagodinho do Fera' },
  { id: 'VIDEO_ID_3', title: 'DEVENDO E LUXANDO', artist: 'Pagodinho do Fera' },
  { id: 'VIDEO_ID_4', title: 'RESILIÊNCIA', artist: 'Val Fera' },
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);

  const currentTrack = PLAYLIST[currentTrackIndex];

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

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {/* Hidden Player */}
      <div className="hidden">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${currentTrack.id}` as string}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          onEnded={handleNext}
          onReady={() => setIsReady(true)}
          onPlay={() => setShowAudioPrompt(false)}
          width="0"
          height="0"
        />
      </div>

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
          relative h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-400 to-red-600 flex items-center justify-center animate-spin-slow
          ${isPlaying ? 'animate-spin' : ''}
        `} style={{ animationDuration: '8s' }}>
          <Music className="h-5 w-5 text-white" />
        </div>

        <div className="flex flex-col mr-2 max-w-[120px]">
          <span className="text-xs font-bold text-white truncate">{currentTrack.title}</span>
          <span className="text-[10px] text-zinc-400 truncate">{isPlaying ? 'Tocando agora' : 'Pausado'}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-white hover:bg-white/10"
            onClick={handlePrev}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-transform"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black ml-1" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-white hover:bg-white/10"
            onClick={handleNext}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {showAudioPrompt && (
          <Button
            onClick={() => { setIsMuted(false); setIsPlaying(true); setShowAudioPrompt(false); }}
            className="ml-2 h-8 rounded-full px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
          >
            Ativar áudio
          </Button>
        )}
      </div>
    </div>
  );
}

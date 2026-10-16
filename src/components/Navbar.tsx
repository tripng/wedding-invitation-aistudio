import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Sparkles, Calendar, MapPin, Gift, MessageCircle, Image } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = () => {
    const status = weddingAudio.toggle();
    setIsPlaying(status);
  };

  const navItems = [
    { id: 'mempelai', label: 'Mempelai', icon: Heart },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'kisah', label: 'Kisah', icon: Sparkles },
    { id: 'galeri', label: 'Galeri', icon: Image },
    { id: 'rsvp', label: 'Ucapan & RSVP', icon: MessageCircle },
    { id: 'hadiah', label: 'Tanda Kasih', icon: Gift },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Top Floating Header */}
      <header className="fixed top-4 inset-x-0 z-40 hidden md:flex justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#11131e]/85 backdrop-blur-md border border-[#d4af37]/25 shadow-[0_8px_30px_rgba(0,0,0,0.6)] pointer-events-auto">
          <button
            id="nav-brand"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 pr-3 border-r border-[#d4af37]/20 cursor-pointer"
          >
            <span className="font-serif text-lg font-bold gold-gradient-text tracking-wider">A &amp; L</span>
          </button>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#d4af37]/20 text-[#fce9b8] border border-[#d4af37]/40 shadow-sm'
                      : 'text-[#9ca3af] hover:text-[#f3c861] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4af37]' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Audio Floating Pill */}
          <div className="pl-3 border-l border-[#d4af37]/20">
            <button
              id="nav-audio-btn-desktop"
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-[#d4af37]/20 text-[#f5c767] border-[#d4af37]/50'
                  : 'bg-white/5 text-[#9ca3af] border-white/10 hover:text-white'
              }`}
              title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                    <span className="w-0.5 bg-[#f5c767] rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                    <span className="w-0.5 bg-[#f5c767] rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
                    <span className="w-0.5 bg-[#f5c767] rounded-full animate-[bounce_1s_infinite_200ms] h-1/2" />
                  </div>
                  <span className="text-[11px]">Musik On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#9ca3af]" />
                  <span className="text-[11px]">Musik Off</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Audio Disc on Mobile & Desktop Corner */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
        <button
          id="floating-audio-toggle"
          onClick={toggleAudio}
          className={`relative p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.8)] border transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-[#181a27] border-[#d4af37] text-[#f5c767] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
              : 'bg-[#12141f] border-zinc-700 text-zinc-400 hover:text-white'
          }`}
          aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-[#f5c767] animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5c767] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
              </span>
            </div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0d0e15]/95 backdrop-blur-xl border-t border-[#d4af37]/20 px-2 py-1.5 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center py-1 px-1.5 text-[10px] transition-colors ${
                isActive ? 'text-[#f5c767]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#f5c767]' : ''}`} />
              <span className="truncate max-w-[50px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

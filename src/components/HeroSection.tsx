import { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, ChevronDown, SunMedium, Moon, Palette } from 'lucide-react';
import { WeddingScene } from './3d/WeddingScene';

interface HeroSectionProps {
  guestName: string;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  const [lightingMode, setLightingMode] = useState<'gold' | 'romantic' | 'night'>('gold');

  // Countdown timer state
  const targetWeddingDate = new Date('2026-10-24T08:00:00+07:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetWeddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetWeddingDate]);

  // Google Calendar URL generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent('The Wedding of Arya & Larasati');
    const details = encodeURIComponent(
      'Pernikahan Raden Arya Pratama & Larasati Dewi. Kami mengundang kehadiran serta doa restu Bapak/Ibu/Saudara/i.'
    );
    const location = encodeURIComponent('The Glass House Sanctuary & Grand Ballroom, Jakarta');
    const dates = '20261024T010000Z/20261024T140000Z'; // UTC equivalent
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download .ics file
  const downloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Arya & Larasati Wedding//ID
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:The Wedding of Arya & Larasati
DESCRIPTION:Pernikahan Raden Arya Pratama & Larasati Dewi
LOCATION:The Glass House Sanctuary & Grand Ballroom, Jakarta
DTSTART:20261024T010000Z
DTEND:20261024T140000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-arya-larasati.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-16 pb-12 px-4 sm:px-6 overflow-hidden"
    >
      {/* 3D Wedding Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <WeddingScene
          interactive={true}
          lightingMode={lightingMode}
          showPetals={true}
          className="w-full h-full"
        />
      </div>

      {/* Subtle lighting backdrop overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090a0f]/65 via-transparent to-[#0c0d13] pointer-events-none z-[1]" />

      {/* Top Banner & Lighting Theme Controls */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#161824]/80 backdrop-blur-md border border-[#d4af37]/25 text-[#d4af37] text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Experience</span>
        </div>

        {/* 3D Scene Lighting Presets */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#161824]/85 backdrop-blur-md border border-[#d4af37]/25 text-xs">
          <button
            id="theme-btn-gold"
            onClick={() => setLightingMode('gold')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] transition ${
              lightingMode === 'gold'
                ? 'bg-[#d4af37] text-[#0c0d12] font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Golden Hour Light"
          >
            <SunMedium className="w-3 h-3" />
            <span className="hidden sm:inline">Emas</span>
          </button>
          <button
            id="theme-btn-romantic"
            onClick={() => setLightingMode('romantic')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] transition ${
              lightingMode === 'romantic'
                ? 'bg-[#ffb7c5] text-[#0c0d12] font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Romantic Blush Light"
          >
            <Palette className="w-3 h-3" />
            <span className="hidden sm:inline">Mawar</span>
          </button>
          <button
            id="theme-btn-night"
            onClick={() => setLightingMode('night')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] transition ${
              lightingMode === 'night'
                ? 'bg-[#93c5fd] text-[#0c0d12] font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Starlight Moonlight"
          >
            <Moon className="w-3 h-3" />
            <span className="hidden sm:inline">Malam</span>
          </button>
        </div>
      </div>

      {/* Main Title & Hero Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto my-auto py-8">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#d4af37] font-cinzel mb-2">
          Walimatul &apos;Ursy
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif gold-gradient-text tracking-tight mb-2">
          Arya &amp; Larasati
        </h1>

        <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#fae1dd] mb-3">
          Together Forever in Love and Grace
        </p>

        <p className="text-xs sm:text-sm text-[#e5e7eb] max-w-md mx-auto font-sans font-light mb-6">
          Selamat datang, <span className="font-semibold text-[#f5c767]">{guestName}</span>. 
          Dengan penuh sukacita, kami mengundang Anda untuk merayakan babak baru kehidupan kami.
        </p>

        {/* 3D Interaction Tip Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/30 text-xs text-[#fce9b8] mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span>Putar, sentuh, atau klik cincin 3D di atas</span>
        </div>

        {/* Live Countdown Timer Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-8">
          <div className="p-3 sm:p-4 rounded-xl bg-[#121420]/80 backdrop-blur-md border border-[#d4af37]/25 shadow-lg flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-cinzel gold-gradient-text">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9ca3af] mt-1">Hari</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-[#121420]/80 backdrop-blur-md border border-[#d4af37]/25 shadow-lg flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-cinzel gold-gradient-text">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9ca3af] mt-1">Jam</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-[#121420]/80 backdrop-blur-md border border-[#d4af37]/25 shadow-lg flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-cinzel gold-gradient-text">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9ca3af] mt-1">Menit</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-[#121420]/80 backdrop-blur-md border border-[#d4af37]/25 shadow-lg flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-cinzel text-[#ffb7c5]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9ca3af] mt-1">Detik</span>
          </div>
        </div>

        {/* Date & Calendar Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            id="btn-google-calendar"
            href={createGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1b1e2c] border border-[#d4af37]/50 text-[#f5c767] hover:bg-[#d4af37]/20 text-xs sm:text-sm font-medium transition shadow-md"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Simpan ke Google Calendar</span>
          </a>

          <button
            id="btn-download-ics"
            onClick={downloadIcs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium transition"
          >
            <Clock className="w-4 h-4 text-zinc-400" />
            <span>Unduh Kalender (.ics)</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Down Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-zinc-400">
        <span className="text-[11px] uppercase tracking-widest text-[#d4af37]/70 font-cinzel">
          Gulir Ke Bawah
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#d4af37]" />
      </div>
    </section>
  );
}

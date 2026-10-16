import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MailOpen, Sparkles, Heart, Music, Volume2 } from 'lucide-react';
import { WeddingScene } from './3d/WeddingScene';
import { weddingAudio } from '../utils/audio';

interface InvitationGateProps {
  onOpen: () => void;
  guestName: string;
  setGuestName: (name: string) => void;
}

export function InvitationGate({ onOpen, guestName, setGuestName }: AdInvitationGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(guestName);

  const handleOpenInvitation = () => {
    setIsOpening(true);

    // Play romantic acoustic piano arpeggios
    weddingAudio.play();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#d4af37', '#fce9b8', '#ffb7c5', '#ffffff'],
      });
    } catch {
      // ignore in environments without canvas
    }

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setGuestName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div
      id="invitation-gate"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#090a0f] text-[#f7f5f0] transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background 3D Petals and Lighting Scene */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        <WeddingScene interactive={false} showPetals={true} lightingMode="romantic" />
      </div>

      {/* Decorative luxury radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(9,10,15,0.92)_70%)] pointer-events-none" />

      {/* Luxury Golden Border Frame */}
      <div className="relative z-10 w-full max-w-lg mx-4 sm:mx-6 p-6 sm:p-8 rounded-2xl bg-[#12141f]/85 backdrop-blur-xl border border-[#d4af37]/30 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.15)] text-center">
        {/* Ornamental Top Crest */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] text-xs font-medium tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            Walimatul &apos;Ursy
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]/80 font-cinzel mb-1">
          The Wedding Celebration of
        </p>

        <h1 className="text-3xl sm:text-4xl font-serif gold-gradient-text tracking-wide mb-1">
          Arya &amp; Larasati
        </h1>

        <p className="text-xs text-[#a1a1aa] tracking-widest uppercase font-cinzel mb-4">
          Sabtu, 24 Oktober 2026
        </p>

        {/* 3D Wedding Rings Mini Interactive Viewport */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto my-2 rounded-full border border-[#d4af37]/25 bg-gradient-to-b from-[#181a27] to-[#0c0d14] shadow-inner overflow-hidden flex items-center justify-center">
          <WeddingScene interactive={true} showPetals={false} lightingMode="gold" className="w-full h-full" />
          <div className="absolute bottom-2 text-[10px] text-[#d4af37]/60 font-sans tracking-wide pointer-events-none">
            sentuh untuk memutar cincin 3D
          </div>
        </div>

        {/* Recipient Card */}
        <div className="mt-4 p-4 rounded-xl bg-[#171926]/90 border border-[#d4af37]/20 mb-6">
          <p className="text-xs text-[#d1d5db] font-sans">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>

          {isEditingName ? (
            <form onSubmit={handleSaveName} className="mt-2 flex gap-2 justify-center">
              <input
                id="input-edit-guest"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="px-3 py-1 text-sm rounded bg-[#0f111a] border border-[#d4af37]/40 text-[#f5c767] focus:outline-none focus:border-[#d4af37]"
                placeholder="Nama Tamu Undangan"
                autoFocus
              />
              <button
                id="btn-save-guest"
                type="submit"
                className="px-3 py-1 text-xs bg-[#d4af37] text-black font-semibold rounded hover:bg-[#e5c358] transition"
              >
                Simpan
              </button>
            </form>
          ) : (
            <div className="mt-1 flex items-center justify-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-[#f5c767] tracking-wide">
                {guestName}
              </h2>
              <button
                id="btn-toggle-edit-name"
                onClick={() => setIsEditingName(true)}
                className="text-[10px] text-[#9ca3af] hover:text-[#d4af37] underline transition"
                title="Ubah nama tamu"
              >
                (ubah)
              </button>
            </div>
          )}

          <p className="text-[11px] text-[#9ca3af] mt-1 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Invitation CTA */}
        <button
          id="btn-open-invitation"
          onClick={handleOpenInvitation}
          className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3c861] to-[#aa7c11] text-[#0d0f17] font-semibold text-sm sm:text-base tracking-wide shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          <MailOpen className="w-5 h-5 text-[#0d0f17] transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>Buka Undangan</span>
          <Heart className="w-4 h-4 text-[#0d0f17] fill-[#0d0f17]/30 transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* Audio Notice */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-[#a1a1aa]">
          <Music className="w-3.5 h-3.5 text-[#d4af37]/80" />
          <span>Lagu romantis akan diputar saat undangan dibuka</span>
        </div>
      </div>
    </div>
  );
}
type AdInvitationGateProps = InvitationGateProps;

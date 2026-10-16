import { Heart, ChevronUp, Sparkles } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 bg-[#07080d] text-[#f4f2ee] border-t border-[#d4af37]/20 pb-24 md:pb-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* Monogram Crest */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#121420] border border-[#d4af37]/50 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <span className="font-serif text-xl font-bold gold-gradient-text">A &amp; L</span>
        </div>

        <p className="font-script text-3xl sm:text-4xl text-[#fae1dd] mb-2">
          Terima Kasih
        </p>

        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-lg mx-auto mb-8">
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami haturkan terima kasih yang setulus-tulusnya. Semoga Allah SWT membalas segala kebaikan dengan berlipat ganda.
        </p>

        <div className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel mb-8">
          Kami yang berbahagia,
          <p className="text-lg font-serif text-[#fce9b8] normal-case mt-1">
            Keluarga Besar Bpk. Bambang &amp; Bpk. Suryo
          </p>
        </div>

        {/* Back to Top */}
        <button
          id="btn-scroll-top"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/40 text-zinc-400 hover:text-[#f5c767] text-xs transition cursor-pointer"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span>Kembali ke Atas</span>
        </button>

        <p className="text-[11px] text-zinc-600 mt-8 font-mono">
          &copy; 2026 The Wedding of Arya &amp; Larasati &bull; Built with React Three Fiber
        </p>
      </div>
    </footer>
  );
}

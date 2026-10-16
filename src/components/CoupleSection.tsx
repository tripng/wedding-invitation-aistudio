import { Heart, Instagram, Linkedin, Sparkles } from 'lucide-react';

export function CoupleSection() {
  return (
    <section id="mempelai" className="relative py-20 px-4 sm:px-6 bg-[#0c0d14] text-[#f4f2ee]">
      <div className="max-w-4xl mx-auto">
        {/* Sacred Quote Header */}
        <div className="text-center mb-16 p-6 sm:p-8 rounded-2xl bg-[#131522]/70 border border-[#d4af37]/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#ffb7c5]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#d4af37]/10 text-[#d4af37] mb-4">
            <Heart className="w-4 h-4 fill-[#d4af37]" />
          </div>

          <p className="font-serif text-lg sm:text-xl text-[#fce9b8] leading-relaxed italic mb-4 max-w-2xl mx-auto">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel">
            QS. Ar-Rum : 21
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            Kedua Mempelai
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text mt-1">
            Mempelai Pria &amp; Wanita
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud melangsungkan pernikahan putra-putri kami:
          </p>
        </div>

        {/* Couple Profile Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative items-center">
          {/* Central Heart Monogram (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#171926] border border-[#d4af37] items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <span className="font-script text-xl text-[#f5c767]">&amp;</span>
          </div>

          {/* Groom Card */}
          <div className="group relative p-6 sm:p-8 rounded-2xl bg-[#141624] border border-[#d4af37]/25 hover:border-[#d4af37]/60 transition-all duration-500 shadow-lg text-center flex flex-col items-center">
            {/* Groom Avatar / Visual Illustration */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-[#d4af37] via-[#aa7c11] to-[#fce9b8] mb-5 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1f2233] flex items-center justify-center relative">
                {/* Stylized Modern Groom Portrait Vector */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent z-10 opacity-60" />
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-2">
                    <span className="font-serif text-2xl font-bold text-[#f5c767]">A</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#d4af37]">Groom</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-[#fce9b8] tracking-wide">
              Raden Arya Pratama, S.Kom
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-cinzel mt-1 mb-4">
              Mempelai Pria
            </p>

            <div className="text-xs text-zinc-300 space-y-1 font-light leading-relaxed mb-6">
              <p>Putra Pertama dari Pasangan:</p>
              <p className="font-medium text-white">Bpk. Ir. H. Bambang Gunawan</p>
              <p className="text-zinc-400">&amp; Ibu Hj. Siti Aminah</p>
              <p className="text-[11px] text-zinc-500 pt-1">Kebayoran Baru, Jakarta Selatan</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-auto">
              <a
                id="social-groom-ig"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition"
                aria-label="Instagram Arya"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="social-groom-linkedin"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition"
                aria-label="LinkedIn Arya"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bride Card */}
          <div className="group relative p-6 sm:p-8 rounded-2xl bg-[#141624] border border-[#d4af37]/25 hover:border-[#d4af37]/60 transition-all duration-500 shadow-lg text-center flex flex-col items-center">
            {/* Bride Avatar / Visual Illustration */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-[#ffb7c5] via-[#d4af37] to-[#fae1dd] mb-5 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1f2233] flex items-center justify-center relative">
                {/* Stylized Modern Bride Portrait Vector */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent z-10 opacity-60" />
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#ffb7c5]/20 border border-[#ffb7c5]/40 flex items-center justify-center mb-2">
                    <span className="font-serif text-2xl font-bold text-[#ffb7c5]">L</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#ffb7c5]">Bride</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-[#fce9b8] tracking-wide">
              Larasati Dewi, S.Ds
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#ffb7c5]/90 font-cinzel mt-1 mb-4">
              Mempelai Wanita
            </p>

            <div className="text-xs text-zinc-300 space-y-1 font-light leading-relaxed mb-6">
              <p>Putri Kedua dari Pasangan:</p>
              <p className="font-medium text-white">Bpk. Drs. H. Suryo Prabowo</p>
              <p className="text-zinc-400">&amp; Ibu Hj. Rina Wardani</p>
              <p className="text-[11px] text-zinc-500 pt-1">Menteng, Jakarta Pusat</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-auto">
              <a
                id="social-bride-ig"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#ffb7c5] hover:border-[#ffb7c5]/40 transition"
                aria-label="Instagram Larasati"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="social-bride-linkedin"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#ffb7c5] hover:border-[#ffb7c5]/40 transition"
                aria-label="Portfolio Larasati"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

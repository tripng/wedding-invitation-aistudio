import { Calendar, Clock, MapPin, Navigation, Shirt, AlertCircle } from 'lucide-react';

export function EventSection() {
  const mapsUrl = 'https://maps.google.com/?q=The+Glass+House+Jakarta';

  return (
    <section id="acara" className="relative py-20 px-4 sm:px-6 bg-[#090a0f] text-[#f4f2ee]">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            Agenda Bahagia
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text mt-1">
            Rangkaian Acara &amp; Lokasi
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
        </div>

        {/* Two Event Cards (Akad & Resepsi) */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Akad Nikah */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#131522] border border-[#d4af37]/30 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#d4af37]/20 border-b border-l border-[#d4af37]/30 rounded-bl-xl text-[11px] font-medium text-[#fce9b8] uppercase tracking-wider font-cinzel">
              Khidmat &amp; Sakral
            </div>

            <div>
              <h3 className="text-2xl font-serif text-[#fce9b8] mb-1">
                Akad Nikah
              </h3>
              <p className="text-xs text-[#d4af37] font-cinzel uppercase tracking-widest mb-6">
                Upacara Ijab Qabul
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sabtu, 24 Oktober 2026</h4>
                    <p className="text-xs text-zinc-400">Pagi Hari</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">08.00 - 10.00 WIB</h4>
                    <p className="text-xs text-zinc-400">Diharapkan hadir 15 menit sebelum acara dimulai</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">The Glass House Sanctuary</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Jl. Dharmawangsa Raya No. 42, Kebayoran Baru, Jakarta Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Khusus Keluarga &amp; Kerabat Dekat</span>
              <a
                id="btn-maps-akad"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f5c767] hover:bg-[#d4af37]/30 text-xs font-medium transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah</span>
              </a>
            </div>
          </div>

          {/* Resepsi Pernikahan */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#131522] border border-[#d4af37]/30 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#d4af37]/20 border-b border-l border-[#d4af37]/30 rounded-bl-xl text-[11px] font-medium text-[#fce9b8] uppercase tracking-wider font-cinzel">
              Perayaan Cinta
            </div>

            <div>
              <h3 className="text-2xl font-serif text-[#fce9b8] mb-1">
                Resepsi Pernikahan
              </h3>
              <p className="text-xs text-[#d4af37] font-cinzel uppercase tracking-widest mb-6">
                Grand Celebration
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sabtu, 24 Oktober 2026</h4>
                    <p className="text-xs text-zinc-400">Siang &amp; Malam Hari</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sesi 1: 11.30 - 14.00 WIB</h4>
                    <h4 className="text-sm font-semibold text-[#f5c767]">Sesi 2: 18.30 - 21.00 WIB</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Grand Ballroom The Glass House</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Jl. Dharmawangsa Raya No. 42, Kebayoran Baru, Jakarta Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Tersedia Valet Parking &amp; Shuttle</span>
              <a
                id="btn-maps-resepsi"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f5c767] hover:bg-[#d4af37]/30 text-xs font-medium transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dress Code & Venue Protocol Banner */}
        <div className="p-6 rounded-2xl bg-[#141626]/80 border border-[#d4af37]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#d4af37]/15 text-[#d4af37] shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#fce9b8] font-cinzel">
                Panduan Busana (Dress Code)
              </h4>
              <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
                Kami menyarankan pakaian bernuansa <span className="text-[#f5c767] font-medium">Champagne Gold, Earth Tone, Navy</span>, atau <span className="text-[#f5c767] font-medium">Batik Modern Elegan</span> demi keharmonisan foto kenangan bersama.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#d4af37] border border-white/20 shadow-sm" title="Gold" />
            <span className="w-4 h-4 rounded-full bg-[#c5a059] border border-white/20 shadow-sm" title="Warm Bronze" />
            <span className="w-4 h-4 rounded-full bg-[#1b2a4a] border border-white/20 shadow-sm" title="Deep Navy" />
            <span className="w-4 h-4 rounded-full bg-[#d2b48c] border border-white/20 shadow-sm" title="Tan/Earth" />
            <span className="w-4 h-4 rounded-full bg-[#f5ebe0] border border-white/20 shadow-sm" title="Ivory" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Heart, Sparkles, MapPin, Compass } from 'lucide-react';
import { StoryEvent } from '../types';

export function StorySection() {
  const stories: StoryEvent[] = [
    {
      year: '2021',
      date: '14 November 2021',
      title: 'Pertemuan Tak Terduga',
      subtitle: 'Sebuah Galeri Seni di Bandung',
      description:
        'Di antara lukisan-lukisan kanvas dan secangkir kopi hangat saat senja hujan di Bandung, dua insan asing pertama kali bertukar pandang dan memulai perbincangan yang tak berkesudahan tentang mimpi dan seni.',
      tag: 'The Beginning',
    },
    {
      year: '2023',
      date: '20 Agustus 2023',
      title: 'Menjalin Komitmen',
      subtitle: 'Saling Mendewasa & Menguatkan',
      description:
        'Dua tahun penuh suka dan duka mempererat ikatan kami. Kami belajar bahwa cinta bukan hanya tentang kesempurnaan, melainkan kerelaan untuk saling mendengar, mendukung cita-cita, dan berjalan beriringan.',
      tag: 'Growing Together',
    },
    {
      year: '2025',
      date: '10 Mei 2025',
      title: 'Ikrar Di Bawah Bintang',
      subtitle: 'Lautan Pasir Bromo',
      description:
        'Di bawah dinginnya malam dan hangatnya gemintang di Bromo, Arya berlutut menyematkan cincin dan memohon Larasati untuk mendampinginya seumur hidup. Dengan linangan air mata haru, Larasati menjawab "I Do".',
      tag: 'The Proposal',
    },
    {
      year: '2026',
      date: '24 Oktober 2026',
      title: 'Menuju Hari Bahagia',
      subtitle: 'Gerbang Kehidupan Baru',
      description:
        'Kini, dengan restu orang tua dan keluarga tercinta, kami siap menyatukan dua hati dan dua keluarga dalam ikatan suci pernikahan yang kekal, insya Allah hingga ke surga-Nya.',
      tag: 'Forever After',
    },
  ];

  return (
    <section id="kisah" className="relative py-20 px-4 sm:px-6 bg-[#0c0d14] text-[#f4f2ee]">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            Perjalanan Dua Hati
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text mt-1">
            Kisah Cinta Kami
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Setiap cerita cinta itu indah, namun kisah kami adalah yang paling kami syukuri.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#d4af37]/30 ml-4 sm:ml-32 space-y-12 pb-4">
          {stories.map((story, idx) => (
            <div key={story.year} className="relative pl-6 sm:pl-8 group">
              {/* Year Pill (Desktop Offset) */}
              <div className="hidden sm:block absolute -left-28 top-0 text-right w-24">
                <span className="text-lg font-bold font-cinzel text-[#f5c767] tracking-wider block">
                  {story.year}
                </span>
                <span className="text-[10px] text-zinc-400 block font-light">
                  {story.date}
                </span>
              </div>

              {/* Glowing Node on Line */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#121420] border-2 border-[#d4af37] group-hover:scale-125 group-hover:bg-[#d4af37] transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.5)] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] group-hover:bg-[#0c0d14]" />
              </div>

              {/* Story Content Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#141624] border border-[#d4af37]/20 group-hover:border-[#d4af37]/50 transition-all duration-300 shadow-md">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[10px] uppercase font-semibold text-[#f5c767] tracking-wider">
                    <Sparkles className="w-2.5 h-2.5" />
                    {story.tag}
                  </span>
                  <span className="sm:hidden text-xs font-semibold text-[#f5c767] font-cinzel">
                    {story.year}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-[#fce9b8] tracking-wide mb-1">
                  {story.title}
                </h3>

                <p className="text-xs text-[#d4af37]/80 font-medium mb-3 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{story.subtitle}</span>
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

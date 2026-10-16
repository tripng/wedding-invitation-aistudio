import { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Heart, Box, Grid3X3 } from 'lucide-react';
import { Interactive3DGallery, GalleryPhoto } from './3d/Interactive3DGallery';

export function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'prewed' | 'lamaran' | 'kasual'>('all');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [active3dIndex, setActive3dIndex] = useState<number>(0);

  const galleryItems: GalleryPhoto[] = [
    {
      id: 'g1',
      title: 'Kisah di Lautan Pasir Bromo',
      category: 'prewed',
      caption: 'Kala kabut pagi menyelimuti kaldera dan mentari terbit menyapa cinta kami di pelukan alam Jawa Timur.',
      subtitle: 'Bromo Sunrise Moments',
      location: 'Gunung Bromo, Jawa Timur',
      colors: ['#3a2e39', '#5c4033', '#8c6239'],
    },
    {
      id: 'g2',
      title: 'Ikrar Hari Bahagia',
      category: 'lamaran',
      caption: 'Momen pertunangan penuh haru disaksikan kedua keluarga tercinta dengan janji suci mengarungi samudra kehidupan.',
      subtitle: 'Engagement & Blessing Day',
      location: 'Plataran Dharmawangsa, Jakarta',
      colors: ['#1e2c3a', '#2c3e50', '#3b5998'],
    },
    {
      id: 'g3',
      title: 'Tawa di Kedai Kopi Pertama',
      category: 'kasual',
      caption: 'Tempat di mana segalanya bermula, secangkir latte hangat dan obrolan tanpa akhir tentang mimpi dan masa depan.',
      subtitle: 'Where Our Story Began',
      location: 'Senopati, Jakarta Selatan',
      colors: ['#4a3525', '#6f4e37', '#a67b5b'],
    },
    {
      id: 'g4',
      title: 'Pesona Adat Luhur Jawa',
      category: 'prewed',
      caption: 'Mengagumi keanggunan warisan leluhur dalam balutan beskap dan kebaya beludru hitam berhias benang emas.',
      subtitle: 'Royal Heritage Elegance',
      location: 'Keraton Surakarta Hadiningrat',
      colors: ['#1e272c', '#2f3e46', '#52796f'],
    },
    {
      id: 'g5',
      title: 'Senja di Tepian Pantai',
      category: 'prewed',
      caption: 'Langkah kaki berkejaran dengan debur ombak di bawah langit jingga keemasan yang melukiskan ketulusan rasa.',
      subtitle: 'Golden Sunset Serenade',
      location: 'Pantai Melasti, Bali',
      colors: ['#6b2d5c', '#9f496e', '#d66d75'],
    },
    {
      id: 'g6',
      title: 'Langkah Menuju Masa Depan',
      category: 'kasual',
      caption: 'Bergandengan tangan melangkah pasti menjemput takdir terindah dalam hangatnya senyum dan pelukan.',
      subtitle: 'Together in Every Step',
      location: 'Kota Tua, Jakarta',
      colors: ['#212f3d', '#2c3e50', '#566573'],
    },
  ];

  const filteredItems =
    filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter);

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextPhoto = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % filteredItems.length);
    }
  };

  const prevPhoto = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="galeri" className="relative py-24 px-4 sm:px-6 bg-[#090a0f] text-[#f4f2ee] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            Momen Abadi &amp; Galeri Tiga Dimensi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif gold-gradient-text mt-2">
            Galeri Kenangan Arya &amp; Larasati
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-lg mx-auto">
            Setiap detik yang kami lalui adalah bingkai kenangan penuh kehangatan. Nikmati pengalaman interaktif 3D atau jelajahi katalog foto kami.
          </p>
        </div>

        {/* View Mode Switcher & Category Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#131522] border border-[#d4af37]/30">
            <button
              id="view-mode-3d"
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Pameran 3D (R3F)</span>
            </button>
            <button
              id="view-mode-grid"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Katalog Grid</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {[
              { key: 'all', label: 'Semua Momen' },
              { key: 'prewed', label: 'Pre-Wedding' },
              { key: 'lamaran', label: 'Lamaran' },
              { key: 'kasual', label: 'Kasual' },
            ].map((tab) => (
              <button
                key={tab.key}
                id={`filter-${tab.key}`}
                onClick={() => {
                  setFilter(tab.key as typeof filter);
                  setActive3dIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  filter === tab.key
                    ? 'bg-[#d4af37]/25 text-[#fce9b8] border border-[#d4af37]'
                    : 'bg-[#141624] text-zinc-400 border border-white/5 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Exhibition View vs Grid View */}
        {viewMode === '3d' ? (
          <div className="space-y-4">
            <Interactive3DGallery
              photos={filteredItems}
              currentIndex={active3dIndex}
              onNavigate={(idx) => setActive3dIndex(idx)}
              onOpenPhotoDetail={(idx) => openLightbox(idx)}
            />
            <div className="flex items-center justify-between text-xs text-zinc-500 px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Teknologi WebGL &amp; React Three Fiber</span>
              </span>
              <span>Menampilkan {filteredItems.length} bingkai kenangan</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative h-80 rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-lg cursor-pointer bg-[#131522] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/70 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
              >
                {/* Artful Romantic Visual Mockup Canvas with Vignette */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 50%, ${item.colors[2]} 100%)`,
                  }}
                  className="w-full h-full flex flex-col items-center justify-center p-6 relative transition-transform duration-700 group-hover:scale-105"
                >
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition duration-500">
                    <Heart className="w-8 h-8 text-white/70 fill-white/10" />
                  </div>
                  <span className="font-serif text-lg text-white font-semibold tracking-wide text-center">
                    {item.subtitle}
                  </span>
                  <span className="text-[11px] text-white/60 uppercase tracking-widest mt-1">
                    Arya &amp; Larasati
                  </span>
                  <span className="text-[10px] text-[#fce9b8] mt-2 font-mono">
                    {item.location}
                  </span>

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 bg-[#0c0d14]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                    <span className="text-[10px] uppercase font-cinzel text-[#d4af37] tracking-widest">
                      {item.category.toUpperCase()}
                    </span>
                    <h4 className="text-base font-serif text-[#fce9b8] font-bold mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2 font-light">
                      {item.caption}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#f5c767]">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Lihat Ukuran Penuh</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        {selectedIdx !== null && filteredItems[selectedIdx] && (
          <div
            id="lightbox-modal"
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            <button
              id="btn-close-lightbox"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition cursor-pointer z-10"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              id="btn-prev-photo"
              onClick={prevPhoto}
              className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition cursor-pointer z-10"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              id="btn-next-photo"
              onClick={nextPhoto}
              className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition cursor-pointer z-10"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-2xl w-full rounded-3xl overflow-hidden bg-[#141624] border border-[#d4af37]/40 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)]">
              <div
                style={{
                  background: `linear-gradient(135deg, ${filteredItems[selectedIdx].colors[0]} 0%, ${filteredItems[selectedIdx].colors[1]} 50%, ${filteredItems[selectedIdx].colors[2]} 100%)`,
                }}
                className="w-full h-80 sm:h-96 flex flex-col items-center justify-center text-center p-8 relative"
              >
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-4 shadow-inner">
                  <Heart className="w-10 h-10 text-white/80 fill-white/20" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold max-w-md">
                  {filteredItems[selectedIdx].title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#f5c767] font-cinzel mt-2">
                  &ldquo;{filteredItems[selectedIdx].subtitle}&rdquo;
                </span>
                <span className="text-xs text-zinc-300 font-sans mt-1">
                  📍 {filteredItems[selectedIdx].location}
                </span>
              </div>

              <div className="p-6 sm:p-8 bg-[#111320]">
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                  {filteredItems[selectedIdx].caption}
                </p>
                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-zinc-400">
                  <span className="font-mono">Foto {selectedIdx + 1} dari {filteredItems.length}</span>
                  <span className="text-[#d4af37] font-cinzel">The Glass House Sanctuary</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


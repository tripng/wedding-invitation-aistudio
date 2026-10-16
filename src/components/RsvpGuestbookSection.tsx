import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquare, Send, CheckCircle2, Heart, Users, Sparkles, Filter } from 'lucide-react';
import { GuestbookEntry } from '../types';

interface RsvpGuestbookProps {
  initialGuestName: string;
}

const DEFAULT_WISHES: GuestbookEntry[] = [
  {
    id: 'w1',
    name: 'Dimas Aditya & Keluarga',
    attendance: 'hadir',
    guestsCount: 2,
    message:
      'Barakallahu laka wa baraka alaika wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru sahabatku Arya dan Larasati! Semoga senantiasa dipenuhi cinta dan keberkahan.',
    timestamp: '19 September 2026, 14.30 WIB',
    likes: 12,
  },
  {
    id: 'w2',
    name: 'Nadia Safira, S.Ds',
    attendance: 'hadir',
    guestsCount: 1,
    message:
      'Cantik banget Larasati! Dari jaman kuliah bareng akhirnya berlabuh juga di pelabuhan terindah. Wishing you both a lifetime of laughter and endless adventures together!',
    timestamp: '19 September 2026, 11.15 WIB',
    likes: 8,
  },
  {
    id: 'w3',
    name: 'Keluarga Besar Bpk. Ir. Hendra',
    attendance: 'hadir',
    guestsCount: 2,
    message:
      'Selamat untuk kedua mempelai dan kedua keluarga besar. Semoga pernikahan ini menjadi awal dari perjalanan keluarga yang sakinah, mawaddah, dan warahmah. Aamiin.',
    timestamp: '18 September 2026, 19.45 WIB',
    likes: 15,
  },
  {
    id: 'w4',
    name: 'Reza Fahlevi',
    attendance: 'tidak_hadir',
    guestsCount: 0,
    message:
      'Mohon maaf belum bisa hadir langsung karena dinas di luar kota bro Arya. Tapi doa tulus dari kami sekeluarga selalu menyertai kalian berdua. Samawa ya bro!',
    timestamp: '18 September 2026, 10.20 WIB',
    likes: 6,
  },
];

export function RsvpGuestbookSection({ initialGuestName }: RsvpGuestbookProps) {
  const [wishes, setWishes] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_arya_larasati');
      return saved ? JSON.parse(saved) : DEFAULT_WISHES;
    } catch {
      return DEFAULT_WISHES;
    }
  });

  const [name, setName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'hadir' | 'tidak_hadir'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes_arya_larasati', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: 'w_' + Date.now(),
      name: name.trim(),
      attendance,
      guestsCount: attendance === 'hadir' ? guestsCount : 0,
      message: message.trim(),
      timestamp: 'Baru saja',
      likes: 1,
    };

    setWishes([newEntry, ...wishes]);
    setMessage('');
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#fce9b8', '#ffb7c5', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const handleLike = (id: string) => {
    setWishes(
      wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const filteredWishes =
    filter === 'all' ? wishes : wishes.filter((w) => w.attendance === filter);

  return (
    <section id="rsvp" className="relative py-20 px-4 sm:px-6 bg-[#0c0d14] text-[#f4f2ee]">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            Konfirmasi &amp; Doa Restu
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text mt-1">
            RSVP &amp; Buku Tamu
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Kehadiran dan doa restu Anda adalah kado terindah bagi kami yang akan mengawali lembaran baru.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* RSVP Form Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#141624] border border-[#d4af37]/30 shadow-xl relative">
            <h3 className="text-xl font-serif text-[#fce9b8] mb-1">
              Konfirmasi Kehadiran
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Mohon konfirmasi sebelum tanggal <span className="text-[#f5c767]">15 Oktober 2026</span>
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div className="text-xs text-[#fce9b8]">
                  <p className="font-semibold">Terima kasih atas konfirmasinya!</p>
                  <p className="text-zinc-300 mt-0.5 font-light">
                    Ucapan dan doa restu Anda telah tersemat di dinding buku tamu.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-300 font-cinzel mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  id="rsvp-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Raden Hendra &amp; Istri"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1018] border border-[#d4af37]/25 text-white text-sm focus:outline-none focus:border-[#d4af37] transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-300 font-cinzel mb-1.5">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    id="rsvp-btn-hadir"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2 px-1 text-xs font-medium rounded-xl border transition cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-[#d4af37] text-black border-[#d4af37] font-semibold'
                        : 'bg-[#0e1018] text-zinc-400 border-white/10 hover:border-[#d4af37]/30'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    id="rsvp-btn-tidak"
                    onClick={() => setAttendance('tidak_hadir')}
                    className={`py-2 px-1 text-xs font-medium rounded-xl border transition cursor-pointer ${
                      attendance === 'tidak_hadir'
                        ? 'bg-rose-900/40 text-rose-200 border-rose-600 font-semibold'
                        : 'bg-[#0e1018] text-zinc-400 border-white/10 hover:border-rose-500/30'
                    }`}
                  >
                    Tidak Hadir
                  </button>
                  <button
                    type="button"
                    id="rsvp-btn-ragu"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2 px-1 text-xs font-medium rounded-xl border transition cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-amber-900/40 text-amber-200 border-amber-600 font-semibold'
                        : 'bg-[#0e1018] text-zinc-400 border-white/10 hover:border-amber-500/30'
                    }`}
                  >
                    Masih Ragu
                  </button>
                </div>
              </div>

              {attendance === 'hadir' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-cinzel mb-1.5">
                    Jumlah Tamu
                  </label>
                  <div className="flex gap-3">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        type="button"
                        id={`rsvp-guests-${num}`}
                        onClick={() => setGuestsCount(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                          guestsCount === num
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5c767]'
                            : 'bg-[#0e1018] border-white/10 text-zinc-400'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 inline mr-1" />
                        {num} Orang
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-300 font-cinzel mb-1.5">
                  Ucapan &amp; Doa Restu
                </label>
                <textarea
                  id="rsvp-message-input"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa tulus Anda untuk Arya &amp; Larasati..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1018] border border-[#d4af37]/25 text-white text-sm focus:outline-none focus:border-[#d4af37] transition resize-none font-light"
                />
              </div>

              <button
                type="submit"
                id="rsvp-submit-btn"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3c861] to-[#aa7c11] text-black font-semibold text-sm tracking-wide shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Ucapan &amp; Konfirmasi</span>
              </button>
            </form>
          </div>

          {/* Guestbook Wishes List (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#141624] border border-[#d4af37]/30 shadow-xl flex flex-col h-full max-h-[640px]">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-4">
              <div>
                <h3 className="text-xl font-serif text-[#fce9b8]">
                  Untaian Doa &amp; Harapan
                </h3>
                <p className="text-xs text-zinc-400">
                  {wishes.length} doa tersimpan dari keluarga &amp; sahabat
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-1.5 text-xs">
                <button
                  id="wish-filter-all"
                  onClick={() => setFilter('all')}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition ${
                    filter === 'all'
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  Semua
                </button>
                <button
                  id="wish-filter-hadir"
                  onClick={() => setFilter('hadir')}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition ${
                    filter === 'hadir'
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  Hadir
                </button>
              </div>
            </div>

            {/* Scrollable Wishes Feed */}
            <div className="space-y-3.5 overflow-y-auto pr-1 flex-1">
              {filteredWishes.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#0e1018] border border-[#d4af37]/15 hover:border-[#d4af37]/30 transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-sm font-semibold text-[#fce9b8]">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-zinc-500">
                        {item.timestamp}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${
                        item.attendance === 'hadir'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                          : item.attendance === 'tidak_hadir'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/40'
                      }`}
                    >
                      {item.attendance === 'hadir'
                        ? `Hadir (${item.guestsCount})`
                        : item.attendance === 'tidak_hadir'
                        ? 'Tidak Hadir'
                        : 'Ragu'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light mt-2">
                    &ldquo;{item.message}&rdquo;
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#f5c767] hover:text-white transition cursor-pointer"
                    >
                      <Heart className="w-3 h-3 fill-[#d4af37]/20" />
                      <span>{item.likes} Diaminkan</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

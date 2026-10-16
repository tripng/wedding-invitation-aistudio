import { useState } from 'react';
import { Gift, Copy, Check, QrCode, MapPin, Sparkles, CreditCard } from 'lucide-react';

export function GiftSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showQris, setShowQris] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const giftAddress =
    'Jl. Dharmawangsa Raya No. 42 (Kediaman Raden Arya), Kebayoran Baru, Jakarta Selatan 12160 (Penerima: Raden Arya Pratama - 0812-8901-2345)';

  return (
    <section id="hadiah" className="relative py-20 px-4 sm:px-6 bg-[#090a0f] text-[#f4f2ee]">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            Ungkapan Tanda Kasih
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif gold-gradient-text mt-1">
            Amplop Digital &amp; Kado
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda berkehendak memberikan tanda kasih secara digital, kami menyediakan amplop digital di bawah ini.
          </p>
        </div>

        {/* Bank Account Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* BCA Account Card */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#121422] to-[#1a1d2e] border border-[#d4af37]/30 shadow-xl overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#d4af37]" />
                <span className="font-bold text-lg text-white tracking-wider">BCA</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#fce9b8] font-cinzel border border-[#d4af37]/30">
                Bank Transfer
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-cinzel">
                Nomor Rekening
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-[#f5c767] tracking-wider mt-0.5">
                8830192841
              </p>
              <p className="text-xs text-zinc-300 mt-1">
                a.n. <span className="font-semibold text-white">Raden Arya Pratama</span>
              </p>
            </div>

            <button
              id="copy-bca-btn"
              onClick={() => copyToClipboard('8830192841', 'bca')}
              className="w-full py-2.5 rounded-xl bg-[#d4af37]/15 hover:bg-[#d4af37]/30 border border-[#d4af37]/40 text-[#f5c767] text-xs font-semibold tracking-wide transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedKey === 'bca' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Nomor Rekening Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>

          {/* Mandiri Account Card */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#121422] to-[#1a1d2e] border border-[#d4af37]/30 shadow-xl overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#ffb7c5]" />
                <span className="font-bold text-lg text-white tracking-wider">MANDIRI</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#ffb7c5]/20 text-[#ffb7c5] font-cinzel border border-[#ffb7c5]/30">
                Bank Transfer
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-cinzel">
                Nomor Rekening
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-[#ffb7c5] tracking-wider mt-0.5">
                132009482711
              </p>
              <p className="text-xs text-zinc-300 mt-1">
                a.n. <span className="font-semibold text-white">Larasati Dewi</span>
              </p>
            </div>

            <button
              id="copy-mandiri-btn"
              onClick={() => copyToClipboard('132009482711', 'mandiri')}
              className="w-full py-2.5 rounded-xl bg-[#ffb7c5]/15 hover:bg-[#ffb7c5]/30 border border-[#ffb7c5]/40 text-[#ffb7c5] text-xs font-semibold tracking-wide transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedKey === 'mandiri' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Nomor Rekening Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* QRIS Scan Toggle & Physical Address Box */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* QRIS Digital QR Card */}
          <div className="p-6 rounded-2xl bg-[#141624] border border-[#d4af37]/25 flex flex-col items-center text-center justify-between">
            <div className="flex items-center gap-2 mb-2">
              <QrCode className="w-5 h-5 text-[#d4af37]" />
              <h4 className="text-sm font-semibold text-[#fce9b8] font-cinzel">
                QRIS Pembayaran Digital
              </h4>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Dapat discan melalui BCA Mobile, GoPay, OVO, ShopeePay, Dana, dll.
            </p>

            {showQris ? (
              <div className="p-4 bg-white rounded-xl shadow-lg my-2 flex flex-col items-center">
                {/* Visual Stylized QR Representation */}
                <div className="w-44 h-44 bg-neutral-900 rounded-lg p-2 flex items-center justify-center text-white text-center">
                  <div className="border-4 border-dashed border-[#d4af37] p-4 rounded-md">
                    <QrCode className="w-20 h-20 text-[#f5c767] mx-auto mb-1" />
                    <span className="text-[10px] tracking-widest text-[#fce9b8] uppercase font-bold block">
                      QRIS ARYA &amp; LARASATI
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-600 mt-2 font-mono">NMID: ID1020261024AL</span>
              </div>
            ) : (
              <button
                id="toggle-qris-btn"
                onClick={() => setShowQris(true)}
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                Tampilkan Kode QRIS
              </button>
            )}
          </div>

          {/* Physical Delivery Gift Box */}
          <div className="p-6 rounded-2xl bg-[#141624] border border-[#d4af37]/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-[#d4af37]" />
                <h4 className="text-sm font-semibold text-[#fce9b8] font-cinzel">
                  Kirim Kado Fisik
                </h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-4">
                {giftAddress}
              </p>
            </div>

            <button
              id="copy-address-btn"
              onClick={() => copyToClipboard(giftAddress, 'address')}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 text-xs font-medium transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedKey === 'address' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Salin Alamat Pengiriman</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

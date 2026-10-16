import { useState, useEffect } from 'react';
import { InvitationGate } from './components/InvitationGate';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { RsvpGuestbookSection } from './components/RsvpGuestbookSection';
import { GiftSection } from './components/GiftSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Kehormatan');
  const [activeSection, setActiveSection] = useState('hero');

  // Read ?to= from URL query parameter on initial load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to') || params.get('u');
      if (toParam && toParam.trim()) {
        setGuestName(decodeURIComponent(toParam.trim()));
      }
    } catch {
      // ignore
    }
  }, []);

  // Update active section on scroll
  useEffect(() => {
    if (!isInvitationOpen) return;

    const sections = ['hero', 'mempelai', 'acara', 'kisah', 'galeri', 'rsvp', 'hadiah'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInvitationOpen]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f4f2ee] font-sans selection:bg-[#d4af37]/30 selection:text-[#fff8e7]">
      {/* 1. Digital Invitation Gate Cover */}
      {!isInvitationOpen && (
        <InvitationGate
          onOpen={() => setIsInvitationOpen(true)}
          guestName={guestName}
          setGuestName={setGuestName}
        />
      )}

      {/* 2. Main Wedding Website Experience */}
      {isInvitationOpen && (
        <div className="relative animate-[fadeIn_0.8s_ease-out]">
          {/* Floating Navigation Header & Audio Visualizer */}
          <Navbar activeSection={activeSection} />

          {/* Hero Section with Interactive 3D Canvas (React Three Fiber) */}
          <HeroSection guestName={guestName} />

          {/* The Couple Profile (Groom & Bride) */}
          <CoupleSection />

          {/* Event Schedule & Google Maps Locations */}
          <EventSection />

          {/* Love Story Journey Timeline */}
          <StorySection />

          {/* Memories Photo Gallery & Lightbox */}
          <GallerySection />

          {/* RSVP Confirmation & Guestbook Wishes Wall */}
          <RsvpGuestbookSection initialGuestName={guestName} />

          {/* Digital Gift / Envelope & QRIS */}
          <GiftSection />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}


import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Petals } from './Petals';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'prewed' | 'lamaran' | 'kasual';
  caption: string;
  colors: [string, string, string];
  subtitle: string;
  location: string;
}

// Generates an offscreen CanvasTexture with elegant wedding card art
function createCardTexture(item: GalleryPhoto): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Rich background gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, item.colors[0]);
    grad.addColorStop(0.5, item.colors[1]);
    grad.addColorStop(1, item.colors[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Inner subtle vignette
    const vig = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      100,
      canvas.width / 2,
      canvas.height / 2,
      600
    );
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.65)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ornate double golden border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 6;
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

    // Corner decorative accents
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = '#fce9b8';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(48, 48);
    drawCorner(canvas.width - 48, 48);
    drawCorner(48, canvas.height - 48);
    drawCorner(canvas.width - 48, canvas.height - 48);

    // Top Category badge
    ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 130, 80, 260, 48, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f5c767';
    ctx.font = '600 20px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.category.toUpperCase(), canvas.width / 2, 112);

    // Central Monogram Ring & Emblem
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 420, 150, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 420, 165, 0, Math.PI * 2);
    ctx.stroke();

    // Couple Monogram
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 700 84px "Alex Brush", cursive, serif';
    ctx.fillText('A & L', canvas.width / 2, 445);

    // Location tag
    ctx.fillStyle = '#fce9b8';
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(item.location, canvas.width / 2, 650);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 42px "Cinzel", serif';
    ctx.fillText(item.title, canvas.width / 2, 720);

    // Subtitle / poetic caption
    ctx.fillStyle = 'rgba(244, 242, 238, 0.85)';
    ctx.font = '400 26px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(`"${item.subtitle}"`, canvas.width / 2, 780);

    // Bottom touch hint
    ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('★ Klik untuk memperbesar foto ★', canvas.width / 2, 920);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface PhotoCardProps {
  item: GalleryPhoto;
  index: number;
  total: number;
  radius: number;
  currentAngle: number;
  onSelect: (index: number) => void;
}

function PhotoCard({
  item,
  index,
  total,
  radius,
  currentAngle,
  onSelect,
}: PhotoCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const angleStep = (Math.PI * 2) / total;
  const baseAngle = index * angleStep;

  // Generate card texture once
  const texture = useMemo(() => createCardTexture(item), [item]);

  useFrame(() => {
    if (!meshRef.current) return;
    const angle = baseAngle + currentAngle;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    meshRef.current.position.x = x;
    meshRef.current.position.z = z;

    // Face directly towards the origin / viewer
    meshRef.current.rotation.y = angle;

    // Distance-based scale and depth opacity (closer cards are larger)
    const normalizedZ = (z + radius) / (radius * 2); // 0 (back) to 1 (front)
    const targetScale = (0.75 + normalizedZ * 0.35) * (hovered ? 1.12 : 1.0);
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Tilt slightly based on hover
    meshRef.current.position.y = hovered ? 0.2 : Math.sin(angle * 2) * 0.1;
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
    >
      {/* 3D Golden Frame Box */}
      <mesh position={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[2.08, 2.76, 0.08]} />
        <meshStandardMaterial
          color={hovered ? '#ffe299' : '#d4af37'}
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* Picture Canvas Plane */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.96, 2.64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Frame Accent Spotlight on Hover */}
      {hovered && (
        <pointLight position={[0, 0, 1.2]} intensity={2.5} distance={3} color="#ffe8b0" />
      )}
    </group>
  );
}

interface CarouselSceneProps {
  photos: GalleryPhoto[];
  selectedIndex: number;
  onSelectPhoto: (index: number) => void;
  autoRotate: boolean;
}

function CarouselScene({
  photos,
  selectedIndex,
  onSelectPhoto,
  autoRotate,
}: CarouselSceneProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const isDragging = useRef(false);
  const previousX = useRef(0);
  const momentum = useRef(0);

  const radius = 3.6;
  const total = photos.length;

  useFrame((_, delta) => {
    if (!isDragging.current) {
      if (autoRotate) {
        setCurrentAngle((prev) => prev + delta * 0.18);
      } else if (Math.abs(momentum.current) > 0.001) {
        setCurrentAngle((prev) => prev + momentum.current);
        momentum.current *= 0.92;
      }
    }
  });

  return (
    <group
      onPointerDown={(e) => {
        isDragging.current = true;
        previousX.current = e.clientX;
        momentum.current = 0;
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - previousX.current;
        previousX.current = e.clientX;
        const angleDelta = (deltaX / window.innerWidth) * Math.PI * 1.5;
        momentum.current = angleDelta;
        setCurrentAngle((prev) => prev + angleDelta);
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerLeave={() => {
        isDragging.current = false;
      }}
    >
      {/* Central Ambient Ring Chandelier */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <torusGeometry args={[radius, 0.04, 16, 64]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Dynamic 3D Photo Cards */}
      {photos.map((item, index) => (
        <PhotoCard
          key={item.id}
          item={item}
          index={index}
          total={total}
          radius={radius}
          currentAngle={currentAngle}
          onSelect={onSelectPhoto}
        />
      ))}
    </group>
  );
}

interface Interactive3DGalleryProps {
  photos: GalleryPhoto[];
  onOpenPhotoDetail: (index: number) => void;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function Interactive3DGallery({
  photos,
  onOpenPhotoDetail,
  currentIndex,
  onNavigate,
}: Interactive3DGalleryProps) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden border border-[#d4af37]/30 bg-gradient-to-b from-[#111320] via-[#090a10] to-[#121422] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.12)]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.3, 5.8], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.9} color="#fff1d6" />
        <directionalLight position={[0, 8, 5]} intensity={1.8} color="#ffe299" />
        <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#ffb7c5" />
        <pointLight position={[0, 0, 3]} intensity={1.4} color="#ffd280" />

        {/* Floating Petals and Dust in 3D Gallery Space */}
        <Petals count={30} />
        <DreiSparkles count={45} scale={8} size={2.5} color="#f5c767" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <CarouselScene
            photos={photos}
            selectedIndex={currentIndex}
            onSelectPhoto={(idx) => {
              onNavigate(idx);
              onOpenPhotoDetail(idx);
            }}
            autoRotate={autoRotate}
          />
        </Float>
      </Canvas>

      {/* Overlay Instructions & Controls */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121420]/80 backdrop-blur-md border border-[#d4af37]/30 text-xs text-[#f5c767] pointer-events-auto shadow-md">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          <span>Geser / Putar Galeri 3D</span>
        </div>

        <button
          id="btn-toggle-gallery-autorotate"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`pointer-events-auto px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
            autoRotate
              ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5c767]'
              : 'bg-white/5 border-white/15 text-zinc-400 hover:text-white'
          }`}
        >
          {autoRotate ? 'Auto-Putar: Aktif' : 'Auto-Putar: Jeda'}
        </button>
      </div>

      {/* Bottom Floating Bar with Active Item Preview */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 p-3 sm:p-4 rounded-2xl bg-[#121420]/85 backdrop-blur-md border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel">
            Momen Terpilih
          </span>
          <h4 className="text-base sm:text-lg font-serif text-[#fce9b8] font-bold">
            {photos[currentIndex]?.title}
          </h4>
          <p className="text-xs text-zinc-300 font-light italic">
            &ldquo;{photos[currentIndex]?.subtitle}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-3d-prev-card"
            onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            &larr; Sebelumnya
          </button>
          <button
            id="btn-3d-next-card"
            onClick={() => onNavigate((currentIndex + 1) % photos.length)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            Berikutnya &rarr;
          </button>
          <button
            id="btn-3d-open-detail"
            onClick={() => onOpenPhotoDetail(currentIndex)}
            className="px-4 py-1.5 rounded-xl bg-[#d4af37] hover:bg-[#f3c861] text-black font-semibold text-xs transition cursor-pointer shadow-md"
          >
            Buka Detail
          </button>
        </div>
      </div>
    </div>
  );
}

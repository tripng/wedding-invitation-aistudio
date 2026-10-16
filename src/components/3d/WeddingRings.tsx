import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WeddingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const diamondRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [spinBoost, setSpinBoost] = useState(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Decay spin boost
    if (spinBoost > 0) {
      setSpinBoost((prev) => Math.max(0, prev - delta * 2.5));
    }

    const t = state.clock.getElapsedTime();
    const baseRotationSpeed = (hovered ? 0.6 : 0.25) + spinBoost * 2;

    // Smooth continuous rotation
    groupRef.current.rotation.y += delta * baseRotationSpeed;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.15 + 0.1;
    groupRef.current.rotation.z = Math.cos(t * 0.4) * 0.08;

    // Gentle floating bob
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;

    // Subtle pointer parallax tilt
    const targetTiltX = state.pointer.y * 0.35;
    const targetTiltY = state.pointer.x * 0.45;
    groupRef.current.rotation.x += (targetTiltX - groupRef.current.rotation.x * 0.1) * 0.05;

    // Diamond glint shimmer pulse
    if (diamondRef.current) {
      const scale = 1 + Math.sin(t * 4) * 0.06 + (hovered ? 0.12 : 0);
      diamondRef.current.scale.set(scale, scale, scale);
    }
  });

  const handleClick = () => {
    setSpinBoost(2.5);
  };

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
      scale={hovered ? 1.08 : 1.0}
    >
      {/* GROOM RING - Classic Polished 18k Yellow Gold */}
      <mesh
        ref={ring1Ref}
        position={[-0.45, 0, 0]}
        rotation={[Math.PI / 3.2, 0.4, 0]}
        castShadow
      >
        <torusGeometry args={[1.15, 0.14, 32, 64]} />
        <meshStandardMaterial
          color="#f5c767"
          roughness={0.12}
          metalness={0.96}
          envMapIntensity={2.2}
        />
      </mesh>

      {/* BRIDE RING - Interlocking Warm Rose Gold */}
      <group position={[0.45, 0.08, 0]} rotation={[-Math.PI / 3.4, -0.35, 0.2]}>
        <mesh ref={ring2Ref} castShadow>
          <torusGeometry args={[1.05, 0.11, 32, 64]} />
          <meshStandardMaterial
            color="#e8a598"
            roughness={0.14}
            metalness={0.94}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Diamond Setting Crown */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.16, 0.1, 0.22, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.98}
          />
        </mesh>

        {/* Sparkling Solitaire Diamond */}
        <mesh ref={diamondRef} position={[0, 1.34, 0]} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.04}
            transmission={0.88}
            thickness={1.4}
            ior={2.417}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={0.95}
          />
        </mesh>

        {/* Subtle Diamond Halo Glow point light */}
        <pointLight position={[0, 1.35, 0.3]} distance={2.5} intensity={hovered ? 3.5 : 1.8} color="#ffe8d6" />
      </group>

      {/* Central Sparkle Glint */}
      <pointLight position={[0, 0, 1.5]} distance={4} intensity={2.0} color="#fff1c5" />
    </group>
  );
}

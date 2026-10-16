import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalData {
  pos: [number, number, number];
  rot: [number, number, number];
  rotSpeed: [number, number, number];
  speed: number;
  swaySpeed: number;
  swayOffset: number;
  scale: number;
  color: THREE.Color;
}

export function Petals({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Soft romantic colors for rose and cherry blossom petals
  const colors = useMemo(() => [
    new THREE.Color('#ffb7c5'), // Sakura Pink
    new THREE.Color('#f8c8d2'), // Soft Rose
    new THREE.Color('#fae1dd'), // Pale Blush
    new THREE.Color('#fcd5ce'), // Peach Pearl
    new THREE.Color('#fefae0'), // Champagne Silk
  ], []);

  const petals = useMemo<PetalData[]>(() => {
    const arr: PetalData[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10 - 2,
        ],
        rot: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        rotSpeed: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.03,
        ],
        speed: 0.012 + Math.random() * 0.016,
        swaySpeed: 0.8 + Math.random() * 1.2,
        swayOffset: Math.random() * Math.PI * 2,
        scale: 0.7 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  }, [count, colors]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    petals.forEach((p, i) => {
      // Falling movement with wind turbulence
      p.pos[1] -= p.speed;
      p.pos[0] += Math.sin(time * p.swaySpeed + p.swayOffset) * 0.008;
      p.pos[2] += Math.cos(time * p.swaySpeed * 0.7 + p.swayOffset) * 0.004;

      // Tumbling rotation
      p.rot[0] += p.rotSpeed[0];
      p.rot[1] += p.rotSpeed[1];
      p.rot[2] += p.rotSpeed[2];

      // Respawn at top if fallen below threshold
      if (p.pos[1] < -7) {
        p.pos[1] = 7;
        p.pos[0] = (Math.random() - 0.5) * 16;
        p.pos[2] = (Math.random() - 0.5) * 10 - 2;
      }

      dummy.position.set(p.pos[0], p.pos[1], p.pos[2]);
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
      dummy.scale.set(p.scale * 0.22, p.scale * 0.28, p.scale * 0.06);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
      meshRef.current?.setColorAt(i, p.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <sphereGeometry args={[1, 7, 7]} />
      <meshStandardMaterial
        roughness={0.4}
        metalness={0.05}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

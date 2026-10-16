import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { WeddingRings } from './WeddingRings';
import { Petals } from './Petals';
import { Sparkles } from './Sparkles';

interface WeddingSceneProps {
  interactive?: boolean;
  lightingMode?: 'gold' | 'romantic' | 'night';
  showPetals?: boolean;
  className?: string;
}

export function WeddingScene({
  interactive = true,
  lightingMode = 'romantic',
  showPetals = true,
  className = 'w-full h-full',
}: WeddingSceneProps) {
  // Lighting configurations
  const lightColors = {
    gold: {
      ambient: '#ffeec2',
      dir: '#ffc043',
      point: '#ffd778',
    },
    romantic: {
      ambient: '#fff0f3',
      dir: '#ffb3c6',
      point: '#fde2e4',
    },
    night: {
      ambient: '#bde0fe',
      dir: '#a2d2ff',
      point: '#ffc8dd',
    },
  }[lightingMode];

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.9} color={lightColors.ambient} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.8}
            color={lightColors.dir}
          />
          <directionalLight
            position={[-4, -3, -2]}
            intensity={0.6}
            color="#ffe5d9"
          />
          <pointLight
            position={[0, 1.5, 3]}
            intensity={1.2}
            color={lightColors.point}
          />

          {/* 3D Wedding Rings with Floating dynamics */}
          <Float
            speed={1.6}
            rotationIntensity={0.3}
            floatIntensity={0.5}
            floatingRange={[-0.1, 0.1]}
          >
            <WeddingRings />
          </Float>

          {/* Drifting Flower Petals */}
          {showPetals && <Petals count={48} />}

          {/* Twinkling Golden Dust */}
          <Sparkles count={60} />

          {/* Controls: gentle orbit with auto-damping */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.6}
              rotateSpeed={0.6}
              dampingFactor={0.06}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

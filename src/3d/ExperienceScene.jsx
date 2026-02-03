import React, { useRef, useMemo, lazy, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  PerspectiveCamera,
  ScrollControls,
  Scroll,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import Overlay from '../components/Overlay';
import logoImg from '../assets/YMZ Media.png';

// Lazy load heavy effects - only load on powerful devices
const LazyEffects = lazy(() => import('./Effects'));

// Simplified star field using instanced mesh for better performance
const SimpleStars = ({ count = 500 }) => {
  const mesh = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = -Math.random() * 50;
    }
    return pos;
  }, [count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Optimized floating shape - uses simpler geometry
const FloatingShape = ({ position, color, scale = 1, speed = 1, type = 0 }) => {
  const meshRef = useRef();
  const initialY = useRef(position[1]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = initialY.current + Math.sin(time) * 0.15;
    }
  });

  // Use simpler geometries with lower polygon count
  const geometry = useMemo(() => {
    switch (type) {
      case 0: return <octahedronGeometry args={[0.15, 0]} />;
      case 1: return <sphereGeometry args={[0.1, 8, 8]} />; // Reduced from 16,16
      default: return <torusGeometry args={[0.1, 0.03, 6, 12]} />; // Reduced segments
    }
  }, [type]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

// Logo - simple floating plane
const LogoModel = ({ ...props }) => {
  const texture = useTexture(logoImg);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group {...props}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={texture} transparent opacity={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const SceneContent = () => {
  const { viewport } = useThree();

  // Reduced number of decorative elements (from 30 to 15)
  const decorativeElements = useMemo(() => {
    const elements = [];
    const colors = ['#00f5ff', '#8b5cf6', '#ff00aa', '#ffd700', '#10b981'];

    for (let i = 0; i < 15; i++) {
      elements.push({
        x: (Math.random() - 0.5) * 12,
        y: -Math.random() * viewport.height * 4,
        z: -2 - Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.4 + Math.random() * 0.4,
        speed: 0.5 + Math.random() * 0.8,
        type: Math.floor(Math.random() * 3),
        key: i,
      });
    }
    return elements;
  }, [viewport.height]);

  return (
    <Scroll>
      {/* Logo */}
      <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
        <group position={[2.2, 0.3, 0]}>
          <LogoModel />
        </group>
      </Float>

      {/* Decorative elements */}
      {decorativeElements.map((el) => (
        <FloatingShape
          key={el.key}
          position={[el.x, el.y, el.z]}
          color={el.color}
          scale={el.scale}
          speed={el.speed}
          type={el.type}
        />
      ))}
    </Scroll>
  );
};

// Effects fallback for when lazy loading
const EffectsFallback = () => null;

const Experience = () => {
  // Detect if device can handle heavy effects
  const canHandleEffects = useMemo(() => {
    if (typeof window === 'undefined') return false;
    // Check for powerful GPU indicators
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      // Disable effects on mobile/integrated GPUs
      if (renderer.includes('Intel') || renderer.includes('Mali') || renderer.includes('Adreno')) {
        return false;
      }
    }
    return window.innerWidth > 768;
  }, []);

  return (
    <ScrollControls pages={6.3} damping={0.25}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />

      {/* Deep space background */}
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 10, 30]} />

      {/* Simplified lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#00f5ff" distance={15} />

      {/* Optimized stars */}
      <SimpleStars count={500} />

      <SceneContent />

      {/* Lazy load heavy post-processing only on capable devices */}
      {canHandleEffects && (
        <Suspense fallback={<EffectsFallback />}>
          <LazyEffects />
        </Suspense>
      )}

      <Overlay />
    </ScrollControls>
  );
};

export default Experience;

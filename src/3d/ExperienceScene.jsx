import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  PerspectiveCamera,
  ScrollControls,
  Stars,
  Sparkles,
  Environment,
  Scroll,
  useTexture,
  useScroll,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import Overlay from '../components/Overlay';
import logoImg from '../assets/YMZ Media.png';

// Small Floating Crystal
const FloatingCrystal = ({ position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Small Floating Sphere
const FloatingSphere = ({ position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.15;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Small Floating Ring
const FloatingRing = ({ position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[0.12, 0.03, 8, 24]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.5}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Logo - floating but NOT rotating
const LogoModel = ({ ...props }) => {
  const texture = useTexture(logoImg);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Only gentle floating, no rotation
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

  // Decorative small shapes scattered throughout
  const decorativeElements = useMemo(() => {
    const elements = [];
    const colors = ['#00f5ff', '#8b5cf6', '#ff00aa', '#ffd700', '#10b981'];

    // Generate random small decorative elements
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = -Math.random() * viewport.height * 4;
      const z = -2 - Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const scale = 0.3 + Math.random() * 0.5;
      const speed = 0.5 + Math.random() * 1;
      const type = Math.floor(Math.random() * 3);

      elements.push({ x, y, z, color, scale, speed, type, key: i });
    }
    return elements;
  }, [viewport.height]);

  return (
    <>
      <Scroll>
        {/* Logo - floating in hero section, not rotating */}
        <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
          <group position={[2.2, 0.3, 0]}>
            <LogoModel />
          </group>
        </Float>

        {/* Small decorative elements scattered throughout */}
        {decorativeElements.map((el) => {
          if (el.type === 0) {
            return (
              <FloatingCrystal
                key={el.key}
                position={[el.x, el.y, el.z]}
                color={el.color}
                scale={el.scale}
                speed={el.speed}
              />
            );
          } else if (el.type === 1) {
            return (
              <FloatingSphere
                key={el.key}
                position={[el.x, el.y, el.z]}
                color={el.color}
                scale={el.scale}
                speed={el.speed}
              />
            );
          } else {
            return (
              <FloatingRing
                key={el.key}
                position={[el.x, el.y, el.z]}
                color={el.color}
                scale={el.scale}
                speed={el.speed}
              />
            );
          }
        })}
      </Scroll>
    </>
  );
};

const Experience = () => {
  return (
    <ScrollControls pages={5} damping={0.25}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />

      {/* Deep space background */}
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 10, 30]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00f5ff" distance={20} />
      <pointLight position={[-5, 0, 5]} intensity={0.3} color="#ff00aa" distance={15} />

      {/* Stars background */}
      <Stars
        radius={150}
        depth={80}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Sparkles */}
      <Sparkles
        count={80}
        scale={15}
        size={2}
        speed={0.2}
        opacity={0.5}
        color="#00f5ff"
      />
      <Sparkles
        count={40}
        scale={12}
        size={1.5}
        speed={0.3}
        opacity={0.3}
        color="#8b5cf6"
      />

      <Environment preset="night" blur={0.8} />

      <SceneContent />

      {/* Post-processing */}
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.9}
          mipmapBlur
          intensity={0.5}
          radius={0.5}
        />
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>

      <Overlay />
    </ScrollControls>
  );
};

export default Experience;

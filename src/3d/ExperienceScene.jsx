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
  useScroll
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Overlay from '../components/Overlay';
import logoImg from '../assets/YMZ Media.png';

// Premium Metallic/Glass Material
const PremiumMaterial = ({ color, opacity = 0.6, roughness = 0.2, metalness = 0.8 }) => (
  <meshStandardMaterial
    color={color}
    transparent
    opacity={opacity}
    roughness={roughness}
    metalness={metalness}
    envMapIntensity={1.5}
  />
);

const LogoModel = ({ ...props }) => {
  const texture = useTexture(logoImg);
  const meshRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    // Floating in space effect: Slow rotation + reaction to scroll
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Constant slow drift
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Gentle tilt

      // React to scroll
      meshRef.current.rotation.x += scroll.delta * 2;
      meshRef.current.rotation.y += scroll.delta * 5;
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

const KeyboardModel = ({ color, ...props }) => {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Dynamic rotation on scroll
      groupRef.current.rotation.x = 0.5 + scroll.delta * 5;
      groupRef.current.rotation.y += delta * 0.5 + scroll.delta * 2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Base */}
      <mesh position={[0, 0, 0]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.15, 1.2]} />
        <PremiumMaterial color={color} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Keys */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[0, 0.1, -0.3 + i * 0.25]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.08, 0.15]} />
          <PremiumMaterial color="#ffffff" opacity={0.8} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
};

const HeadphoneModel = ({ color, ...props }) => {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5 + scroll.delta * 10; // Spin fast on scroll
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Headband - Thicker and better shaped */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <torusGeometry args={[0.9, 0.12, 16, 32, Math.PI]} />
        <PremiumMaterial color={color} />
      </mesh>

      {/* Earcups - Improved */}
      <group position={[-0.95, -0.1, 0]}>
        {/* Cup Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <PremiumMaterial color={color} />
        </mesh>
        {/* Cushion - Thicker Torus */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.15, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.3, 0.12, 16, 32]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
      </group>

      <group position={[0.95, -0.1, 0]}>
        {/* Cup Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <PremiumMaterial color={color} />
        </mesh>
        {/* Cushion */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.15, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.3, 0.12, 16, 32]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

const StatsIcon = ({ color, ...props }) => {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta + scroll.delta * 5;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[-0.3, -0.2, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <PremiumMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <PremiumMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.2, 0]}>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <PremiumMaterial color={color} />
      </mesh>
    </group>
  )
}

const FloatingGroup = ({ children, position, ...props }) => {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    // Parallax effect
    if (groupRef.current) {
      // Move slightly based on mouse/scroll for parallax
      // We can use scroll.offset to shift position slightly
      const yOffset = scroll.offset * 2;
      // This is a simple parallax, but for true parallax we might want to adjust the y position relative to the scroll
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position} {...props}>
      {children}
    </Float>
  );
};

const SceneContent = () => {
  const { viewport } = useThree();

  return (
    <>
      <Scroll>
        {/* Hero Section - Company Logo (Floating in Space) */}
        {/* Tilted angle for "floating in space" look */}
        <FloatingGroup position={[2.5, 0.5, 0]} rotation={[0.5, -0.5, 0.2]} scale={0.8}>
          <LogoModel />
        </FloatingGroup>

        {/* Services Section - Keyboard */}
        <FloatingGroup position={[-2.5, -viewport.height, 0]} scale={1.2}>
          <KeyboardModel color="#06b6d4" />
        </FloatingGroup>

        {/* Stats/Growth Icon */}
        <FloatingGroup position={[3, -viewport.height - 1, -2]} scale={1.5}>
          <StatsIcon color="#8b5cf6" />
        </FloatingGroup>

        {/* Portfolio Section - Headphone */}
        <FloatingGroup position={[2.5, -viewport.height * 2, 0]} scale={1.4}>
          <HeadphoneModel color="#f43f5e" />
        </FloatingGroup>

        {/* Contact/Partners Section - Simplified Network/Globe */}
        <FloatingGroup position={[0, -viewport.height * 3, 0]} scale={1.5}>
          <mesh>
            <icosahedronGeometry args={[1.2, 1]} />
            <meshStandardMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.8, 0]} />
            <PremiumMaterial color="#f59e0b" />
          </mesh>
        </FloatingGroup>
      </Scroll>
    </>
  );
};

const Experience = () => {
  return (
    <ScrollControls pages={4} damping={0.3}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      <color attach="background" args={['#050505']} />

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#4444ff" />
      <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} />

      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={40} scale={10} size={2} speed={0.4} opacity={0.4} color="#ffffff" />

      <Environment preset="city" blur={0.8} />

      <SceneContent />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.6} radius={0.5} />
      </EffectComposer>

      <Overlay />
    </ScrollControls>
  );
};

export default Experience;

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  PerspectiveCamera,
  ScrollControls,
  Stars,
  Sparkles,
  Environment,
  Scroll
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Overlay from '../components/Overlay';

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

const CameraModel = ({ color, ...props }) => (
  <group {...props}>
    {/* Body Main */}
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.8, 1.2, 0.6]} />
      <PremiumMaterial color={color} />
    </mesh>
    {/* Grip */}
    <mesh position={[0.7, 0, 0.4]} castShadow receiveShadow>
      <boxGeometry args={[0.4, 1.1, 0.4]} />
      <PremiumMaterial color={color} roughness={0.8} /> {/* Rubber grip texture */}
    </mesh>
    {/* Lens Base */}
    <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.5, 0.6, 0.2, 32]} />
      <PremiumMaterial color="#333" metalness={0.5} />
    </mesh>
    {/* Lens Barrel */}
    <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.45, 0.45, 0.6, 32]} />
      <PremiumMaterial color={color} opacity={0.8} />
    </mesh>
    {/* Lens Glass */}
    <mesh position={[0, 0, 0.91]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
      <meshPhysicalMaterial
        color="#88ccff"
        transmission={0.5}
        roughness={0}
        metalness={0}
        thickness={0.5}
      />
    </mesh>
    {/* Flash/Viewfinder */}
    <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.6, 0.4, 0.6]} />
      <PremiumMaterial color={color} />
    </mesh>
    {/* Shutter Button */}
    <mesh position={[0.6, 0.6, 0.2]} castShadow receiveShadow>
      <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
      <meshStandardMaterial color="#ff0000" metalness={0.8} roughness={0.2} />
    </mesh>
  </group>
);

const KeyboardModel = ({ color, ...props }) => (
  <group {...props}>
    {/* Base */}
    <mesh position={[0, 0, 0]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.2, 0.15, 1.2]} />
      <PremiumMaterial color={color} metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Keys - Simplified Rows for performance but with better look */}
    {[...Array(4)].map((_, i) => (
      <mesh key={i} position={[0, 0.1, -0.3 + i * 0.25]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.08, 0.15]} />
        <PremiumMaterial color="#ffffff" opacity={0.8} roughness={0.4} />
      </mesh>
    ))}
  </group>
);

const HeadphoneModel = ({ color, ...props }) => (
  <group {...props}>
    {/* Headband */}
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
      <torusGeometry args={[0.8, 0.08, 16, 32, Math.PI]} />
      <PremiumMaterial color={color} />
    </mesh>
    {/* Earcups */}
    <group position={[-0.85, -0.2, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
        <PremiumMaterial color={color} />
      </mesh>
      {/* Cushion */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.15, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.25, 0.1, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>
    </group>
    <group position={[0.85, -0.2, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
        <PremiumMaterial color={color} />
      </mesh>
      {/* Cushion */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.15, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.25, 0.1, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>
    </group>
  </group>
);

const StatsIcon = ({ color, ...props }) => (
  <group {...props}>
    {/* Bar Chart 3D */}
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

const FloatingGroup = ({ children, speed = 1, rotationIntensity = 0.5, floatIntensity = 0.5, ...props }) => {
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity} {...props}>
      {children}
    </Float>
  );
};

const SceneContent = () => {
  const { viewport } = useThree();

  return (
    <>
      <Scroll>
        {/* Hero Section - Camera (Production) */}
        <FloatingGroup position={[2, 0, 0]} rotation={[0, -0.5, 0]} scale={1.1}>
          <CameraModel color="#4f46e5" />
        </FloatingGroup>

        {/* Services Section - Keyboard (Marketing/Content) */}
        <FloatingGroup position={[-2.5, -viewport.height, 0]} rotation={[0.5, 0.5, 0]} scale={1.2}>
          <KeyboardModel color="#06b6d4" />
        </FloatingGroup>

        {/* Stats/Growth Icon */}
        <FloatingGroup position={[3, -viewport.height - 1, -2]} scale={1.5} rotation={[0, -0.5, 0]}>
          <StatsIcon color="#8b5cf6" />
        </FloatingGroup>

        {/* Portfolio Section - Headphone (Audio/Media) */}
        <FloatingGroup position={[2.5, -viewport.height * 2, 0]} rotation={[0, -0.5, 0.2]} scale={1.4}>
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

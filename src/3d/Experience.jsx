import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, useScroll, ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import Overlay from '../components/Overlay';

const MorphingMesh = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const scroll = useScroll();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollOffset = scroll.offset; // 0 to 1

    if (meshRef.current) {
      // Rotate based on time and scroll
      meshRef.current.rotation.x = time * 0.1 + scrollOffset * Math.PI * 2;
      meshRef.current.rotation.y = time * 0.15 + scrollOffset * Math.PI;
    }

    if (materialRef.current) {
      // Morph distortion based on scroll
      // Base distortion + scroll influence
      materialRef.current.distort = 0.4 + scrollOffset * 0.6;

      // Color shift based on scroll
      const color = new THREE.Color('#646cff').lerp(new THREE.Color('#ff64b0'), scrollOffset);
      materialRef.current.color = color;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#646cff"
          roughness={0.2}
          metalness={0.9}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const Experience = () => {
  return (
    <ScrollControls pages={4} damping={0.3}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff0000" />
      <MorphingMesh />
      <Overlay />
    </ScrollControls>
  );
};

export default Experience;

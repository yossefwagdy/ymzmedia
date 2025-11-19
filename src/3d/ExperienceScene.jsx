import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, useScroll, ScrollControls, Stars, Sparkles } from '@react-three/drei';

// ... (MorphingMesh component remains the same)

const Experience = () => {
  return (
    <ScrollControls pages={4} damping={0.3}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff0000" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#646cff" />

      <MorphingMesh />
      <Overlay />
    </ScrollControls>
  );
};

export default Experience;

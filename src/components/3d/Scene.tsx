// src/components/3d/Scene.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Scene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  // Create floating particles
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    // eslint-disable-next-line react-hooks/purity
    positions[i * 3] = (Math.random() - 0.5) * 10;
    // eslint-disable-next-line react-hooks/purity
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    // eslint-disable-next-line react-hooks/purity
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.2} />
      
      <Stars 
        radius={50} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          
        </Float>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#6a7891"
          transparent
          opacity={0.5}
        />
      </points>
    </>
  );
};

export default Scene;
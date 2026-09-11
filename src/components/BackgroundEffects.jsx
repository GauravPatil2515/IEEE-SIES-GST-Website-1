/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// Mouse position store
const mouseStore = { x: 0, y: 0, worldX: 0, worldY: 0 };

// Star Layer Component with parallax and interactive glow
const StarLayer = ({ count, radius, size, speed, color, glowIntensity = 1 }) => {
  const ref = useRef();
  const [positions] = useState(() => random.inSphere(new Float32Array(count * 3), { radius }));
  const [originalPositions] = useState(() => [...positions]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Parallax rotation based on layer speed
      ref.current.rotation.x -= delta / (80 / speed);
      ref.current.rotation.y -= delta / (100 / speed);

      // Mouse-based rotation
      const targetX = mouseStore.y * 0.3 * speed;
      const targetY = mouseStore.x * 0.3 * speed;
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * delta * 1.5;
      ref.current.rotation.y += (targetY - ref.current.rotation.y) * delta * 1.5;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9 * glowIntensity}
        />
      </Points>
    </group>
  );
};

// Interactive glow layer - stars that react to mouse proximity
const InteractiveStars = ({ count = 200 }) => {
  const ref = useRef();
  const [basePositions] = useState(() => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }));
  const colorsRef = useRef(new Float32Array(count * 3).fill(1));
  const sizesRef = useRef(new Float32Array(count).fill(0.003));

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array;
      const colors = colorsRef.current;
      const sizes = sizesRef.current;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];

        // Calculate distance from mouse in world space
        const dx = x - mouseStore.worldX * 2;
        const dy = y - mouseStore.worldY * 2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Glow effect based on proximity
        const glowFactor = Math.max(0, 1 - dist / 0.5);

        // Update colors (cyan glow near cursor)
        colors[i3] = 1;     // R
        colors[i3 + 1] = 1 + glowFactor * 0.5; // G (boost toward cyan)
        colors[i3 + 2] = 1 + glowFactor; // B (boost toward cyan)

        // Update sizes (bigger near cursor)
        sizes[i] = 0.003 + glowFactor * 0.008;
      }

      ref.current.geometry.attributes.color.needsUpdate = true;
      ref.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={basePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colorsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizesRef.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.005}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Constellation component - connects stars with lines
const Constellations = () => {
  const constellationData = useMemo(() => {
    // Create IEEE-inspired constellation pattern
    const patterns = [
      // "I" shape
      [[-0.3, 0.4, 0], [-0.3, 0.1, 0], [-0.3, -0.2, 0]],
      // "E" shape
      [[-0.1, 0.4, 0], [-0.1, 0.1, 0], [0.1, 0.1, 0], [-0.1, 0.1, 0], [-0.1, -0.2, 0], [0.1, -0.2, 0]],
      // Random constellation 1
      [[0.5, 0.3, -0.2], [0.6, 0.1, -0.1], [0.7, 0.2, 0], [0.55, 0.0, 0.1]],
      // Random constellation 2
      [[-0.6, -0.3, 0.1], [-0.5, -0.4, 0], [-0.4, -0.3, -0.1], [-0.5, -0.2, 0]],
    ];
    return patterns;
  }, []);

  return (
    <group>
      {constellationData.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#00b5e2"
          lineWidth={0.5}
          opacity={0.15}
          transparent
        />
      ))}
      {/* Constellation star points */}
      {constellationData.flat().map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshBasicMaterial color="#00b5e2" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// Shooting Star component
const ShootingStar = ({ onComplete }) => {
  const ref = useRef();
  const [startPos] = useState(() => ({
    x: (Math.random() - 0.5) * 3,
    y: 1.5 + Math.random() * 0.5,
    z: (Math.random() - 0.5) * 2
  }));
  const [velocity] = useState(() => ({
    x: (Math.random() - 0.5) * 0.02,
    y: -0.03 - Math.random() * 0.02,
    z: 0
  }));
  const [life, setLife] = useState(1);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x += velocity.x;
      ref.current.position.y += velocity.y;
      ref.current.position.z += velocity.z;

      setLife(prev => {
        const newLife = prev - delta * 0.8;
        if (newLife <= 0) {
          onComplete();
        }
        return newLife;
      });

      ref.current.scale.setScalar(life);
    }
  });

  return (
    <group ref={ref} position={[startPos.x, startPos.y, startPos.z]}>
      {/* Star head */}
      <mesh>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={life} />
      </mesh>
      {/* Trail */}
      <mesh position={[velocity.x * -5, velocity.y * -5, 0]}>
        <cylinderGeometry args={[0.002, 0.008, 0.15, 8]} />
        <meshBasicMaterial color="#00b5e2" transparent opacity={life * 0.5} />
      </mesh>
    </group>
  );
};

// Shooting Stars Manager
const ShootingStarsManager = () => {
  const [stars, setStars] = useState([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to spawn a shooting star
      if (Math.random() < 0.3) {
        setStars(prev => [...prev, { id: idCounter.current++ }]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = (id) => {
    setStars(prev => prev.filter(star => star.id !== id));
  };

  return (
    <>
      {stars.map(star => (
        <ShootingStar key={star.id} onComplete={() => handleComplete(star.id)} />
      ))}
    </>
  );
};

// Mouse tracker component
const MouseTracker = () => {
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseStore.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseStore.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseStore.worldX = mouseStore.x * viewport.width / 2;
      mouseStore.worldY = mouseStore.y * viewport.height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  return null;
};

const EnhancedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <MouseTracker />

        {/* Parallax Star Layers - different depths */}
        <StarLayer count={3000} radius={1.5} size={0.0015} speed={0.5} color="#ffffff" />
        <StarLayer count={2000} radius={1.2} size={0.002} speed={1} color="#e0e8ff" />
        <StarLayer count={1000} radius={0.9} size={0.003} speed={1.5} color="#b8d4ff" />

        {/* Interactive stars that glow near cursor */}
        <InteractiveStars count={150} />

        {/* Shooting stars */}
        <ShootingStarsManager />
      </Canvas>
    </div>
  );
};

export default EnhancedBackground;


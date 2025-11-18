'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function GlitchStrip({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <Float speed={Math.random() * 2 + 1} rotationIntensity={2} floatIntensity={1}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[0.3, 1.5]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00aaff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function RotatingRing() {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1.5, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#00aaff"
        emissive="#00aaff"
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function Logo() {
  return (
    <group>
      {/* Central chrome sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            color="#00aaff"
            thickness={0.5}
            roughness={0.1}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.5}
            backside
          />
        </mesh>
      </Float>

      {/* Rotating ring around sphere */}
      <RotatingRing />

      
      {/* Glitch code strips */}
      {[...Array(8)].map((_, i) => (
        <GlitchStrip
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 2,
            Math.sin((i / 8) * Math.PI * 2) * 2,
            Math.random() - 0.5
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        />
      ))}

      {/* Lighting */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#00aaff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ddff" />
      <ambientLight intensity={0.2} />
    </group>
  )
}

export default function Logo3D() {
  return (
    <div className="w-full h-full relative touch-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <Logo />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-2 md:space-y-4 relative px-4">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary animate-pulse tracking-wider">
              OXCY 666
            </h1>
            <div className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-secondary opacity-30 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
              OXCY 666
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-secondary tracking-wide">
            Founder of OxcyShop
          </p>
          <div className="w-48 sm:w-64 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground opacity-60 tracking-widest uppercase">
            The Final Commit
          </p>
        </div>
      </div>
    </div>
  )
}

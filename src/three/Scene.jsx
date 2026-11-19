import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Helix from './Helix'
import { state, prefersReducedMotion } from '../store'

// Poeira de nucleotídeos: pontos finos que dão profundidade à cena.
function Dust({ count = 520 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 22
      p[i * 3 + 1] = (Math.random() - 0.5) * 14
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return p
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    if (!prefersReducedMotion) ref.current.rotation.y += dt * 0.01
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, state.progress * 3, 2, dt)
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, -state.pointer.x * 0.4, 2, dt)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#F0ECE2" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Scene() {
  return (
    <Canvas
      className="scene"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
      eventSource={undefined}
    >
      <fog attach="fog" args={['#121110', 10, 20]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 8]} intensity={1.1} />
      <directionalLight position={[-6, -3, -4]} intensity={0.5} color="#5E86E0" />

      {/* Luz de estúdio gerada localmente, sem baixar HDR */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, 2]} scale={[12, 2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} position={[-6, 1, 3]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.2} color="#3D6FE0" position={[6, -1, 2]} scale={[2, 8, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={2} position={[0, 0, 8]} scale={4} />
      </Environment>

      <Helix />
      <Dust />
    </Canvas>
  )
}

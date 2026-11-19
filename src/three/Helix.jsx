import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SEQ, COMPLEMENT } from '../data'
import { state, setReading, prefersReducedMotion } from '../store'

// Geometria da hélice: 45 pares de base agrupados em 15 códons (um respiro a cada trinca).
const R = 1.35
const STEP = 0.36
const GAP = 0.34
const TWIST = 0.42
const N = SEQ.length

// A e T em azuis da marca, G em cerâmica creme, C em grafite metálico.
const BASE = {
  A: { color: '#0B4AC8', roughness: 0.28, metalness: 0.15, clearcoat: 1 },
  T: { color: '#5E86E0', roughness: 0.3, metalness: 0.1, clearcoat: 1 },
  G: { color: '#EDE8DC', roughness: 0.35, metalness: 0, clearcoat: 1 },
  C: { color: '#4A4845', roughness: 0.22, metalness: 0.85, clearcoat: 0.6 }
}

const ys = (() => {
  const out = []
  let acc = 0
  for (let i = 0; i < N; i++) {
    out.push(acc)
    acc += STEP + (i % 3 === 2 ? GAP : 0)
  }
  const total = out[N - 1]
  return out.map((v) => total / 2 - v)
})()
const TOTAL = ys[0] - ys[N - 1]
const SPAN = TOTAL / 2 - 2.4

const yAt = (k) => {
  const a = Math.max(0, Math.min(N - 1, Math.floor(k)))
  const b = Math.min(N - 1, a + 1)
  return ys[a] + (ys[b] - ys[a]) * (k - a)
}

function strandGeometry(offset) {
  const pts = []
  for (let k = -0.8; k <= N - 1 + 0.8; k += 0.2) {
    const kk = Math.max(0, Math.min(N - 1, k))
    const ext = (k - kk) * STEP
    const ang = k * TWIST + offset
    pts.push(new THREE.Vector3(R * Math.cos(ang), yAt(kk) - ext, R * Math.sin(ang)))
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 700, 0.05, 14)
}

export default function Helix() {
  const rig = useRef()
  const helix = useRef()
  const ring = useRef()
  const ringMat = useRef()
  const { viewport, size } = useThree()

  const strands = useMemo(() => [strandGeometry(0), strandGeometry(Math.PI)], [])
  const capsule = useMemo(() => new THREE.CapsuleGeometry(0.068, R - 0.32, 6, 16), [])
  const node = useMemo(() => new THREE.SphereGeometry(0.12, 32, 24), [])

  const rungs = useMemo(
    () =>
      Array.from(SEQ).map((a, i) => {
        const b = COMPLEMENT[a]
        const mk = (l) =>
          new THREE.MeshPhysicalMaterial({ ...BASE[l], clearcoatRoughness: 0.15, emissive: '#2F6BFF', emissiveIntensity: 0 })
        return { i, y: ys[i], rot: -i * TWIST, codon: Math.floor(i / 3), mats: [mk(a), mk(b)], glow: 0, ref: null }
      }),
    []
  )

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const active = state.active

    // posição ao longo do eixo: rolagem ou códon do serviço em foco
    const targetY = active != null ? -ys[active * 3 + 1] : -SPAN + state.progress * SPAN * 2
    helix.current.position.y = THREE.MathUtils.damp(helix.current.position.y, targetY, 3.2, dt)

    // rotação contínua + impulso da rolagem
    const auto = prefersReducedMotion ? 0 : active != null ? 0.06 : 0.2
    helix.current.rotation.y += auto * dt + state.velocity * 0.0009
    state.velocity *= Math.pow(0.02, dt)

    // inclinação pelo mouse e posição lateral responsiva
    const wide = size.width >= 900
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, wide ? viewport.width * 0.22 : 0, 4, dt)
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, state.pointer.y * 0.12, 2.5, dt)
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, state.pointer.x * 0.3, 2.5, dt)

    // qual códon está no centro
    let best = 0
    let bd = Infinity
    for (let i = 0; i < N; i++) {
      const d = Math.abs(ys[i] + helix.current.position.y)
      if (d < bd) { bd = d; best = i }
    }
    const reading = active != null ? active : Math.floor(best / 3)
    setReading(reading)

    for (const r of rungs) {
      const target = r.codon === reading ? (active != null ? 1.1 : 0.45) : 0
      r.glow = THREE.MathUtils.damp(r.glow, target, 6, dt)
      r.mats[0].emissiveIntensity = r.glow
      r.mats[1].emissiveIntensity = r.glow
      if (r.ref) { const s = 1 + r.glow * 0.25; r.ref.scale.set(1, s, s) }
    }

    ring.current.position.y = THREE.MathUtils.damp(ring.current.position.y, ys[reading * 3 + 1], 8, dt)
    ring.current.rotation.z += dt * 0.5
    ringMat.current.opacity = THREE.MathUtils.damp(ringMat.current.opacity, active != null ? 0.95 : 0.4, 5, dt)
  })

  return (
    <group ref={rig} rotation={[0, 0, 0.3]}>
      <group ref={helix}>
        {strands.map((g, k) => (
          <mesh key={k} geometry={g}>
            <meshPhysicalMaterial color="#E9E3D6" roughness={0.32} clearcoat={1} clearcoatRoughness={0.1} />
          </mesh>
        ))}
        {rungs.map((r) => (
          <group key={r.i} position={[0, r.y, 0]} rotation={[0, r.rot, 0]} ref={(el) => (r.ref = el)}>
            <mesh geometry={capsule} material={r.mats[0]} position={[R / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
            <mesh geometry={capsule} material={r.mats[1]} position={[-R / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
            <mesh geometry={node} position={[R, 0, 0]}>
              <meshPhysicalMaterial color="#D9D4C8" metalness={1} roughness={0.12} />
            </mesh>
            <mesh geometry={node} position={[-R, 0, 0]}>
              <meshPhysicalMaterial color="#D9D4C8" metalness={1} roughness={0.12} />
            </mesh>
          </group>
        ))}
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[R + 0.5, 0.012, 8, 160]} />
          <meshBasicMaterial ref={ringMat} color="#4F82EC" transparent opacity={0} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

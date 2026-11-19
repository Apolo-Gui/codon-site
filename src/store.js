import { useSyncExternalStore } from 'react'

// Estado compartilhado entre a interface (React) e a cena 3D (lida a cada frame, sem re-render).
export const state = {
  active: null,   // códon focado por um serviço
  reading: 0,     // códon no centro da hélice
  progress: 0,    // progresso da rolagem 0..1
  velocity: 0,    // velocidade da rolagem
  pointer: { x: 0, y: 0 }
}

const listeners = new Set()
const emit = () => listeners.forEach((l) => l())

export function setActive(c) {
  if (state.active === c) return
  state.active = c
  emit()
}
export function setReading(c) {
  if (state.reading === c) return
  state.reading = c
  emit()
}

const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l) }
export const useActive = () => useSyncExternalStore(subscribe, () => state.active)
export const useReading = () => useSyncExternalStore(subscribe, () => state.reading)

export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

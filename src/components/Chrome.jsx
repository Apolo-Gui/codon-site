import { useEffect, useRef } from 'react'
import { SEQ, CODON_NAMES } from '../data'
import { useReading, useActive, prefersReducedMotion } from '../store'
import { Symbol } from './Nav'

// Indicador fixo: qual códon a hélice está lendo agora.
export function ReadingHud() {
  const reading = useReading()
  const active = useActive()
  const code = SEQ.substr(reading * 3, 3)
  const name = CODON_NAMES[reading] || `Códon ${reading + 1} de 15`
  return (
    <div className={'hud' + (active != null ? ' is-focus' : '')} aria-hidden="true">
      <i />
      <span className="hud-label">Lendo</span>
      <b>{code}</b>
      <span className="hud-name">{name}</span>
    </div>
  )
}

// Anel que acompanha o cursor e cresce sobre elementos clicáveis (só em mouse).
export function Cursor() {
  const ring = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return
    const el = ring.current
    el.style.display = 'block'
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf
    const move = (e) => {
      tx = e.clientX; ty = e.clientY
      const hit = e.target.closest?.('a, button, .svc, label, input, select, textarea')
      el.classList.toggle('is-hover', !!hit)
    }
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    loop()
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div className="cursor" ref={ring} aria-hidden="true" />
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-row">
          <span className="footer-brand"><Symbol size={18} />© 2026 Codon</span>
          <span>Engenharia estratégica digital</span>
          <span>Petrópolis · RJ</span>
          <a href="https://instagram.com/codon.sm" target="_blank" rel="noopener noreferrer">@codon.sm</a>
        </div>
        <div className="footer-word" aria-hidden="true">CODON</div>
      </div>
    </footer>
  )
}

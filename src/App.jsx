import { Component, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto, { Marquee } from './components/Manifesto'
import Services from './components/Services'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import { Cursor, Footer } from './components/Chrome'
import Scene from './three/Scene'
import { state, prefersReducedMotion } from './store'

// Se o WebGL falhar, o site continua inteiro, só sem a hélice.
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

export default function App() {
  const [picks, setPicks] = useState([])
  const lenisRef = useRef(null)
  const nameRef = useRef(null)
  const [webgl] = useState(hasWebGL)

  // rolagem suave + progresso para a cena 3D
  useEffect(() => {
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
      state.progress = Math.min(1, Math.max(0, scrollY / max))
    }
    let lenis, raf
    if (!prefersReducedMotion) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
      lenisRef.current = lenis
      lenis.on('scroll', (e) => { state.velocity += e.velocity; updateProgress() })
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true })
    }
    updateProgress()

    // âncoras internas passam pelo Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const target = document.querySelector(a.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(target, { offset: -64, duration: 1.4 })
      else target.scrollIntoView()
    }
    document.addEventListener('click', onClick)

    const onPointer = (e) => {
      state.pointer.x = (e.clientX / innerWidth) * 2 - 1
      state.pointer.y = (e.clientY / innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      window.removeEventListener('scroll', updateProgress)
      document.removeEventListener('click', onClick)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  const pick = (key) => {
    setPicks((p) => (p.includes(key) ? p : [...p, key]))
    const target = document.getElementById('contato')
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -64, duration: 1.4 })
    else target.scrollIntoView()
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), prefersReducedMotion ? 0 : 1300)
  }

  return (
    <>
      <a className="skip" href="#servicos">Pular para os serviços</a>
      {webgl && (
        <div className="scene-wrap" aria-hidden="true">
          <SceneBoundary><Scene /></SceneBoundary>
        </div>
      )}
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services onPick={pick} />
        <Portfolio />
        <Process />
        <Contact picks={picks} setPicks={setPicks} nameRef={nameRef} />
      </main>
      <Footer />
      <Cursor />
    </>
  )
}

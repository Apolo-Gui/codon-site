import { useEffect, useState } from 'react'

// Símbolo oficial da Codon: quatro quartos de círculo em grade 2×2.
// Sobre fundo escuro, os quartos grafite viram creme (versão negativa).
export function Symbol({ size = 24, className = '' }) {
  return (
    <svg className={'symbol ' + className} width={size} height={size} viewBox="0 0 410 406" aria-hidden="true" focusable="false">
      <path className="q q-blue" d="M0 195A195 195 0 0 1 195 0V195Z" />
      <path className="q q-ink" d="M409 0A195 195 0 0 1 214 195V0Z" />
      <path className="q q-ink" d="M195 405A195 195 0 0 1 0 210H195Z" />
      <path className="q q-blue" d="M214 405A195 195 0 0 1 409 210V405Z" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <Symbol size={26} />CODON
    </span>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={'nav' + (scrolled ? ' is-scrolled' : '')}>
      <div className="wrap nav-row">
        <a href="#inicio" className="logo-link" aria-label="Codon, voltar ao início"><Logo /></a>
        <nav aria-label="Principal" className="nav-links">
          <a href="#servicos">Serviços</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#processo">Processo</a>
          <a href="#quem">Para quem</a>
          <a href="#contato" className="btn btn-solid btn-sm">Começar projeto</a>
        </nav>
      </div>
    </header>
  )
}

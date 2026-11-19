import { SERVICES } from '../data'
import { setActive, useActive } from '../store'

export default function Services({ onPick }) {
  const active = useActive()

  return (
    <section className="services" id="servicos">
      <div className="wrap">
        <div className="col">
          <p className="eyebrow">Serviços</p>
          <h2>A sequência completa.</h2>
          <p className="hint">Passe o mouse ou toque num serviço para a hélice ler o códon dele.</p>

          <ul className="svc-list">
            {SERVICES.map((s) => {
              const on = active === s.codon
              return (
                <li
                  key={s.key}
                  className={'svc' + (on ? ' is-on' : '')}
                  tabIndex={0}
                  onMouseEnter={() => setActive(s.codon)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.codon)}
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActive(null) }}
                  onClick={() => setActive(on ? null : s.codon)}
                >
                  <div className="svc-code">
                    <span>{s.code}</span>
                    <small>{s.tag}</small>
                  </div>
                  <div className="svc-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul className="tags">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                    <button
                      type="button"
                      className="link-btn"
                      onClick={(e) => { e.stopPropagation(); onPick(s.key) }}
                    >
                      Adicionar ao briefing <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

import { PORTFOLIO } from '../data'

// Cada projeto ganha um quarto do símbolo da Codon, girado na ordem da lista.
function Quarter({ i }) {
  return (
    <svg className="pf-quarter" viewBox="0 0 100 100" aria-hidden="true" style={{ transform: `rotate(${i * 90}deg)` }}>
      <path d="M0 100A100 100 0 0 1 100 0V100Z" />
    </svg>
  )
}

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="wrap">
        <div className="pf-head">
          <div>
            <p className="eyebrow">Portfólio</p>
            <h2>Sequências já expressas.</h2>
          </div>
          <p className="body-lg">
            Na célula, um gene expresso é instrução que virou coisa real. Aqui estão alguns projetos que
            saíram do briefing e foram pro mundo.
          </p>
        </div>

        <ol className="pf-list">
          {PORTFOLIO.map((p, i) => (
            <li key={p.key} className="pf-item">
              <Quarter i={i} />
              <div className="pf-main">
                <span className="mono dim">{p.kind}</span>
                <h3>{p.name}</h3>
                <p>{p.detail}</p>
              </div>
              <div className="pf-meta">
                <span className="mono">{p.front}</span>
                {p.metric && (
                  <span className="pf-metric"><strong>{p.metric.value}</strong>{p.metric.label}</span>
                )}
                {p.status && <span className="pf-status">{p.status}</span>}
                {p.link && (
                  <a className="link-btn" href={p.link} target="_blank" rel="noopener noreferrer">
                    {p.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { STEPS, SEGMENTS } from '../data'

export default function Process() {
  return (
    <>
      <section className="process band" id="processo">
        <div className="wrap">
          <div className="band-head">
            <p className="eyebrow">Processo</p>
            <h2>Do briefing ao resultado, em quatro fases.</h2>
          </div>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className="step">
                <div className="step-top"><span className="mono accent">{s.bio}</span><span className="mono dim">{s.n}</span></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="who band" id="quem">
        <div className="wrap who-grid">
          <div>
            <p className="eyebrow">Para quem</p>
            <h2>Bons no que fazem. Invisíveis no digital.</h2>
          </div>
          <div>
            <p className="body-lg">
              A Codon atende pequenos negócios que já entregam um trabalho excelente e precisam que a internet
              mostre isso com a mesma qualidade.
            </p>
            <ul className="chips" aria-label="Segmentos atendidos">
              {SEGMENTS.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

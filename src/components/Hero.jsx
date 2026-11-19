import { SERVICES } from '../data'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="wrap">

        <h1 className="hero-title">
          <span className="line"><span>Engenharia</span></span>
          <span className="line"><span>estratégica</span></span>
          <span className="line accent"><span>digital.</span></span>
        </h1>

        <div className="hero-foot">
          <p className="lead">
            Marca, redes e produtos digitais para pequenos negócios, construídos como código:
            cada decisão tem função, ordem e um resultado que dá para medir.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#contato">Começar um projeto <span aria-hidden="true">→</span></a>
            <a className="btn btn-ghost" href="#servicos">Ver a sequência</a>
          </div>
        </div>

        <ol className="hero-seq" aria-label="Sequência de serviços">
          {SERVICES.map((s) => (
            <li key={s.code}><b>{s.code}</b>{s.tag}</li>
          ))}
          <li><b>TAA</b>Contato</li>
        </ol>
      </div>
    </section>
  )
}

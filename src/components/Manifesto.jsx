export function Marquee() {
  const row = 'ATG · GCA · CTG · TGG · AAG · TAA · '
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{row.repeat(4)}</span>
        <span>{row.repeat(4)}</span>
      </div>
    </div>
  )
}

export default function Manifesto() {
  return (
    <section className="manifesto" id="por-que">
      <div className="wrap">
        <div className="col">
          <p className="eyebrow">Por que Codon</p>
          <p className="statement">
            Uma letra sozinha não diz nada. <em>Três, na ordem certa,</em> constroem uma proteína.
          </p>
          <p className="body-lg">
            Na biologia, o códon é a trinca de nucleotídeos que diz à célula o que fabricar. A gente trabalha
            do mesmo jeito: nenhuma peça sai sem estratégia por trás e identidade por cima.
          </p>

          <div className="triad">
            <div><span className="mono">1/3</span><h3>Estratégia</h3><p>Quem é o seu cliente, o que ele procura e por que deveria escolher você.</p></div>
            <div><span className="mono">2/3</span><h3>Identidade</h3><p>Uma marca reconhecível em qualquer tela, do perfil ao site.</p></div>
            <div><span className="mono">3/3</span><h3>Execução</h3><p>Conteúdo, design e código entregues no ritmo certo.</p></div>
          </div>

          <p className="footnote">
            O código genético tem 64 códons para 20 aminoácidos. Toda leitura começa no ATG e termina num
            códon de parada. Nossos projetos também: começam no diagnóstico e terminam com você no controle.
          </p>
        </div>
      </div>
    </section>
  )
}

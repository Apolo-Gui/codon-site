import { useRef, useState } from 'react'
import { SERVICES } from '../data'

const SEGS = ['Saúde', 'Comércio', 'Serviços', 'Alimentação', 'Educação', 'Institucional', 'Outro']

export default function Contact({ picks, setPicks, nameRef }) {
  const [form, setForm] = useState({ nome: '', negocio: '', segmento: '', mensagem: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState('')
  const preRef = useRef(null)

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggle = (key) => setPicks((p) => (p.includes(key) ? p.filter((x) => x !== key) : [...p, key]))

  function submit(e) {
    e.preventDefault()
    const nome = form.nome.trim()
    const chosen = SERVICES.filter((s) => picks.includes(s.key)).map((s) => s.pick)
    if (!nome) { setError('Coloque seu nome para montarmos a mensagem.'); nameRef.current?.focus(); return }
    if (!chosen.length && !form.mensagem.trim()) { setError('Escolha pelo menos um serviço ou conte o que você precisa.'); return }
    setError('')
    let m = `Olá, Codon! Sou ${nome}`
    if (form.negocio.trim()) m += `, do ${form.negocio.trim()}`
    if (form.segmento) m += ` (${form.segmento.toLowerCase()})`
    m += '.'
    if (chosen.length) m += `\nTenho interesse em: ${chosen.join(', ')}.`
    if (form.mensagem.trim()) m += `\n${form.mensagem.trim()}`
    m += '\nPodemos conversar?'
    setMessage(m)
    setCopied('')
  }

  function copy() {
    const select = () => {
      const r = document.createRange()
      r.selectNodeContents(preRef.current)
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r)
      setCopied('Texto selecionado. Use Ctrl+C para copiar.')
    }
    try {
      navigator.clipboard.writeText(message).then(() => setCopied('Mensagem copiada.'), select)
    } catch { select() }
  }

  return (
    <section className="contact" id="contato">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <p className="eyebrow eyebrow-light">TAA · códon de parada</p>
          <h2>Fim da leitura. <span>Início do projeto.</span></h2>
          <p className="body-lg">
            Preencha o briefing rápido. A gente monta a mensagem para você colar na nossa DM e a conversa já
            começa com contexto.
          </p>
          <div className="handle">
            <span className="mono">Instagram</span>
            <strong>@codon.sm</strong>
          </div>
        </div>

        <div className="contact-panel">
          {!message ? (
            <form onSubmit={submit} noValidate>
              <div className="row2">
                <label className="field" htmlFor="f-nome">
                  <span>Seu nome</span>
                  <input id="f-nome" ref={nameRef} autoComplete="name" placeholder="Como podemos te chamar" value={form.nome} onChange={upd('nome')} />
                </label>
                <label className="field" htmlFor="f-neg">
                  <span>Negócio</span>
                  <input id="f-neg" placeholder="Nome da empresa ou @" value={form.negocio} onChange={upd('negocio')} />
                </label>
              </div>
              <label className="field" htmlFor="f-seg">
                <span>Segmento</span>
                <select id="f-seg" value={form.segmento} onChange={upd('segmento')}>
                  <option value="">Selecione</option>
                  {SEGS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <fieldset className="picks">
                <legend>Do que você precisa</legend>
                <div>
                  {SERVICES.map((s) => (
                    <label key={s.key} htmlFor={'p-' + s.key}>
                      <input id={'p-' + s.key} type="checkbox" checked={picks.includes(s.key)} onChange={() => toggle(s.key)} />
                      <span><b>{s.code}</b>{s.tag}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="field" htmlFor="f-msg">
                <span>Conte em uma frase</span>
                <textarea id="f-msg" rows={3} placeholder="Ex.: abri uma clínica há 6 meses e o Instagram não traz paciente" value={form.mensagem} onChange={upd('mensagem')} />
              </label>
              <p className="form-error" role="alert">{error}</p>
              <button className="btn btn-cream" type="submit">Montar minha mensagem <span aria-hidden="true">→</span></button>
            </form>
          ) : (
            <div className="result">
              <span className="mono">Sua mensagem</span>
              <pre ref={preRef}>{message}</pre>
              <div className="actions">
                <button type="button" className="btn btn-cream btn-sm" onClick={copy}>Copiar mensagem</button>
                <a className="btn btn-line btn-sm" href="https://instagram.com/codon.sm" target="_blank" rel="noopener noreferrer">Abrir @codon.sm</a>
                <button type="button" className="btn btn-line btn-sm" onClick={() => setMessage('')}>Editar</button>
              </div>
              <p className="form-ok" role="status">{copied}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

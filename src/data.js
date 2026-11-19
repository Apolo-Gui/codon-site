// Sequência lida pela hélice: 15 códons, do ATG (início) ao TAA (parada).
export const SEQ = 'ATGCCTGACGCATTCAGGCTGGTACATTGGACCGGTAAGCGATAA'
export const COMPLEMENT = { A: 'T', T: 'A', G: 'C', C: 'G' }

export const SERVICES = [
  {
    key: 'diagnostico',
    codon: 0,
    code: 'ATG',
    tag: 'Início',
    title: 'Diagnóstico estratégico',
    text: 'A gente lê o negócio antes de mexer em qualquer pixel: público, concorrência, oferta e o que o seu perfil comunica hoje sem você perceber.',
    items: ['Auditoria de perfil', 'Mapa de público', 'Plano de posicionamento'],
    pick: 'Diagnóstico estratégico'
  },
  {
    key: 'branding',
    codon: 3,
    code: 'GCA',
    tag: 'Marca',
    title: 'Branding e rebranding',
    text: 'Identidade visual com sistema: logo, paleta, tipografia e regras de uso que se sustentam em qualquer peça, do cartão de visita ao reels.',
    items: ['Logo e variações', 'Manual de marca', 'Templates editáveis'],
    pick: 'Branding'
  },
  {
    key: 'redes',
    codon: 6,
    code: 'CTG',
    tag: 'Redes',
    title: 'Gestão de redes sociais',
    text: 'Calendário, roteiro, design e publicação. Uma linha editorial clara, pensada para virar conversa na DM e cliente no caixa.',
    items: ['Linha editorial', 'Carrosséis e reels', 'Relatório mensal'],
    pick: 'Gestão de redes'
  },
  {
    key: 'sites',
    codon: 9,
    code: 'TGG',
    tag: 'Sites',
    title: 'Sites e produtos digitais',
    text: 'Sites rápidos, páginas de venda e ferramentas sob medida, desenhados para o seu cliente achar, entender e agir sem precisar perguntar.',
    items: ['Site institucional', 'Landing page', 'Sistemas internos'],
    pick: 'Site / produto digital'
  },
  {
    key: 'ia',
    codon: 12,
    code: 'AAG',
    tag: 'IA',
    title: 'Conteúdo com IA',
    text: 'Fluxos de produção assistidos por IA, com direção de arte humana. Mais volume sem perder a cara da marca.',
    items: ['Direção de arte', 'Bibliotecas de prompt', 'Automação de produção'],
    pick: 'Conteúdo com IA'
  }
]

export const CODON_NAMES = {
  0: 'Diagnóstico',
  3: 'Marca',
  6: 'Redes sociais',
  9: 'Sites',
  12: 'Conteúdo com IA',
  14: 'Parada · contato'
}

export const STEPS = [
  { n: '01', bio: 'Leitura', title: 'Diagnóstico', text: 'Conversa, auditoria e pesquisa. Saímos com um retrato honesto de onde o negócio está hoje.' },
  { n: '02', bio: 'Transcrição', title: 'Estratégia', text: 'O retrato vira plano: posicionamento, prioridades, metas e o que fica de fora.' },
  { n: '03', bio: 'Tradução', title: 'Produção', text: 'Marca, conteúdo e site. Cada peça nasce do plano, com a sua aprovação em cada etapa.' },
  { n: '04', bio: 'Expressão', title: 'Medição', text: 'Publicamos, acompanhamos os números e ajustamos a sequência todo mês.' }
]

export const SEGMENTS = ['Clínicas e consultórios', 'Comércio local', 'Prestadores de serviço', 'Marcas em lançamento', 'Projetos institucionais', 'Profissionais liberais']

// Portfólio: só fatos confirmados. Para completar, preencha `link` e `detalhe` de cada item.
export const PORTFOLIO = [
  {
    key: 'servem-pets',
    name: 'Servem Pets',
    kind: 'Produto digital',
    front: 'Desenvolvimento web',
    detail: 'Projeto em desenvolvimento, com código versionado no GitHub e entrega próxima.',
    metric: null,
    status: 'Em entrega',
    link: null,
    linkLabel: 'GitHub'
  },
  {
    key: 'adpvilahipica',
    name: '@adpvilahipica',
    kind: 'Igreja',
    front: 'Design para Instagram',
    detail: 'Comunicação visual do perfil da igreja no Instagram.',
    metric: { value: '50 mil+', label: 'visualizações' },
    status: null,
    link: 'https://instagram.com/adpvilahipica',
    linkLabel: 'Ver perfil'
  },
  {
    key: 'cbctq26',
    name: 'CBCTQ26',
    kind: 'Perfil',
    front: 'Gestão de Instagram',
    detail: 'Criação e gestão do perfil no Instagram.',
    metric: null,
    status: null,
    link: null,
    linkLabel: 'Ver perfil'
  },
  {
    key: 'faeterj',
    name: 'FAETERJ Petrópolis',
    kind: 'Educação',
    front: 'Perfil institucional',
    detail: 'Conteúdo e design para o perfil da faculdade no Instagram.',
    metric: null,
    status: null,
    link: null,
    linkLabel: 'Ver perfil'
  }
]

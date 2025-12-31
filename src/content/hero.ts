// src/content/hero.ts

import type { HeroContent } from '../schemas/hero';

export const heroContent: HeroContent = {
  titleHighlights: [
    "O SEO tradicional morreu.",
    "O tráfego orgânico agora é sintético."
  ],
  subtitle: "A contagem regressiva começou: De acordo com dados da Semrush, o volume de visitantes vindo de buscas por IA ultrapassará as buscas tradicionais já em 2028.",
  cta: {
    label: "Quero ser citado pelas IAs",
    href: "https://wa.me/5511946266230",
    style: "primary",
    icon: "lucide:trending-up"
  },
  socialProof: [
    { value: '+120', label: 'Projetos' },
    { value: '3.5x', label: 'ROI Médio' },
    { value: '98%', label: 'Satisfação' }
  ],
  roi:{
    label: "Roi",
    value: "3.5x"
  },
  analysis: {
    label: "Análise",
    value: "Tempo real",
    icon: "lucide:chart-spline"
  },
  sales: {
    label: "Vendas",
    value: "+35%"
  },
  // Poderia ser dinâmico em CMS
  chartBars: [
    { color: "bg-secondary-300", height: "h-16" },
    { color: "bg-secondary-300", height: "h-20" },
    { color: "bg-secondary-300", height: "h-28" },
    { color: "bg-secondary-300", height: "h-36" },
    { color: "bg-secondary-300", height: "h-40" },
    { color: "bg-secondary-300", height: "h-48" },
    { color: "bg-secondary-700", height: "h-54" }
  ]
};
import type { FeatureSection } from "@/schemas/features";

export const metricsContent: FeatureSection = {
  variant: "primary",
  layout: "center",
  tag: "Nossos números mostram resultados reais",
  title: "Métricas que comprovam nossa eficácia",
  subtitle: "Resultados reais de clientes que investiram em estratégia digital consistente",

  items: {
    list: [
      { bigNumber: "+340%", label: "Aumento Visibilidade" },
      { bigNumber: "+180%", label: "Taxa de Conversão" },
      { bigNumber: "+250%", label: "ROI Campanhas" },
      { bigNumber: "90 dias", label: "Para os primeiros resultados" },
    ],
  },

  description: "Quero esses resultados para minha empresa",
  sampleList: ["Análise completa gratuita", "Plano personalizado", "Sem compromisso"],

  showForm: true,

  // se quiser imagem adiciona:
  // image: { alt: "Dashboard", href: "metrics.webp" }
};

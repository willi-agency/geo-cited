// differentialContent.ts
import type { FeatureSection } from "@/schemas/features";
import diferencialImage from '../assets/images/diferencial/aumento-de-performance-site.webp'

export const differentialContent: FeatureSection = {
  variant: "white", // white | dark | primary
  layout: "image-right",

  tag: "A Quality SMI é referência em SEO",
  title: "Resultados que mostram a diferença entre <span class='text-primary'>presença e performance</span>",

  // TRANSFORMANDO LISTA SIMPLES EM FeatureList
  items: {
    list: [
      { text: "Estratégias que geram percepção de autoridade e confiança", icon: "lucide:check" },
      { text: "Criamos sites com arquitetura e copy orientadas à conversão", icon: "lucide:check" },
      { text: "Experiência digital otimizada com foco em engajamento", icon: "lucide:check" },
      { text: "Tráfego qualificado que vira oportunidade de negócio", icon: "lucide:check" },
    ],
  },

  image: {
    href: diferencialImage,
    alt: "Aumento de performance do site",
  },

  // opcional — caso você queira CTA
  /* cta: {
    label: "Solicitar diagnóstico",
    href: "/contato",
    variant: "btn-primary",
  }, */
};

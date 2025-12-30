import type { FeatureSection } from "@/schemas/features";
import { config } from "@/config/site";

export const featureListMotivation : FeatureSection = {
  variant: "white",
  tag: "A nova matemática do marketing",
  title: "Menos cliques, mais respostas",
  subtitle: "Veja os principais motivos pelo qual o GEO é essencial para sua empresa agora!",
  items: {
    list: [
      {
        title: "A queda do CTR: ",
        text: "A ascensão do SGE (Search Generative Experience) reduziu drasticamente as visitas a blogs e portais informativos.",
        icon: "lucide:trending-down",
      },
      {
        title: "O veredito da IA: ",
        text: "Se o ChatGPT ou o Gemini não encontram seu site como fonte de autoridade, eles simplesmente não recomendam você.",
        icon: "lucide:sparkles",
      },
      {
        title: "Invisibilidade sintética:",
        text: "Estar no topo do ranking não adianta se a resposta da IA substitui a necessidade de clicar no seu link.",
        icon: "lucide:eye-off",
      },
    ],
  },
};

export const featureBannerMotivation : FeatureSection = {
  variant: "primary",
  title: "O Gartner prevê uma queda de 25% no volume de buscas tradicionais até 2026. O custo de ignorar o GEO é a irrelevância.",
  cta: {
    label: "Garantir minha citabilidade",
    href: config.company.contact.whatsapp.url,
    target: "_blank",
    variant: "soft-primary-solid",
    customClass: "btn-lg"
  },
};
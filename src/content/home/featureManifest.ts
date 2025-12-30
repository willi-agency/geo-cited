import { config } from "@/config/site";
import type { FeatureSection } from "@/schemas/features";

export const featureManifestContent : FeatureSection = {
  variant: "primary",
  title: "O futuro do SEO -> GEO está documentado",
  description: "Leia o nosso <strong>Manifesto de Implementação GEO</strong> e entenda os princípios técnicos que as IAs usam para selecionar as fontes de resposta.",
  ctas: [
    { 
      label: "Ler o Manifesto da Geo Cited", 
      href: "/manifesto",
      target: "_self",
      variant: "soft-primary-solid", 
      customClass:"btn-lg py-4!" },
  ],
};
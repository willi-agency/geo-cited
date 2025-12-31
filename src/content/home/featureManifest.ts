import { config } from "@/config/site";
import type { FeatureSection } from "@/schemas/features";

export const featureManifestContent : FeatureSection = {
  variant: "primary",
  title: "Por apenas R$1.000,00",
  description: "Sua empresa poderá ser nossa parceira na implantação de <strong>novas práticas descobertas em nosso laboratório</strong> sendo <strong>pioneiras no mundo</strong> em Generative Engine Optimization (GEO).",
  ctas: [
    { 
      label: "Saiba como ser parceiro", 
      href: "/empresa-parceira",
      target: "_self",
      variant: "soft-primary-solid", 
      customClass:"btn-lg py-4!" },
  ],
};
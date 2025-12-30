import type { FeatureSection } from "@/schemas/features";
import image from "../../assets/images/hero/hero-image.jpg"
import { config } from "@/config/site";

export const heroHomeContent: FeatureSection = {
  variant: "white",
  layout: "image-right",
  title: "O SEO tradicional morreu. O tráfego orgânico agora é sintético.",
  description: "A contagem regressiva começou: De acordo com dados da Semrush, o volume de visitantes vindo de buscas por IA ultrapassará as buscas tradicionais já em 2028.",
  ctas: [
    { 
      label: "Garantir minha citabilidade", 
      href: config.company.contact.whatsapp.url,
      target: "_blank",
      variant: "primary-solid", 
      icon: "lucide:trending-up", 
      customClass:"btn-lg" },
  ],

  image: {
    href: image,
    alt: "A imagem ilustra um gráfico comparativo entre buscas tradicionais e buscas por IA, destacando a ascensão das buscas por IA.",
  },
};
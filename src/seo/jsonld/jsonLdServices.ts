import { config } from "../../config/site";

const provider = {
  "@type": "Organization",
  "name": config.company.name,
  "url": config.company.url,
  "logo": config.company.logo,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": config.company.contact.whatsapp.label,
    "contactType": config.company.contact.contactType,
    "email": config.company.contact.email.label,
    "availableLanguage": config.company.contact.availableLanguage,
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": config.company.address.street,
    "addressLocality": config.company.address.city,
    "addressRegion": config.company.address.region,
    "postalCode": config.company.address.postalCode,
    "addressCountry": config.company.address.country,
  }
};

export const jsonLdServices = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Consultoria em SEO",
    "provider": provider,
    "areaServed": config.company.areaServed.name,
    "description":
      "Serviço especializado em SEO avançado, incluindo auditoria técnica, conteúdo otimizado e crescimento orgânico.",
    "url": `${config.company.url}/consultoria-seo`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Google Ads",
    "provider": provider,
    "areaServed": config.company.areaServed.name,
    "description":
      "Gestão completa de campanhas no Google Ads focada em performance, alcance e redução de custo por lead.",
    "url": `${config.company.url}/google-ads`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Meta Ads",
    "provider": provider,
    "areaServed": config.company.areaServed.name,
    "description":
      "Gestão estratégica de anúncios no Facebook e Instagram com foco em impacto, segmentação e conversões.",
    "url": `${config.company.url}/meta-ads`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Social Media",
    "provider": provider,
    "areaServed": config.company.areaServed.name,
    "description":
      "Gestão de redes sociais com criação de conteúdo, planejamento editorial e métricas de engajamento.",
    "url": `${config.company.url}/social-media`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Produção Audiovisual",
    "provider": provider,
    "areaServed": config.company.areaServed.name,
    "description":
      "Criação de vídeos institucionais, comerciais, conteúdos para redes sociais e produções profissionais.",
    "url": `${config.company.url}/producao-audiovisual`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Criação e Reformulação de Sites",
    "provider": provider,
    "areaServed": config.company.areaServed.name,
    "description":
      "Desenvolvimento e redesign de sites com foco em velocidade, SEO, experiência do usuário e conversão.",
    "url": `${config.company.url}/criacao-de-sites`,
  }
];

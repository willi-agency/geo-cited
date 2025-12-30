// src/data/config/site.ts
export const API_URL = "https://sybkmis.geocited.com.br/api";
export const API_URL_BLOG = "https://sybkmis.geocited.com.br/api/v2";
export const API_KEY = "QSMI-V79MYcNqMk1SEPU1cqJsIM8iFHjPHlPzI79IBzPdXMGbxgApuqgObK6v5oe04Gtg";

export const config = {
  company: {
    name: "Geo Cited",
    url: "https://geocited.com.br",
    logo: "https://geocited.com.br/images/logo-primary.svg",
    title: "Especlistas em GEO, faça sua empresa ser citada pelas IAs",
    description: "Somos especialistas em GEO, ajudamos sua empresa a ser reconhecida pelas inteligências artificiais.",

    contact: {
      whatsapp: {
        label: "(11) 94626-6230",
        number: "5511946266230",
        url: "https://wa.me/5511946266230",
        share: "https://api.whatsapp.com/send?&text=Olá%2C%20gostaria%20de%20saber%20mais%20informações.",
      },
      email: {
        label: "contato@geocited.com.br",
        url: "mailto:contato@geocited.com.br",
        share: "mailto:?subject=Veja%20isso!&body=Achei%20que%20você%20gostaria%20dessa%20página:%20https://", // trocar o final da url
      },
      contactType: "customer service",
      availableLanguage: ["Portuguese"],
    },

    address: {
      street: "Rua Glória 163",
      neighborhood: "Parque dos Camargos",
      city: "Barueri",
      region: "SP",
      postalCode: "06436-140",
      country: "BR",
      url: "https://goo.gl/maps/XYZ123",
    },

    areaServed: {
      name: "Brazil"
    },

    social: {
      Facebook: {
        url: "https://www.facebook.com/geocited",
        label: "Facebook",
      },
      Instagram: {
        url: "https://www.instagram.com/geocited",
        label: "Instagram",
      },
      Linkedin: {
        url: "https://www.linkedin.com/company/geo-cited",
        label: "LinkedIn",
      },
      Twitter: {
        url: "https://twitter.com/geocited",
        label: "Twitter",
      },
      Youtube: {
        url: "https://www.youtube.com/@maiconwilligeo",
        label: "Twitter",
      },
    }
  },

  meta: {
    author: "Maicon Willi",
    copyright: "© 2026 Geo Cited. Todos os direitos reservados.",
    robots: "index, follow",
    canonical: "https://www.geocited.com.br",
    keywords: "GEO, Citado por IA, IA",
    geo: {
      region: "BR-SP",
      placename: "São Paulo",
      position: "-23.5505;-46.6333",
    },
    social: {
      type: "website",
      image: "/images/diferencial/diferenciais.webp",
      title: "Seja citado pelas IAs com a Geo Cited",
      description: "Somos escpeclistas em GEO, ajudamos sua empresa a ser reconhecida pelas inteligências artificiais.",
    },
  }
};

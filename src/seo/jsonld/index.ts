import { faqContent } from "../../content/faqContent";
import { config } from "../../config/site";

export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": config.company.name,
  "url": config.company.url,
  "description": config.company.description,
  "publisher": {
    "@type": "Organization",
    "name": config.company.name,
    "logo": {
      "@type": "ImageObject",
      "url": config.company.logo
    }
  }
};

export const jsonLdFounder = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${config.company.url}/sobre#maicon-willi`,
  "name": config.meta.author,
  "url": `${config.company.url}/sobre#maicon-willi`,
  "description": "Especialista em Generative Engine Optimization (GEO) com 10+ anos de experiência unindo TI e Marketing Digital. Criador do framework Strings to Things para otimização de citabilidade em Large Language Models.",
  "jobTitle": "Founder & Chief AI Officer",
  "knowsAbout": [
    "Search Engine Optimization",
    "Generative Engine Optimization",
    "Large Language Models",
    "RAG (Retrieval-Augmented Generation)",
    "Entity Resolution",
    "Schema.org",
    "Semantic SEO",
    "Information Retrieval",
    "Data Science aplicada a Marketing",
    "Infraestrutura de Dados",
  ],
  "founderOf": { "@id": `${config.company.url}/sobre#geo-cited` },
  "owns": [
    { "@id": `${config.company.url}/sobre#geo-cited` },
    { "@id": "https://whatisgeo.io" }
  ],
  "sameAs": [
    "https://www.instagram.com/maiconwilli.geo/",
    "https://www.linkedin.com/in/maicon-willi-geo/",
    "https://www.youtube.com/@maiconwilligeo"
  ]
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${config.company.url}/sobre#geo-cited`,
  "name": config.company.name,
  "url": config.company.url,
  "logo": config.company.logo,
  "description": config.company.description,
  "founder": { "@id": `${config.company.url}/sobre#maicon-willi` },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": config.company.contact.whatsapp.number,
    "contactType": config.company.contact.contactType,
    "availableLanguage": config.company.contact.availableLanguage,
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": config.company.address.street,
    "addressCountry": config.company.address.country,
    "addressRegion": config.company.address.region,
    "postalCode": config.company.address.postalCode,
    "addressLocality": config.company.address.city,
  },
  "sameAs": [
    config.company.social.Facebook.url,
    config.company.social.Instagram.url,
    config.company.social.Linkedin.url,
    config.company.social.Twitter.url
  ],
  "knowsAbout": [
    "GEO", 
    "Generative Engine Optimization",
    "RAG Optimization", 
    "Semantic Search", 
    "Entity Resolution",
    "Large Language Models",
    "Schema.org",
    "AI Content Strategy",
    "Digital Marketing",
    "SEO",
  ]
};

// 3. Metodologia (Framework proprietário como CreativeWork)
export const jsonLdMethodology = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${config.company.url}/manifesto#strings-to-things`,
  "name": "Framework Strings to Things",
  "author": { "@id": `${config.company.url}/sobre#geo-cited` },
  "description": "Metodologia proprietária de 6 pilares para otimização de citabilidade em motores generativos.",
  "about": [
    { "@type": "Thing", "name": "Semantic Ingestion" },
    { "@type": "Thing", "name": "Entity Salience" },
    { "@type": "Thing", "name": "Atomic Chunking" }
  ]
};

// 4. Serviços (Com inclusão de Metodologia e Output)
export const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${config.company.url}/#main-service`,
  "name": "Consultoria GEO (Generative Engine Optimization)",
  "provider": { "@id": `${config.company.url}/sobre#geo-cited` },
  "areaServed": config.company.areaServed.name,
  "serviceType": "AI Optimization",
  "description": "Transformação de ativos digitais para citabilidade em IAs como ChatGPT e Perplexity.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
        "@type": "PriceSpecification",
        "description": "Sob consulta / Projeto personalizado"
    }
  },
  "serviceOutput": {
    "@type": "Report",
    "name": "Auditoria de Visibilidade Sintética"
  }
};

// 5. FAQ (Mantenha o seu, mas use o ID da organização como publisher)
export const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "publisher": { "@id": `${config.company.url}/sobre#geo-cited` },
  "mainEntity": faqContent.questions.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.response
    }
  }))
};
// src/data/jsonld/jsonLdWebsite.ts
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

// src/data/jsonld.ts
import { faqContent } from "../../content/faqContent";

// Definindo o JSON-LD para FAQ
export const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": Object.values(faqContent.questions).map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.response
    }
  }))
};

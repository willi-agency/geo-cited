import type { KeywordPage } from "../../schemas/keywordPage";

export const generateJsonLdFromKeywordPage = (keyword: KeywordPage) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": keyword.title,
  "url": `https://geocited.com.br.br/${keyword.slug}`,
  "description": keyword.description,
  "datePublished": keyword.createdAt,
  "dateModified": keyword.updatedAt,
  "primaryImageOfPage": keyword.thumbnail || undefined,
  "about": {
    "@type": "Thing",
    "name": keyword.keyword
  }
});

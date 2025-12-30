import type { Article } from '../../schemas/article';
import { config } from '../../config/site';

/**
 * Gera o schema.org JSON-LD para artigo
 */
export const generateJsonLdFromArticle = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${config.company.url.replace(/\/$/, "")}/blog/${article.slug.replace(/^\//, "")}`,
  },
  "headline": article.title,
  "description": article.description,
  "image": article.image ? [article.image] : [],
  ...(article.author && {
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "url": article.author.profileUrl,
      "sameAs": article.author.sameAs,
    },
    "publisher": {
      "@type": "Organization",
      "name": article.author.name || config.company.name,
      "logo": {
        "@type": "ImageObject",
        "url": config.company.logo,
      }
    },
  }),
  "datePublished": article.createdAt,
  "dateModified": article.updatedAt,
  ...(article.tags && article.tags.length > 0 && {
    "keywords": article.tags.map(tag => tag.name).join(', ')
  }),
});
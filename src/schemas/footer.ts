// src/schemas/footer.ts
// O Footer é dividido em sections (linear, antes do legal) e o legalSection (fundo/copy etc)
type AstroComponent = (props?: Record<string, any>) => any;

export type FooterBlock =
  | { type: 'logo', src: ImageMetadata, alt: string }
  | { type: 'partners', items: { src: ImageMetadata, alt: string, href?: string, target?: string }[] }
  | { type: 'slogan', text: string }
  | { type: 'title', text: string }
  | { type: 'links', items: { label: string, href: string }[] }
  | { type: 'address', lines: string[] }
  | { type: 'contact', items: { label: string, href?: string, icon?: string }[] }
  | { type: 'social', items: { label: string, href: string }[] }
  | { type: 'cta', headline?: string, placeholder?: string, button?: string, customComponent?: AstroComponent }
  | { type: 'custom', render: string }; // caso precise injetar algo custom via set:html, opcional

export type FooterSection = {
  // Para cada coluna linear do footer (linha superior)
  blocks: FooterBlock[]
};

export type FooterLegalBlock =
  | { type: 'copyright', text: string }
  | { type: 'links', items: { label: string, href: string }[] }

export type FooterContent = {
  sections: FooterSection[],
  cta: FooterBlock[],
  legal: FooterLegalBlock[]
}
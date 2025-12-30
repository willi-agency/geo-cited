import type { FooterContent } from '../schemas/footer';
import { config } from '../config/site'; // Puxe dados globais daqui!
import logo from '../assets/images/logo-white.svg';

export const footerContent: FooterContent = {
  sections: [
    // Coluna 1: Logo, slogan, parceiros
    {
      blocks: [
        { type: 'logo', src: logo, alt: config.company.name },
        { type: 'slogan', text: "Consultoria de visibilidade em mecanismos gerativos." },
      ]
    },
    // Coluna 2: Links úteis
    {
      blocks: [
        { type: 'title', text: 'Links Úteis' },
        { type: 'links', items: [
          { label: 'Home',                href: '/' },
          { label: 'Sobre',               href: '/sobre' },
          { label: 'Contato',             href: '/contato' },
          { label: 'Blog',                href: '/blog' },
          { label: 'Privacidade',         href: '/privacidade' }
        ]}
      ]
    },
    // Coluna 3: Contato/endereço/email/telefones
    {
      blocks: [
        { type: 'title', text: 'Contato' },
        { type: 'address', lines: [
          config.company.address.street, // Rua Santo Antônio, 1189
          config.company.address.neighborhood, // Vila Galvão, 
          config.company.address.city + ' - ' + config.company.address.region, // Guarulhos - São Paulo - SP 
          config.company.address.postalCode, // CEP: 07071-000
        ]},
        { type: 'contact', items: [
          { label: config.company.contact.email.label, href: `mailto:${config.company.contact.email.label}`, icon: 'lucide:mail' },
          { label: config.company.contact.whatsapp.label, href: config.company.contact.whatsapp.url, icon: 'lucide:phone' },
        ]}
      ]
    },
    // Coluna 4: Social
    {
      blocks: [
        { type: 'title', text: 'Redes Sociais' },
        { type: 'social', items: [
          { label: 'Instagram',href: config.company.social.Instagram.url },
          { label: 'Facebook',  href: config.company.social.Facebook.url },
          { label: 'LinkedIn',  href: config.company.social.Linkedin.url },
          { label: 'Youtube',    href: config.company.social.Youtube.url },
        ]}
      ]
    },
  ],

  cta: [
    { 
      type: 'cta',
      headline: "Transforme seu negócio com estratégias digitais que realmente funcionam",
      placeholder: "Digite seu WhatsApp",
      button: "Análise Gratuita"
    }
  ],
  // Rodapé legal (linha inferior)
  legal: [
    { type: 'copyright', text: `Geo Cited 2025-2026 © Todos os Direitos Reservados` },
  ]
};
import { config } from "../../config/site";

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: config.company.name,
  url: config.company.url,
  logo: config.company.logo,
  description: config.company.description,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: config.company.contact.whatsapp.number,
    contactType: config.company.contact.contactType,
    availableLanguage: config.company.contact.availableLanguage,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: config.company.address.street, 
    addressCountry: config.company.address.country,
    addressRegion: config.company.address.region,
    postalCode: config.company.address.postalCode,
    addressLocality: config.company.address.city,
  },
  sameAs: [
    config.company.social.Facebook.url,
    config.company.social.Instagram.url,
    config.company.social.Linkedin,
  ],
};

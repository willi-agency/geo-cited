// src/content/navbar.ts
import logo from '../assets/images/logo-primary.svg'
export const navbarContent = {
  logo: {
    href: "/",
    alt: "Logo Geo Cited",
    svg: logo, 
  },
  links: [
    { href: "/",         text: "Home" },
    { href: "/manifesto",    text: "Manifesto" },
    { href: "/sobre",    text: "Sobre nós" },
    { href: "/contato", text: "Contato" },
    { href: "https://whatisgeo.io", text: "WhatIsGeo", target: "_blank" }
  ],
  cta: {
    href: "/empresa-parceira",
    text: "Parceiria",
    icon: "lucide:trending-up"
  }
}
// src/schemas/navbar.ts

export type NavbarContent = {
  logo: {
    href: string;
    alt: string;
    svg: string;
  };
  links: {
    href: string;
    text: string;
    target?: string;
  }[];
  cta: {
    href: string;
    text: string;
    icon: string;
  };
};
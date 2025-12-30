// src/schemas/hero.ts

export type Metrics = {
  tag: string
  title: string;
  subtitle: string;
  list:{
    bigNumber: string;
    label: string;
  }[];
  cta: string;
  ctaList: string[];
};
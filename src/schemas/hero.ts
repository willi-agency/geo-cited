// src/schemas/hero.ts

export type HeroContent = {
  titleHighlights: string[];
  subtitle?: string;
  roi:{
    label: string;
    value: string;
  };
  scarcity?: string;
  cta: {
    label: string;
    href: string;
    style: 'primary' | 'secondary';
    icon?: string;
  };
  socialProof: {
    value: string;
    label: string;
  }[];
  analysis: {
    label: string;
    value: string;
    icon: string;
  };
  sales: {
    label: string;
    value: string;
  };
  chartBars: {
    color: string;
    height: string;
  }[];
};
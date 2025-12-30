import type { Image, CTA } from './features'
export type BentoGridItem = {
  label?: string;
  href?: string;
  colSpan?: string;
  rowSpan?: string;
  overlay?: boolean;
  image: Image;
};

export type BentoGridSection = {
  variant?: "white" | "dark";
  tag?: string;
  title: string;
  description?: string;
  cta?: CTA;
  ctas?: CTA[];
  items: BentoGridItem[];
  grid?: string;
};


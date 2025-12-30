// src/schemas/hero.ts

export type Soluctions = {
  tag: string
  title: string;
  list:{
    title: string;
    description: string;
    image: ImageMetadata;
    alt: string;
  }[];
};
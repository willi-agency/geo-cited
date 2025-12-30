export type CTA = {
  detail?: string;
  label: string;
  icon?: string;
  href: string;
  target?: string;
  variant: string;
  customClass?: string;
};

export type Image = {
  alt: string;
  href: ImageMetadata;
  customClass?: string;
  link?: string;
  target?: string;
};

export type FeatureItem = {
  title?: string;
  text?: string;
  tag?: string;
  icon?: string;
  image?: Image;
  cta?: CTA;
  bigNumber?: string;
  label?: string; 
  href?: string;
};

export type Banner = {
  title?: string;
  text?: string;
  tag?: string;
  cta?: CTA;
};

export type FeatureList = {
  list: FeatureItem[];
  animation?: string;
  startDelay?: number;
  gapDelay?: number;
};

export type FeatureSection = {
  variant?: string;
  layout?: 'image-right' | 'image-left' | 'center';
  tag?: string;
  tagLink?: string;
  title: string;
  subtitle?: string;
  banner?: Banner;
  description?: string;
  items?: FeatureList;
  cta?: CTA;
  ctas?: CTA[];
  sampleList?: string[];
  image?: Image;
  images?: Image[]; 
  showForm?: boolean;
};

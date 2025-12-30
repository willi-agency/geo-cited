export type FaqSection = {
  variant?: "white" | "dark" | "primary"; // estilo visual
  tag?: string;
  title: string;
  description?: string;

  cta?: {
    text: string;
    href: string;
    target?: "_blank" | "_self";
    variant?: string;         // ex: "dark-solid", "primary"
    customClass?: string;
  };

  layout?: {
    reverse?: boolean;        // inverte colunas
    gap?: string;             // gap customizado
    padding?: string;         // padding customizado
  };

  questions: {
    question: string;
    response: string;
  }[];
};

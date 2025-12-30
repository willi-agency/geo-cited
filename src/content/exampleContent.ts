import type { FeatureSection } from "@/schemas/features";
import type { BentoGridSection } from "@/schemas/bento";
import imageExample from "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.webp"

export const exampleHeroTextCtasContent: FeatureSection = {
  variant: "white",
  layout: "center",

  tag: "Flowbite is out!",
  title: "We invest in the world’s potential",
  subtitle: "New",

  description: "Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.",

  ctas: [
    { label: "Learn more", href: "#", variant: "primary-solid", icon: "lucide:trending-up", customClass:"btn-md" },
    { label: "Watch video", href: "#", variant: "dark-outline", icon: "lucide:video", customClass:"btn-md" }
  ],

  items: {
    list: [
      { href: "#", icon: "logos:adobe" },
      { href: "#", icon: "logos:astro" },
    ]
  }
};

export const exampleTwoImagesContent: FeatureSection = {
  variant: "white",
  layout: "image-right",
  ctas: [
    {
    href: "/#",
    label: "Explore collections",
    variant: "dark-solid",
    customClass: "btn-md font-semibold",
    icon: "lucide:arrow-up-right"
  },
  {
    href: "/#",
    label: "Explore collections",
    variant: "dark-outline",
    customClass: "btn-md font-semibold",
    icon: "lucide:arrow-up-right"
  },
  ],

  tag: "Nossa cultura",
  title: "We didn't reinvent the wheel",
  description:
    "We are strategists, designers and developers. Innovators and problem solvers.",

  items: {
    list: [
      {
        text: "Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need."
      }
    ]
  },

  images: [
    {
      alt: "office content 1",
      href: imageExample,
    },
    {
      alt: "office content 2",
      href: imageExample,
    }
  ]
};

export const heroImageIconeContent: FeatureSection = {
  variant: "white",
  layout: "image-right",

  tag: "Oferta por tempo limitado",
  title: "Até 50% OFF em diversos produtos!",
  subtitle: "Estoque reduzido — aproveite enquanto dura.",
  description:
    "Descontos exclusivos por tempo limitado. Garanta antes que acabe!",

  ctas: [
    {
      label: "Comprar agora",
      href: "/#",
      variant: "dark-solid",
      icon: "lucide:arrow-right",
      customClass: "btn-md"
    },
    {
      label: "Veja mais",
      href: "/#",
      variant: "dark-outline",
      icon: "lucide:search",
      customClass: "btn-md"
    },
  ],

  image: {
    href: imageExample,
    alt: "Ilustração de compras",
  },

  items: {
    list: [
      { icon: "logos:samsung" },
      { icon: "logos:apple" },
      { icon: "logos:google" },
      { icon: "logos:samsung" },
      { icon: "logos:apple" },
      { icon: "logos:google" },
    ],
  },
};

export const featureListItemsContent: FeatureSection = {
  variant: "dark", // white | dark | primary
  tag: "Tudo que você precisa",
  title: "Plataforma completa e integrada",
  subtitle: "Recursos avançados para impulsionar sua operação digital",
  description:
    "Oferecemos uma plataforma unificada com ferramentas essenciais para automação, colaboração e escalabilidade — tudo em um só lugar.",

  // Múltiplos CTAs
  ctas: [
    {
      label: "Começar agora",
      href: "/#",
      variant: "white-solid",
      customClass: "btn-md w-full justify-center"
    },
    {
      label: "Falar com especialista",
      href: "/#",
      variant: "white-outline",
      icon: "lucide:message-circle",
      customClass: "btn-md w-full justify-center"
    },
  ],

  // Lista de itens (checklist)
  items: {
    list: [
      {
        title: "Convide membros da equipe",
        text: "Gerencie acessos, permissões e colaboração em tempo real.",
        icon: "lucide:check",
      },
      {
        title: "Visualização em lista",
        text: "Organize seu conteúdo e entregas de maneira clara e produtiva.",
        icon: "lucide:check",
      },
      {
        title: "Atalhos de teclado",
        text: "Ganhe velocidade com comandos inteligentes.",
        icon: "lucide:check",
      },
      {
        title: "Calendários",
        text: "Agende, gerencie prazos e otimize sua rotina.",
        icon: "lucide:check",
      },
      {
        title: "Notificações",
        text: "Receba alertas importantes em tempo real.",
        icon: "lucide:check",
      },
      {
        title: "Quadros",
        text: "Organize fluxos usando boards visuais Kanban.",
        icon: "lucide:check",
      },
      {
        title: "Relatórios",
        text: "Acompanhe métricas, operação e performance em um só dashboard.",
        icon: "lucide:check",
      },
      {
        title: "App mobile",
        text: "Trabalhe e monitore tudo direto do seu celular.",
        icon: "lucide:check",
      },
    ],
  },
};

export const bentoGalleryContent: BentoGridSection = {
  variant: "white",
  tag: "Our Work",
  title: "Gallery",
  description:
    "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.",

  cta: {
    label: "More",
    href: "#",
    variant: "dark-outline",
    customClass: "min-w-20 justify-center",
    icon: "lucide:arrow-right"
  },

  items: [
    {
      label: "VR",
      href: "#",
      colSpan: "col-span-1",
      rowSpan: "",
      overlay: true,
      image: {
        href: imageExample,
        alt: "Photo by Minh Pham",
      },
    },
    {
      label: "Tech",
      href: "#",
      colSpan: "col-span-2",
      overlay: true,
      image: {
        href: imageExample,
        alt: "Photo by Magicle",
      },
    },
    {
      label: "Dev",
      href: "#",
      colSpan: "col-span-2",
      overlay: true,
      image: {
        href: imageExample,
        alt: "Photo by Martin Sanchez",
      },
    },
    {
      label: "Retro",
      href: "#",
      colSpan: "col-span-1",
      overlay: true,
      image: {
        href: imageExample,
        alt: "Photo by Lorenzo Herrera",
      },
    },
  ],
};

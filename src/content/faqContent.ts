import { config } from "@/config/site";
import type { FaqSection } from "src/schemas/faq";

export const faqContent: FaqSection = {
  tag: "FAQ",
  title: "Esclarecendo a ciência da citabilidade",
  description: "Entenda como a metodologia 'Strings to Things' do framework Geo Cited resolve a desambiguação de entidades e garante que sua marca seja a fonte canônica para as respostas sintetizadas por LLMs.",
  cta:{
    text: "Fale com um especialista",
    href: config.company.contact.whatsapp.url,
    target: "_blank",
    variant: "primary-solid",
    customClass: "btn-md"
  },
  questions: [
    {
      question: "O que é GEO (Generative Engine Optimization)?",
      response: "GEO é a evolução do SEO. É o processo de otimizar conteúdos e entidades para que sejam selecionados, processados e citados por motores de busca gerativos e LLMs (como ChatGPT, Gemini e Perplexity). Enquanto o SEO foca em cliques, o GEO foca em Citabilidade."
    },
    {
      question: "Como o GEO difere do SEO tradicional?",
      response: "A diferença central está na tecnologia de recuperação. O SEO tradicional foca em 'Indexação Invertida' e palavras-chave para rankear URLs. O GEO utiliza 'Recuperação Aumentada por Semântica' (RAG) e Embeddings Vetoriais para garantir que o seu conteúdo seja a fonte da resposta sintetizada pela IA."
    },
    {
      question: "O que é a metodologia 'Strings to Things' da Geo Cited?",
      response: "É o nosso framework proprietário que converte dados textuais soltos (Strings) em entidades conectadas (Things). Através de 6 pilares técnicos, estruturamos sua marca para que ela deixe de ser apenas um resultado de busca e se torne um nó de alta autoridade dentro do Knowledge Graph das inteligências artificiais."
    },
    {
      question: "Quais são os 6 pilares da metodologia Geo Cited?",
      response: "Nossa metodologia baseia-se em: 1. Ingestão Semântica, 2. Saliência de Entidade, 3. Chunking Atômico para RAG, 4. Conectividade em Grafos de Conhecimento, 5. Consenso de Sentimento e 6. Loops de Feedback Generativo. Juntos, eles maximizam a taxa de atribuição e reduzem alucinações da IA sobre sua empresa."
    },
    {
      question: "O que é 'Information Gain' e por que ele é vital para ser citado?",
      response: "Information Gain é o acréscimo de valor inédito que seu conteúdo traz em relação ao que a IA já conhece. Modelos como GPT-4 e Claude priorizam citar fontes que oferecem dados proprietários, estatísticas exclusivas ou perspectivas únicas, preenchendo as lacunas de conhecimento do modelo base."
    },
    {
      question: "O GEO ajuda a evitar alucinações da IA sobre minha marca?",
      response: "Sim. Ao implementar HTML semântico rigoroso e esquemas de dados (JSON-LD), fornecemos fatos explícitos e estruturados. Isso reduz a ambiguidade para as LLMs, garantindo que elas recuperem informações precisas e oficiais, em vez de inventar dados baseados em padrões estatísticos genéricos."
    },
    {
      question: "Por que minha empresa deveria investir em GEO agora?",
      response: "Estamos na transição do tráfego orgânico para o tráfego sintético. Com a queda do CTR no Google tradicional e a ascensão de assistentes como Perplexity, as empresas que não estabelecerem sua autoridade semântica agora ficarão invisíveis para os sistemas que tomam decisões de compra pelo usuário."
    }
  ]

}

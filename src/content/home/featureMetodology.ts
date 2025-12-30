import type { FeatureSection } from "@/schemas/features";
import { config } from "@/config/site";

// No seu arquivo de configuração/conteúdo
export const featureListMetodology: FeatureSection = {
  variant: "white",
  title: 'Nossa metodologia: <br> de <span class="bg-gradient-to-r from-primary-500 to-primary-700 gradient-text">Strings</span> para <span class="bg-gradient-to-r from-primary-500 to-primary-700 gradient-text">Things</span>',
  subtitle: `A metodologia Geo Cited que converte de "Strings" para "Things", otimiza a citabilidade em LLMs através de 6 pilares: 
            Ingestão Semântica, Saliência de Entidade, Chunking Atômico para RAG, Conectividade em Grafos de Conhecimento, Consenso de Sentimento e Loops de Feedback.  
            Desenvolvida através da análise de 500+ queries testadas em 5 LLMs diferentes (ChatGPT, Claude, Perplexity, Gemini, Bing Copilot) entre Janeiro e Dezembro de 2025.`,
  items: {
    list: [
      {
        title: "1. Semantic Understanding & Ingestion",
        text: "A Geo Cited utiliza análise de vetores para mapear como modelos como GPT-4 e Claude 3.5 ingerem o seu nicho. Criamos 'Information Gain' através de dados proprietários, garantindo que a IA cite sua marca para preencher lacunas de conhecimento no modelo global.",
      },
      {
        title: "2. Entity Recognition & Saliency",
        text: "Estabelecemos a 'Entity Salience' da sua marca, conectando-a a nós de alta autoridade. Segundo nossa metodologia, páginas com entidades explicitamente definidas via HTML semântico têm taxas de citação significativamente superiores às baseadas apenas em keywords.",
      },
      {
        title: "3. Atomic Chunking & RAG Readiness",
        text: "Estruturamos o conteúdo em 'chunks' autossuficientes de 200-500 tokens. Isso prepara o site para pipelines de RAG, permitindo que IAs extraiam fatos isolados sem perder o contexto da sua marca ou o link de atribuição.",
      },
      {
        title: "4. Knowledge Graph Connectivity",
        text: "Implementamos ontologias avançadas via Schema.org para injetar sua empresa em Grafos de Conhecimento. Criamos relacionamentos explícitos (SameAs) entre sua marca e entidades validadas por IAs, como instituições de pesquisa e bases de dados globais.",
      },
      {
        title: "5. Semantic Consensus & Sentiment",
        text: "Monitoramos o 'Consenso Semântico' em fóruns e plataformas de terceiros. Atuamos na periferia digital para garantir que o treinamento das IAs encontre uma percepção positiva e técnica sobre seus produtos, reduzindo alucinações negativas.",
      },
      {
        title: "6. Monitoring & Generative Feedback",
        text: "O GEO é iterativo. Utilizamos o Geo Cited Analytics para rastrear a posição de citação e a precisão da resposta das IAs em tempo real, ajustando o conteúdo conforme as atualizações de pesos dos modelos generativos.",
      },
    ],
  },
  // ... rest of config
};
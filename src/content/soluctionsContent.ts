import type { Soluctions } from "src/schemas/soluctions"
import estrategiaSeo from '../assets/images/solucoes/estrategia-de-seo.webp'
import socialMedia from '../assets/images/solucoes/social-media.webp'
import googleAds from '../assets/images/solucoes/campanha-google-ads.webp'
import criacaoSite from '../assets/images/solucoes/criacao-renovacao-de-site.webp'

export const soluctionsContent: Soluctions = {
  tag: "Soluções Personalizadas",
  title: "A Quality SMI é referência em marketing digital sob medida",
  list: [
    {
      title: "Estratégias de SEO", 
      description: "Soluções personalizadas com base nos objetivos, público-alvo e mercado de cada cliente para impulsionar resultados e a presença online.", 
      image: estrategiaSeo,
      alt: "Estratégia de SEO"
    },
    {
      title: "Social Media", 
      description: "Criamos estratégias personalizadas, alinhadas aos objetivos da marca e ao perfil do público, para gerar engajamento real, fortalecer a presença digital e transformar seguidores em clientes", 
      image: socialMedia,
      alt: "Estratégia para social media"
    },
    {
      title: "Campanhas no Google ADs", 
      description: "Com segmentação precisa e análise contínua, maximizamos o retorno sobre investimento e atraímos o público certo para o seu negócio.", 
      image: googleAds,
      alt: "Estratégia de campanhas no google ADS"
    },
    {
      title: "Criação e renovação de sites", 
      description: "Unindo design moderno à navegação intuitiva. Desenvolvemos experiências digitais que valorizam seu negócio e melhoram a usabilidade, gerando mais conversões.", 
      image: criacaoSite,
      alt: "Criação e renovação de sites e páginas web"
    }
  ],
}
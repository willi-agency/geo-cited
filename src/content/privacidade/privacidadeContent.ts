import type { FaqSection } from "@/schemas/faq";

export const faqPrivacyContent: FaqSection = {
  variant: "white",
  tag: "Privacidade",
  title: "Política de privacidade E cookies",
  description:
    "A Quality SMI® valoriza sua privacidade e se compromete a tratar seus dados pessoais com transparência e segurança. Esta Política de Privacidade explica como coletamos, utilizamos e protegemos suas informações.",
  questions: [
    {
      question: "Quais dados coletamos?",
      response: `
        <p>Podemos coletar os seguintes tipos de dados pessoais:</p>
        <ul>
          <li><strong>Dados de contato:</strong> Nome, e-mail, telefone, endereço.</li>
          <li><strong>Dados demográficos:</strong> Idade, gênero, interesses, localização.</li>
          <li><strong>Dados de comportamento:</strong> Histórico de navegação, interações e preferências.</li>
        </ul>
      `,
    },
    {
      question: "Por que coletamos seus dados?",
      response: `
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li><strong>Personalizar sua experiência:</strong> conteúdos e ofertas alinhadas ao seu interesse.</li>
          <li><strong>Melhorar nossos serviços:</strong> entender hábitos de consumo.</li>
          <li><strong>Entrar em contato:</strong> dúvidas, informações e promoções.</li>
          <li><strong>Cumprir obrigações legais:</strong> registros fiscais e contábeis.</li>
        </ul>
      `,
    },
    {
      question: "Como utilizamos seus dados?",
      response: `
        <p>Seus dados são usados exclusivamente para as finalidades descritas nesta política. <strong>Não vendemos seus dados.</strong></p>
      `,
    },
    {
      question: "Compartilhamento de dados",
      response: `
        <p>Podemos compartilhar seus dados com:</p>
        <ul>
          <li><strong>Parceiros de negócios:</strong> plataformas de pagamento, análise e serviços.</li>
          <li><strong>Autoridades competentes:</strong> mediante obrigação legal.</li>
        </ul>
      `,
    },
    {
      question: "Segurança dos seus dados",
      response: `
        <p>Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>
      `,
    },
    {
      question: "Cookies e tecnologias semelhantes",
      response: `
        <p>Não utilizamos cookies. Nossas captações de interação no site são totalmente anonimizadas.</p>
      `,
    },
    {
      question: "Seus direitos",
      response: `
        <p>Você pode:</p>
        <ul>
          <li><strong>Solicitar acesso</strong> aos dados.</li>
          <li><strong>Corrigir informações</strong> incorretas.</li>
          <li><strong>Solicitar exclusão</strong> quando permitido por lei.</li>
        </ul>
        <p>Para exercer seus direitos: <a href="mailto:contato@geocited.com.br">contato@geocited.com.br</a></p>
      `,
    },
    {
      question: "Alterações nesta política",
      response: `
        <p>Esta política pode ser atualizada periodicamente. Mudanças relevantes serão comunicadas.</p>
        <p>Se tiver dúvidas, fale com: <a href="mailto:contato@geocited.com.br">contato@geocited.com.br</a></p>
      `,
    },
  ],
};

export const prerender = false;

import type { APIRoute } from 'astro';

// 📋 CONFIGURAÇÃO DE DESTINATÁRIOS POR TIPO DE BRIEFING
const BRIEFING_CONFIG: Record<string, {
  emailContato: string;
  cc?: string;
  subject: string;
}> = {
  'briefing-entrada': {
    emailContato: 'qualidade@geocited.com.br',
    cc: 'gabrielvalentim@geocited.com.br',
    subject: 'Novo Briefing de Entrada Recebido'
  },
  'briefing-layout-novo': {
    emailContato: 'andersonsantos@geocited.com.br',
    subject: 'Novo Briefing de layout novo'
  },
  'default': {
    emailContato: 'qualidade@geocited.com.br',
    subject: 'Novo Briefing Recebido'
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Credenciais seguras no servidor
    const EMAIL_API_KEY = import.meta.env.QUALITYSMI_EMAIL_API_KEY || import.meta.env.QUALITYSMI_API_KEY;

    if (!EMAIL_API_KEY) {
      console.error('❌ Variáveis de ambiente faltando!');
      return new Response(JSON.stringify({ 
        error: 'Configuração inválida no servidor' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Buscar configuração específica do briefing ou usar a padrão
    const briefingType = body.formType || 'default';
    const config = BRIEFING_CONFIG[briefingType] || BRIEFING_CONFIG['default'];

    console.log(`📋 Processando briefing do tipo: ${briefingType}`);

    // CRIAR HTML CUSTOMIZADO PARA O E-MAIL
    const createBriefingHtml = (data: Record<string, any>, formType: string) => {
      const renameMap: Record<string, string> = {
        FirstVisit: "Primeira Visita",
        LastUpdated: "Última Atualização",
        ExpiresAt: "Expira Em",
        TrackingId: "ID de Rastreamento",
        Url: "URL da Conversão",
        Source: "Origem",
      };

      const formatFieldName = (key: string) => {
        const normalized = key.replace(/\s+/g, '').replace(/_/g, '').trim();
        if (renameMap[normalized]) return renameMap[normalized];

        return key
          .replace(/([A-Z])/g, ' $1')
          .replace(/_/g, ' ')
          .trim()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

      const formatValue = (value: any) => {
        if (!value) return '-';

        // Detectar arrays (checkboxes múltiplos)
        if (Array.isArray(value)) {
          return value.join(', ');
        }

        // Detectar datas ISO
        const date = new Date(value);
        if (!isNaN(date.getTime()) && typeof value === 'string' && value.includes('T')) {
          return date.toLocaleString('pt-BR', {
            dateStyle: "short",
            timeStyle: "short"
          });
        }
        
        return value;
      };

      const rows = Object.entries(data)
        .map(([key, value]) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #333; width: 40%;">
              ${formatFieldName(key)}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${formatValue(value)}
            </td>
          </tr>
        `)
        .join('');

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF5700 0%, #993400 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                ${config.subject}
              </h1>
              <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 14px;">
                Tipo: ${formType}
              </p>
              <p style="margin: 5px 0 0 0; color: #f0f0f0; font-size: 14px;">
                ${new Date().toLocaleString('pt-BR', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #888; font-size: 12px;">
                Este e-mail foi gerado automaticamente pelo sistema de briefings
              </p>
            </div>

          </div>
        </body>
        </html>
      `;
    };

    // ENVIAR E-MAIL
    let emailResult = null;
    try {
      // Autenticação
      const authRes = await fetch(
        `https://newapi.geocited.com.br/auth.php?api_key=${EMAIL_API_KEY}`
      );
      const authData = await authRes.json();

      if (!authData.token) {
        throw new Error(authData.erro || 'Falha na autenticação do e-mail');
      }

      // Gerar HTML customizado
      const customHtml = createBriefingHtml(body.data, briefingType);

      // Preparar dados para envio
      const emailData = new URLSearchParams();
      emailData.append('customHtml', customHtml);
      emailData.append('emailContato', config.emailContato);
      if (config.cc) {
        emailData.append('cc', config.cc);
      }
      emailData.append('subject', config.subject);

      // Enviar e-mail
      const emailRes = await fetch('https://newapi.geocited.com.br/dispara-email.php', {
        method: 'POST',
        headers: {
          'api_key': EMAIL_API_KEY,
          'token': authData.token
        },
        body: emailData
      });

      emailResult = await emailRes.json();
      console.log('✅ E-mail enviado com sucesso para:', config.emailContato);

    } catch (emailErr) {
      console.error('⚠️ Erro ao enviar e-mail:', emailErr);
      emailResult = { 
        error: true, 
        message: emailErr instanceof Error ? emailErr.message : 'Erro desconhecido' 
      };
    }

    return new Response(JSON.stringify({ 
      success: true,
      briefingType,
      config: {
        emailContato: config.emailContato,
        subject: config.subject
      },
      email: emailResult
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('ERRO CRÍTICO na rota /api/briefings:');
    console.error(err);
    
    return new Response(JSON.stringify({ 
      error: err instanceof Error ? err.message : 'Erro desconhecido' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
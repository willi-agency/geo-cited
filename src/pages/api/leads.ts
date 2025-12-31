export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Credenciais seguras no servidor
    const API_KEY = import.meta.env.QUALITYSMI_API_KEY;
    const ENDPOINT = import.meta.env.QUALITYSMI_ENDPOINT;
    const EMAIL_API_KEY = import.meta.env.QUALITYSMI_EMAIL_API_KEY || API_KEY;
    const emailContato = 'maiconwillisystem@gmail.com';
    const cc = "backup@clientes.geocited.com.br";
    const subject = 'Novo Lead Recebido';

    if (!API_KEY || !ENDPOINT) {
      console.error('❌ Variáveis de ambiente faltando!');
      return new Response(JSON.stringify({ 
        error: 'Configuração inválida no servidor' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1️⃣ CADASTRAR LEAD NO CRM
    const payload = {
      apiKey: API_KEY,
      dataFormId: body.formId,
      userAgent: request.headers.get('user-agent'),
      dataValues: {
        ...body.data,
        ...body.tracking,
        url: body.url
      }
    };

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });


    const result = await res.json().catch((err) => {
      console.error('❌ Erro ao fazer parse do JSON da resposta:', err);
      return null;
    });

    if (!res.ok) {
      console.error(`❌ API retornou erro ${res.status}:`, result);
      throw new Error(result?.message || `Erro ${res.status} na API externa`);
    }

    console.log('Cadastrado com sucesso no CRM');

    return new Response(JSON.stringify({ 
      success: true, 
      data: result,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('💥 ERRO CRÍTICO na rota /api/leads:');
    console.error(err);
    
    return new Response(JSON.stringify({ 
      error: err instanceof Error ? err.message : 'Erro desconhecido' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
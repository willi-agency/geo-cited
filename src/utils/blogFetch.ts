// src/utils/blogFetch.ts

interface FetchAllPostsOptions {
  apiUrl: string;
  apiKey: string;
  queryParams?: Record<string, string | number | boolean>;
  maxPerPage?: number;
}

interface ApiResponse {
  data?: any[];
  pagination?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

/**
 * Busca TODOS os posts da API, mesmo que ultrapasse o limite de perPage
 * Faz múltiplas requisições se necessário
 */
export async function fetchAllPosts(options: FetchAllPostsOptions): Promise<any[]> {
  const { apiUrl, apiKey, queryParams = {}, maxPerPage = 100 } = options;
  
  try {
    // 1. Buscar o total de posts
    const countUrl = buildUrl(apiUrl, apiKey, { ...queryParams, page: 1, perPage: 1 });
    const countRes = await fetch(countUrl);
    
    if (!countRes.ok) {
      console.error('Erro ao buscar total de posts:', countRes.status);
      return [];
    }
    
    const countData: ApiResponse = await countRes.json();
    const totalPosts = countData.pagination?.total || 0;
    
    if (totalPosts === 0) {
      console.log('Nenhum post encontrado');
      return [];
    }
    
    console.log(`📊 Total de posts: ${totalPosts}`);
    
    // 2. Calcular quantas requisições são necessárias
    const apiPages = Math.ceil(totalPosts / maxPerPage);
    const allPosts: any[] = [];
    
    console.log(`🔄 Buscando ${apiPages} página(s) da API...`);
    
    // 3. Buscar todas as páginas
    for (let apiPage = 1; apiPage <= apiPages; apiPage++) {
      try {
        const url = buildUrl(apiUrl, apiKey, {
          ...queryParams,
          page: apiPage,
          perPage: maxPerPage
        });
        
        const res = await fetch(url);
        
        if (res.ok) {
          const data: ApiResponse = await res.json();
          const posts = data.data || [];
          allPosts.push(...posts);
          console.log(`  ✅ Página ${apiPage}/${apiPages}: ${posts.length} posts`);
        } else {
          console.error(`  ❌ Erro na página ${apiPage}: ${res.status}`);
        }
      } catch (err) {
        console.error(`  ❌ Erro ao buscar página ${apiPage}:`, err);
      }
    }
    
    console.log(`✅ Total carregado: ${allPosts.length}/${totalPosts}`);
    
    if (allPosts.length < totalPosts) {
      console.warn(`⚠️ ATENÇÃO: Esperado ${totalPosts}, recebido ${allPosts.length}`);
    }
    
    return allPosts;
    
  } catch (error) {
    console.error('💥 Erro ao buscar posts:', error);
    return [];
  }
}

/**
 * Constrói a URL com os parâmetros
 */
function buildUrl(
  baseUrl: string,
  apiKey: string,
  params: Record<string, string | number | boolean>
): string {
  const url = `${baseUrl}/${apiKey}`;
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  return `${url}?${queryString}`;
}

/**
 * Gera páginas estáticas com paginação
 */
export function generatePaginatedPaths(
  allPosts: any[],
  postsPerPage: number,
  startPage: number = 1
) {
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const paths = [];
  
  for (let page = startPage; page <= totalPages; page++) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsForPage = allPosts.slice(start, end);
    
    paths.push({
      params: { page: String(page) },
      props: {
        posts: postsForPage,
        currentPage: page,
        totalPages: totalPages,
        totalPosts: allPosts.length
      }
    });
  }
  
  return paths;
}
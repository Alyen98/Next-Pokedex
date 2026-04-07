⚡ Pokédex Next.js
Uma aplicação web moderna, rápida e responsiva para explorar o mundo Pokémon. Construída com Next.js (App Router), TypeScript e Tailwind CSS, esta Pokédex consome os dados diretamente da PokeAPI.

✨ Funcionalidades
Listagem Paginada: Navegue por todos os Pokémon facilmente com botões de "Anterior" e "Próximo" (20 Pokémon por página).

Busca Dinâmica: Pesquise Pokémon específicos pelo nome exato ou pelo seu ID numérico.

Página de Detalhes: Informações aprofundadas sobre cada Pokémon, incluindo imagem oficial, tipos, peso e altura.

Design Inteligente: * Cards com badges coloridas baseadas no tipo do Pokémon.

O fundo da página de detalhes muda de cor dinamicamente com base no tipo principal do Pokémon.

Performance: Utilização de React Server Components para fetch de dados no lado do servidor, garantindo carregamento rápido e ótimo SEO, com imagens otimizadas pelo next/image.

🛠️ Tecnologias Utilizadas
Next.js (App Router)

React

TypeScript

Tailwind CSS

PokeAPI (REST API)

📁 Estrutura de Arquivos (Baseada no Código)
app/page.tsx: Página inicial contendo o campo de busca, tratamento de erros e listagem com paginação.

app/pokemon/[id]/page.tsx: Página de detalhes dinâmicos do Pokémon.

components/pokemon-card.tsx: Componente de card individual para a listagem.

components/back-button.tsx: Componente Client-Side para navegação de retorno.

🚀 Como rodar o projeto localmente
Siga os passos abaixo para executar a aplicação na sua máquina:

1. Clone o repositório e acesse o diretório

Bash
git clone https://seu-repositorio/pokedex-nextjs.git
cd pokedex-nextjs
2. Instale as dependências
Você pode usar npm, yarn, pnpm ou bun:

Bash
npm install
# ou
yarn install
3. Configuração de Imagens (Importante)
Como o projeto carrega imagens externas da PokeAPI, certifique-se de que o seu arquivo next.config.js (ou next.config.mjs) esteja configurado para aceitar o domínio do GitHub usado nas sprites:

JavaScript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
4. Inicie o servidor de desenvolvimento

Bash
npm run dev
# ou
yarn dev
5. Acesse a aplicação
Abra o seu navegador e acesse http://localhost:3000.
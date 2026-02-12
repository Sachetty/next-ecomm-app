# FakeStore - Loja Online

Aplicacao e-commerce desenvolvida com **Next.js 16**, consumindo a [FakeStore API](https://fakestoreapi.com) para exibir produtos, com listagem paginada e pagina de detalhe do produto (PDP).

## Demo

**Producao:** [https://next-ecomm-app-5iyi.vercel.app](https://next-ecomm-app-5iyi.vercel.app)

## Tecnologias

| Tecnologia | Versao | Uso |
|---|---|---|
| Next.js | 16 | Framework React com App Router |
| React | 19 | Biblioteca UI |
| TypeScript | 5 | Tipagem estatica |
| Material UI | 7 | Componentes de interface |
| Tailwind CSS | 4 | Utilitarios de estilo |
| React Query | 5 (TanStack) | Gerenciamento de estado server-side |
| Emotion | 11 | CSS-in-JS (engine do MUI) |
| Jest | 29 | Testes unitarios |
| Testing Library | 16 | Testes de componentes React |
| Playwright | 1.58 | Testes end-to-end |
| pnpm | 10 | Gerenciador de pacotes |

## Estrutura do Projeto

```
src/
├── app/                          # Rotas (Next.js App Router)
│   ├── globals.css               # Estilos globais + Tailwind
│   ├── layout.tsx                # Layout raiz com Providers
│   ├── page.tsx                  # Pagina inicial (listagem)
│   └── product/[id]/page.tsx     # Pagina de detalhe (PDP)
│
├── components/                   # Componentes React
│   ├── layout/
│   │   ├── Header.tsx            # AppBar responsivo + drawer mobile
│   │   ├── Header.test.tsx
│   │   ├── Footer.tsx            # Footer com grid 3 colunas
│   │   └── Footer.test.tsx
│   └── products/
│       ├── ProductCard.tsx       # Card individual do produto
│       ├── ProductCard.test.tsx
│       ├── ProductDetail.tsx     # Detalhe completo do produto
│       ├── ProductDetailPage.tsx # Wrapper client-side com React Query
│       └── ProductList.tsx       # Grid + paginacao + ordenacao
│
├── hooks/                        # Custom hooks (React Query)
│   ├── useProduct.ts             # Busca produto por ID
│   ├── useProduct.test.tsx
│   ├── useProducts.ts            # Lista paginada + query key factory
│   ├── useProducts.test.tsx
│   └── useCategories.ts          # Lista categorias
│
├── services/                     # Camada de API
│   ├── api.ts                    # Fetch wrapper generico
│   ├── api.test.ts
│   ├── productService.ts         # Operacoes de produto
│   └── productService.test.ts
│
├── providers/                    # Context Providers
│   ├── Providers.tsx             # Combina Theme + Query providers
│   ├── QueryProvider.tsx         # React Query + DevTools
│   └── ThemeProvider.tsx         # MUI Theme + Emotion SSR cache
│
├── theme/
│   └── theme.ts                  # Tema MUI customizado
│
├── types/
│   └── product.ts                # Interfaces TypeScript
│
└── test-utils/
    └── mocks.ts                  # Dados mock para testes

e2e/                              # Testes end-to-end (Playwright)
├── home.spec.ts                  # Testes da listagem
└── product.spec.ts               # Testes da PDP
```

## Como Rodar Localmente

```bash
# Clonar o repositorio
git clone https://github.com/Sachetty/next-ecomm-app.git
cd next-ecomm-app

# Instalar dependencias
pnpm install

# Rodar em desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts Disponiveis

| Script | Comando | Descricao |
|---|---|---|
| Dev | `pnpm dev` | Servidor de desenvolvimento |
| Build | `pnpm build` | Build de producao |
| Start | `pnpm start` | Servidor de producao |
| Lint | `pnpm lint` | Verifica erros de lint (ESLint) |
| Test | `pnpm test` | Roda testes unitarios (Jest) |
| Test Watch | `pnpm test:watch` | Testes em modo watch |
| Test Coverage | `pnpm test:coverage` | Testes com relatorio de cobertura |
| Test E2E | `pnpm test:e2e` | Testes end-to-end (Playwright) |
| Test E2E UI | `pnpm test:e2e:ui` | Testes e2e com interface visual |

## Testes

### Unitarios (Jest + Testing Library)

31 testes cobrindo services, hooks e componentes:

```bash
pnpm test
```

| Suite | Testes | Cobertura |
|---|---|---|
| api.test.ts | 3 | Fetch wrapper, erros, headers |
| productService.test.ts | 5 | CRUD de produtos e categorias |
| useProducts.test.tsx | 4 | Paginacao, ordenacao |
| useProduct.test.tsx | 3 | Busca por ID, enabled/disabled |
| ProductCard.test.tsx | 6 | Renderizacao de titulo, preco, imagem, link |
| Header.test.tsx | 3 | Logo, navegacao, menu mobile |
| Footer.test.tsx | 6 | Secoes, copyright, tecnologias |

### End-to-End (Playwright)

11 testes de fluxo completo no browser:

```bash
pnpm test:e2e
```

| Suite | Testes | Cobertura |
|---|---|---|
| home.spec.ts | 7 | Listagem, paginacao, ordenacao, header, footer |
| product.spec.ts | 4 | Detalhe do produto, navegacao, 404 |

## CI/CD Pipeline

O projeto usa **GitHub Actions** para validacao automatica em cada push e pull request.

### Workflow (`.github/workflows/ci.yml`)

3 jobs executados em paralelo:

1. **Lint** - Verifica padroes de codigo com ESLint
2. **Unit Tests** - Roda os 31 testes unitarios com Jest
3. **E2E Tests** - Faz build, instala Chromium e roda os 11 testes Playwright

### Fluxo

```
Push/PR na main
    |
    ├── Job: Lint ────────────┐
    ├── Job: Unit Tests ──────┤── Todos passam? ──> Merge permitido
    └── Job: E2E Tests ───────┘         |
                                    Falhou? ──> Merge bloqueado
```

### Branch Protection

A branch `main` esta protegida:
- Pull request obrigatorio antes de merge
- Os 3 checks do CI devem passar antes de permitir merge
- Branch deve estar atualizada com a main

## Deploy na Vercel

O deploy e automatico via integracao GitHub + Vercel:

- **Push na `main`** -> Deploy de producao automatico
- **Pull Request** -> Preview deploy com URL unica para revisao
- **Build command**: `next build` (detectado automaticamente)
- **Framework**: Next.js (detectado automaticamente)

A Vercel gera uma URL de producao fixa e URLs de preview para cada PR.

## Principios Aplicados

### SOLID

| Principio | Aplicacao |
|---|---|
| **SRP** (Single Responsibility) | Cada service, hook e componente tem uma unica responsabilidade |
| **OCP** (Open/Closed) | Novas operacoes no service sem alterar as existentes |
| **DIP** (Dependency Inversion) | Hooks dependem da abstracao (service), nao do fetch direto |

### Renderizacao Next.js

- **Server Components** - Layout e paginas como server components (sem JS no client)
- **Client Components** - Componentes interativos com `"use client"` e React Query
- **Dynamic Rendering** - Pagina de detalhe renderizada sob demanda

### React Query v5

- **Query Key Factory** - Centraliza keys para cache e invalidacao
- **`select`** - Paginacao client-side sem re-fetch
- **`staleTime`** - Cache inteligente por tipo de dado
- **DevTools** - Ferramenta de debug inclusa em desenvolvimento

## API Consumida

[FakeStore API](https://fakestoreapi.com) - API publica gratuita:

| Endpoint | Uso |
|---|---|
| `GET /products` | Listagem de produtos |
| `GET /products?sort=asc\|desc` | Listagem ordenada |
| `GET /products/:id` | Detalhe do produto |
| `GET /products/categories` | Lista de categorias |

## Licenca

Este projeto foi desenvolvido como teste tecnico.

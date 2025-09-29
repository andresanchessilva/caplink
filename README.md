# CapLink - E-commerce Platform

Uma plataforma de e-commerce completa com autenticação JWT, gerenciamento de produtos, carrinho de compras e sistema de pedidos.

## 🚀 Tecnologias

### Backend

- **NestJS** - Framework Node.js
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Docker** - Containerização

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Material-UI** - Componentes de UI
- **Tailwind CSS** - Estilização
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de dados

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Git

## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd caplink
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

### 3. Configuração do Frontend

```bash
cd frontend
npm install
```

### 4. Configuração do Banco de Dados

O projeto usa Docker para o PostgreSQL. Execute:

```bash
cd backend
docker-compose up -d
```

### 5. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/caplink?schema=public"
JWT_SECRET="seu-jwt-secret-aqui"
PORT=3030
```

### 6. Executar Migrações e Seed

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

## 🎮 Como Executar

### Backend

```bash
cd backend
npm run start:dev
```

O backend estará disponível em: `http://localhost:3030`

### Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## 👥 Usuários Padrão

O sistema vem com usuários pré-configurados:

### Administrador

- **Email:** admin@exemplo.com
- **Senha:** admin123
- **Role:** ADMIN

### Vendedor

- **Email:** seller@exemplo.com
- **Senha:** seller123
- **Role:** SELLER

### Cliente

- **Email:** customer@exemplo.com
- **Senha:** customer123
- **Role:** CUSTOMER

## 🛍️ Produtos Padrão

O sistema inclui produtos de exemplo:

- Camiseta Algodão (R$ 49,99)
- Calça Jeans (R$ 99,90)
- Tênis Esportivo (R$ 199,90)
- Mochila (R$ 89,90)
- Relógio Digital (R$ 149,90)
- Óculos de Sol (R$ 79,90)
- Fone de Ouvido (R$ 129,90)
- Smartphone (R$ 899,90)
- Notebook (R$ 2499,90)
- Tablet (R$ 699,90)
- Câmera Digital (R$ 1299,90)
- Livro (R$ 39,90)

## 🎯 Funcionalidades

### Para Clientes

- ✅ Cadastro e login
- ✅ Visualização de produtos
- ✅ Adicionar produtos ao carrinho
- ✅ Gerenciar quantidade no carrinho
- ✅ Favoritar produtos
- ✅ Finalizar pedidos
- ✅ Histórico de pedidos

### Para Vendedores

- ✅ Cadastro e login
- ✅ Visualizar apenas seus produtos
- ✅ Cadastrar novos produtos
- ✅ Editar produtos existentes
- ✅ Excluir produtos
- ✅ Ativar/desativar produtos
- ✅ Estatísticas de vendas

### Para Administradores

- ✅ Acesso completo ao sistema
- ✅ Gerenciar todos os produtos
- ✅ Visualizar todos os usuários
- ✅ Estatísticas gerais

## 🏗️ Estrutura do Projeto

```
caplink/
├── backend/
│   ├── src/
│   │   ├── auth/           # Autenticação e autorização
│   │   ├── products/       # Gerenciamento de produtos
│   │   ├── users/          # Gerenciamento de usuários
│   │   ├── carts/          # Carrinho de compras
│   │   ├── orders/         # Pedidos
│   │   ├── favorites/      # Favoritos
│   │   └── stats/          # Estatísticas
│   ├── prisma/
│   │   ├── schema.prisma   # Schema do banco
│   │   └── seed.ts         # Dados iniciais
│   └── docker-compose.yml  # Configuração do banco
├── frontend/
│   ├── src/
│   │   ├── app/            # Páginas da aplicação
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── contexts/       # Contextos React
│   │   ├── hooks/          # Hooks customizados
│   │   ├── services/       # Serviços de API
│   │   ├── types/          # Tipos TypeScript
│   │   └── theme/          # Configuração do tema
│   └── public/             # Arquivos estáticos
└── README.md
```

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run start          # Produção
npm run start:dev      # Desenvolvimento
npm run build          # Build
npm run test           # Testes
npx prisma studio      # Interface do banco
npx prisma migrate dev # Executar migrações
npx prisma db seed     # Executar seed
```

### Frontend

```bash
npm run dev            # Desenvolvimento
npm run build          # Build
npm run start          # Produção
npm run lint           # Linter
```

## 🎨 Tema e Design

O projeto usa uma paleta de cores personalizada:

- **Cor Primária:** #4b8f29 (Verde oliva)
- **Cor Secundária:** #357019 (Verde escuro)
- **Cor Clara:** #7fc97f (Verde claro)

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

- Tokens são armazenados no localStorage
- Renovação automática de tokens
- Proteção de rotas por role (CUSTOMER, SELLER, ADMIN)

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:

- Desktop
- Tablet
- Mobile

## 🐳 Docker

Para executar apenas o banco de dados:

```bash
cd backend
docker-compose up -d
```

Para parar:

```bash
docker-compose down
```

## 🚀 Deploy

### Backend

1. Configure as variáveis de ambiente de produção
2. Execute `npm run build`
3. Execute `npm run start`

### Frontend

1. Execute `npm run build`
2. Execute `npm run start`

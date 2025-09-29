# Autenticação JWT com Passport e bcrypt

Este módulo implementa autenticação JWT completa usando Passport e bcrypt para hash de senhas.

## Funcionalidades

- ✅ Registro de usuários com hash de senha
- ✅ Login com validação de credenciais
- ✅ Geração de tokens JWT
- ✅ Proteção de rotas com guards
- ✅ Validação de roles/permissões
- ✅ Documentação Swagger completa

## Endpoints Disponíveis

### POST /auth/register

Registra um novo usuário no sistema.

**Body:**

```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "role": "CUSTOMER" // opcional, padrão: CUSTOMER
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "CUSTOMER"
  }
}
```

### POST /auth/login

Faz login de um usuário existente.

**Body:**

```json
{
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "CUSTOMER"
  }
}
```

### GET /auth/profile

Obtém o perfil do usuário autenticado.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "CUSTOMER"
}
```

## Como Usar em Outros Controladores

### 1. Proteger uma rota com autenticação

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('products')
export class ProductsController {
  @Get('my-products')
  @UseGuards(JwtAuthGuard)
  getMyProducts(@CurrentUser() user: any) {
    // user contém os dados do usuário autenticado
    return this.productsService.findByUserId(user.id);
  }
}
```

### 2. Proteger uma rota com role específica

```typescript
import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
export class AdminController {
  @Post('create-product')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SELLER)
  createProduct(@CurrentUser() user: any) {
    // Apenas ADMIN ou SELLER podem acessar
    return this.productsService.create(user.id);
  }
}
```

### 3. Importar o AuthModule em outros módulos

```typescript
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  // ...
})
export class ProductsModule {}
```

## Configuração

### Variáveis de Ambiente

Certifique-se de ter as seguintes variáveis configuradas:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/caplink"
JWT_SECRET="sua-chave-secreta-jwt" # Recomendado usar variável de ambiente
```

### Segurança

- Senhas são hasheadas com bcrypt usando 12 rounds de salt
- Tokens JWT expiram em 24 horas
- Validação de email único no banco de dados
- Verificação de usuário ativo antes da autenticação

## Estrutura de Arquivos

```
src/auth/
├── dto/
│   ├── login.dto.ts
│   └── register.dto.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
├── strategies/
│   └── jwt.strategy.ts
├── decorators/
│   ├── current-user.decorator.ts
│   └── roles.decorator.ts
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
└── README.md
```

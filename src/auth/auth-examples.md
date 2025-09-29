# Exemplos de Teste da Autenticação

## Testando com cURL

### 1. Registrar um novo usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "password": "senha123",
    "role": "SELLER"
  }'
```

**Resposta esperada:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "SELLER"
  }
}
```

### 2. Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com",
    "password": "senha123"
  }'
```

### 3. Acessar perfil protegido

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 4. Criar um produto (requer autenticação e role SELLER/ADMIN)

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Produto Exemplo",
    "price": 99.99,
    "description": "Descrição do produto",
    "imageUrl": "https://exemplo.com/imagem.jpg"
  }'
```

### 5. Listar produtos (público)

```bash
curl -X GET http://localhost:3000/products
```

## Testando com Postman

### Collection de Exemplos

1. **POST** `/auth/register`
   - Body: JSON com name, email, password, role
   - Headers: Content-Type: application/json

2. **POST** `/auth/login`
   - Body: JSON com email e password
   - Headers: Content-Type: application/json

3. **GET** `/auth/profile`
   - Headers: Authorization: Bearer {{token}}

4. **POST** `/products`
   - Body: JSON com dados do produto
   - Headers:
     - Content-Type: application/json
     - Authorization: Bearer {{token}}

## Cenários de Teste

### ✅ Cenários de Sucesso

1. **Registro bem-sucedido**
   - Email único
   - Senha com pelo menos 6 caracteres
   - Dados válidos

2. **Login bem-sucedido**
   - Email e senha corretos
   - Usuário ativo

3. **Acesso a rota protegida**
   - Token válido
   - Usuário ativo

4. **Criação de produto**
   - Token válido
   - Role SELLER ou ADMIN

### ❌ Cenários de Erro

1. **Registro com email duplicado**

   ```json
   {
     "statusCode": 409,
     "message": "Email já está em uso"
   }
   ```

2. **Login com credenciais inválidas**

   ```json
   {
     "statusCode": 401,
     "message": "Credenciais inválidas"
   }
   ```

3. **Acesso sem token**

   ```json
   {
     "statusCode": 401,
     "message": "Unauthorized"
   }
   ```

4. **Token expirado**

   ```json
   {
     "statusCode": 401,
     "message": "Unauthorized"
   }
   ```

5. **Acesso sem permissão (role)**
   ```json
   {
     "statusCode": 403,
     "message": "Forbidden resource"
   }
   ```

## Variáveis de Ambiente

Certifique-se de ter configurado:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/caplink"
JWT_SECRET="sua-chave-secreta-jwt"
```

## Dicas de Teste

1. **Salve o token** retornado no login para usar em requisições subsequentes
2. **Teste diferentes roles** (CUSTOMER, SELLER, ADMIN)
3. **Teste expiração** do token (24 horas)
4. **Teste validações** de entrada (email inválido, senha curta, etc.)
5. **Teste autorização** tentando acessar recursos de outros usuários

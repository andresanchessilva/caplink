# Exemplos de Uso dos Endpoints de Favoritos

## Endpoints Disponíveis

### 1. Adicionar produto aos favoritos (via body)

```bash
POST /favorites
Authorization: Bearer <token>
Content-Type: application/json
```

**Exemplo:**

```bash
curl -X POST http://localhost:3000/favorites \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"productId": "produto-uuid-123"}'
```

### 2. Adicionar produto aos favoritos por ID do produto (via URL)

```bash
POST /favorites/:productId
Authorization: Bearer <token>
```

**Exemplo:**

```bash
curl -X POST http://localhost:3000/favorites/produto-uuid-123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**

```json
{
  "id": "favorite-uuid",
  "customerId": "user-uuid",
  "productId": "produto-uuid-123",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "customer": {
    "id": "user-uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com"
  },
  "product": {
    "id": "produto-uuid-123",
    "name": "Produto Exemplo",
    "price": 99.99,
    "description": "Descrição do produto"
  }
}
```

### 3. Listar favoritos do usuário

```bash
GET /favorites
Authorization: Bearer <token>
```

**Exemplo:**

```bash
curl -X GET http://localhost:3000/favorites \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**

```json
[
  {
    "id": "favorite-uuid-1",
    "customerId": "user-uuid",
    "productId": "produto-uuid-123",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "customer": { ... },
    "product": { ... }
  },
  {
    "id": "favorite-uuid-2",
    "customerId": "user-uuid",
    "productId": "produto-uuid-456",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "customer": { ... },
    "product": { ... }
  }
]
```

### 4. Remover favorito por ID do produto

```bash
DELETE /favorites/product/:productId
Authorization: Bearer <token>
```

**Exemplo:**

```bash
curl -X DELETE http://localhost:3000/favorites/product/produto-uuid-123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**

```json
{
  "id": "favorite-uuid",
  "customerId": "user-uuid",
  "productId": "produto-uuid-123",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "customer": { ... },
  "product": { ... }
}
```

### 5. Remover favorito por ID do favorito

```bash
DELETE /favorites/:id
Authorization: Bearer <token>
```

**Exemplo:**

```bash
curl -X DELETE http://localhost:3000/favorites/favorite-uuid-123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Mudanças Implementadas

### ✅ Melhorias de Segurança

1. **Remoção do customerId do body**: O `customerId` não é mais necessário no body da requisição, sendo extraído automaticamente da sessão do usuário autenticado.

2. **Validação de propriedade**: Todos os endpoints agora verificam se o usuário é o dono do recurso antes de permitir operações.

3. **Autenticação obrigatória**: Todos os endpoints agora requerem autenticação via JWT.

### 📝 Exemplo de Uso Atualizado

**Antes (❌):**

```json
{
  "customerId": "user-uuid",
  "productId": "produto-uuid-123"
}
```

**Agora (✅):**

```json
{
  "productId": "produto-uuid-123"
}
```

O `customerId` é extraído automaticamente do token JWT do usuário autenticado.

## Comparação com sua Abordagem Original

### ❌ Sua abordagem original:

```typescript
@Post(':productId')
async addFavorite(
  @Param('productId') productId: string,
  @Req() req
) {
  const userId = req.user.id; // supondo que tenha auth
  return this.favoritesService.add(userId, productId);
}
```

### ✅ Abordagem implementada (melhor):

```typescript
@Post(':productId')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
async addFavorite(
  @Param('productId') productId: string,
  @CurrentUser() user: AuthenticatedUser,
): Promise<FavoriteEntity> {
  return this.favoritesService.create({
    customerId: user.id,
    productId,
  });
}
```

## Vantagens da Abordagem Implementada

1. **Tipagem Forte**: `AuthenticatedUser` em vez de `any`
2. **Guards Explícitos**: `@UseGuards(JwtAuthGuard)` garante autenticação
3. **Documentação Swagger**: `@ApiBearerAuth()` e `@ApiOperation()`
4. **Validação de Propriedade**: Usuário só pode gerenciar seus próprios favoritos
5. **Tratamento de Erros**: Exceções apropriadas para diferentes cenários
6. **Consistência**: Segue o mesmo padrão dos outros controladores

## Cenários de Teste

### ✅ Cenários de Sucesso

1. **Adicionar favorito**
   - Token válido
   - Produto existe
   - Produto não está nos favoritos

2. **Listar favoritos**
   - Token válido
   - Usuário tem favoritos

3. **Remover favorito**
   - Token válido
   - Favorito existe
   - Usuário é dono do favorito

### ❌ Cenários de Erro

1. **Produto já nos favoritos**

   ```json
   {
     "statusCode": 409,
     "message": "Product is already in favorites"
   }
   ```

2. **Produto não encontrado**

   ```json
   {
     "statusCode": 404,
     "message": "Product not found"
   }
   ```

3. **Favorito não encontrado**

   ```json
   {
     "statusCode": 404,
     "message": "Favorite not found"
   }
   ```

4. **Sem permissão**

   ```json
   {
     "statusCode": 403,
     "message": "Você não tem permissão para remover este favorito"
   }
   ```

5. **Token inválido**
   ```json
   {
     "statusCode": 401,
     "message": "Unauthorized"
   }
   ```

## Fluxo Completo de Teste

1. **Registrar usuário**
2. **Fazer login** (obter token)
3. **Criar produto** (como SELLER)
4. **Adicionar produto aos favoritos** (como CUSTOMER)
5. **Listar favoritos**
6. **Remover favorito**
7. **Verificar que foi removido**

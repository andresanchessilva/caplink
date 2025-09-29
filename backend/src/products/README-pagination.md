# Paginação de Produtos

## Como usar

A API de produtos agora suporta paginação através de query parameters:

### Endpoint

```
GET /products
```

### Parâmetros de Query

| Parâmetro | Tipo   | Obrigatório | Padrão | Descrição                               |
| --------- | ------ | ----------- | ------ | --------------------------------------- |
| `page`    | number | Não         | 1      | Número da página (começando em 1)       |
| `limit`   | number | Não         | 10     | Número de itens por página (máximo 100) |

### Exemplos de Uso

#### Buscar primeira página com 10 itens (padrão)

```
GET /products
```

#### Buscar segunda página com 20 itens

```
GET /products?page=2&limit=20
```

#### Buscar terceira página com 5 itens

```
GET /products?page=3&limit=5
```

### Resposta

A resposta inclui os dados paginados e metadados:

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Produto 1",
      "price": 49.99,
      "description": "Descrição do produto",
      "imageUrl": "https://exemplo.com/imagem.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "sellerId": "uuid",
      "seller": {
        "id": "uuid",
        "name": "Vendedor"
        // ... outros campos do vendedor
      }
    }
    // ... mais produtos
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasPreviousPage": false,
    "hasNextPage": true
  }
}
```

### Metadados da Paginação

- `page`: Página atual
- `limit`: Número de itens por página
- `total`: Total de itens disponíveis
- `totalPages`: Total de páginas
- `hasPreviousPage`: Se existe página anterior
- `hasNextPage`: Se existe próxima página

### Validações

- `page`: Deve ser um número positivo maior ou igual a 1
- `limit`: Deve ser um número entre 1 e 100
- Se os parâmetros não forem fornecidos, serão usados os valores padrão

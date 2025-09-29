import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductEntity implements Product {
  @ApiProperty({
    required: true,
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
    description: 'ID do produto',
  })
  id: string;

  @ApiProperty({
    required: true,
    example: 'Camiseta',
    description: 'Nome do produto',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 49.99,
    description: 'Preço do produto',
  })
  price: Decimal;

  @ApiPropertyOptional({
    example: 'Camiseta de algodão',
    description: 'Descrição do produto',
  })
  description: string;

  @ApiPropertyOptional({
    example: 'https://exemplo.com/imagem.jpg',
    description: 'URL da imagem do produto',
  })
  imageUrl: string;

  @ApiProperty({
    example: true,
    description: 'Se o produto está ativo',
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-06-01T12:00:00.000Z',
    description: 'Data de criação do produto',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-01T12:00:00.000Z',
    description: 'Data de atualização do produto',
  })
  updatedAt: Date;

  @ApiProperty({
    required: true,
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
    description: 'Id do vendedor',
  })
  sellerId: string;

  @ApiProperty({
    example: 0,
    description: 'Total de unidades vendidas',
    default: 0,
  })
  totalSold: number;

  @ApiPropertyOptional({
    description: 'Itens do carrinho que contêm este produto',
  })
  cartItems?: any[];

  @ApiPropertyOptional({
    description: 'Itens de pedidos que contêm este produto',
  })
  orderItems?: any[];

  @ApiPropertyOptional({
    description: 'Usuários que favoritaram este produto',
  })
  favorites?: any[];
}

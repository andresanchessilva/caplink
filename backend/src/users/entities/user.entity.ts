import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User, Role } from '@prisma/client';
import { ProductEntity } from '../../products/entities/product.entity';

export class UserEntity implements User {
  @ApiProperty({
    required: true,
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
    description: 'ID do usuário',
  })
  id: string;

  @ApiProperty({
    required: true,
    example: 'João Silva',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'joao@exemplo.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'senha123',
    description: 'Senha do usuário',
  })
  password: string;

  @ApiProperty({
    required: true,
    enum: Role,
    example: Role.CUSTOMER,
    description: 'Papel do usuário no sistema',
    default: Role.CUSTOMER,
  })
  role: Role;

  @ApiProperty({
    example: '2024-06-01T12:00:00.000Z',
    description: 'Data de criação do usuário',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-01T12:00:00.000Z',
    description: 'Data de atualização do usuário',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    example: null,
    description: 'Data de exclusão do usuário (soft delete)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: true,
    description: 'Se o usuário está ativo',
    default: true,
  })
  isActive: boolean;

  @ApiPropertyOptional({
    type: ProductEntity,
    description: 'Carrinho do usuário (se for cliente)',
  })
  cart?: any;

  @ApiPropertyOptional({
    type: [ProductEntity],
    description: 'Produtos favoritos do usuário (se for cliente)',
  })
  customerFavorites?: any[];

  @ApiPropertyOptional({
    type: [ProductEntity],
    description: 'Pedidos do usuário (se for cliente)',
  })
  customerOrders?: any[];

  @ApiPropertyOptional({
    type: [ProductEntity],
    description: 'Produtos do usuário (se for vendedor)',
  })
  sellerProducts?: ProductEntity[];
}

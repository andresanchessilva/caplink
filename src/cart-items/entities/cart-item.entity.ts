import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';

export class CartItemEntity implements CartItem {
  @ApiProperty({
    description: 'The unique identifier of the cart item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the cart this item belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  cartId: string;

  @ApiProperty({
    description: 'The cart this item belongs to',
  })
  cart?: any;

  @ApiProperty({
    description: 'The ID of the product in the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @ApiProperty({
    description: 'The product in the cart',
  })
  product?: any;

  @ApiProperty({
    description: 'The quantity of the product in the cart',
    example: 2,
    minimum: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'The date when the item was added to the cart',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

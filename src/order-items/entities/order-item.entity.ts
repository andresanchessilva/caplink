import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class OrderItemEntity implements OrderItem {
  @ApiProperty({
    description: 'The unique identifier of the order item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the order this item belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  orderId: string;

  @ApiProperty({
    description: 'The order this item belongs to',
  })
  order?: any;

  @ApiProperty({
    description: 'The ID of the product in the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @ApiProperty({
    description: 'The product in the order',
  })
  product?: any;

  @ApiProperty({
    description: 'The quantity of the product in the order',
    example: 2,
    minimum: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'The price of the product at the time of order',
    example: 29.99,
  })
  price: Decimal;
}

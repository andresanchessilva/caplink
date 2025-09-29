import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '@prisma/client';

export class CartEntity implements Cart {
  @ApiProperty({
    description: 'The unique identifier of the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the customer who owns the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  customerId: string;

  @ApiProperty({
    description: 'The customer who owns the cart',
  })
  customer?: any;

  @ApiProperty({
    description: 'The items in the cart',
  })
  items?: any[];

  @ApiProperty({
    description: 'The date when the cart was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the cart was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

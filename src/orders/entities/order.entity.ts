import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class OrderEntity implements Order {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the customer who placed the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  customerId: string;

  @ApiProperty({
    description: 'The customer who placed the order',
  })
  customer?: any;

  @ApiProperty({
    description: 'The items in the order',
  })
  items?: any[];

  @ApiProperty({
    description: 'The total amount of the order',
    example: 99.99,
  })
  total: Decimal;

  @ApiProperty({
    description: 'The date when the order was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from '@prisma/client';

export class FavoriteEntity implements Favorite {
  @ApiProperty({
    description: 'The unique identifier of the favorite',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the customer who favorited the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  customerId: string;

  @ApiProperty({
    description: 'The customer who favorited the product',
  })
  customer?: any;

  @ApiProperty({
    description: 'The ID of the favorited product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @ApiProperty({
    description: 'The favorited product',
  })
  product?: any;

  @ApiProperty({
    description: 'The date when the favorite was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}

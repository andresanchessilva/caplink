import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    description: 'The ID of the cart this item belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  cartId: string;

  @ApiProperty({
    description: 'The ID of the product to add to the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'The quantity of the product to add',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

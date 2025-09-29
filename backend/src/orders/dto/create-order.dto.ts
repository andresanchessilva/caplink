import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the customer placing the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @ApiProperty({
    description: 'The total amount of the order',
    example: 99.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  total: number;
}

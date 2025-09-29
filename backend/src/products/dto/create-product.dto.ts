import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Camiseta', description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 49.99, description: 'Preço do produto' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({
    example: 'Camiseta de algodão',
    description: 'Descrição do produto',
  })
  @IsOptional()
  @MaxLength(300)
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://exemplo.com/imagem.jpg',
    description: 'URL da imagem do produto',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Se o produto está ativo',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 0,
    description: 'Total de unidades vendidas',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalSold?: number;
}

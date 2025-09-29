import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Página atual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Número de itens por página',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total de itens',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Se existe página anterior',
    example: false,
  })
  hasPreviousPage: boolean;

  @ApiProperty({
    description: 'Se existe próxima página',
    example: true,
  })
  hasNextPage: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Lista de itens da página atual',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Metadados da paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StatsService, SellerStats } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { Role } from '@prisma/client';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('seller')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas do vendedor' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas do vendedor obtidas com sucesso',
    schema: {
      type: 'object',
      properties: {
        totalProductsSold: {
          type: 'number',
          description: 'Total de produtos vendidos',
        },
        totalRevenue: {
          type: 'number',
          description: 'Faturamento total',
        },
        totalProductsRegistered: {
          type: 'number',
          description: 'Quantidade de produtos cadastrados',
        },
        bestSellingProduct: {
          type: 'object',
          nullable: true,
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            totalSold: { type: 'number' },
            revenue: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  async getSellerStats(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<SellerStats> {
    return this.statsService.getSellerStats(user.id);
  }
}

import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { Role } from '@prisma/client';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Finalizar compra e criar pedido' })
  @ApiResponse({
    status: 201,
    description: 'Compra finalizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        order: {
          type: 'object',
          description: 'Pedido criado',
        },
        message: {
          type: 'string',
          example: 'Compra finalizada com sucesso!',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Carrinho está vazio' })
  @ApiResponse({ status: 404, description: 'Carrinho não encontrado' })
  async checkout(@CurrentUser() user: AuthenticatedUser) {
    return this.checkoutService.checkout(user.id);
  }
}

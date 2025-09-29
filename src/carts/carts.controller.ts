import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { Role } from '@prisma/client';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({
    status: 201,
    description: 'Cart created successfully',
    type: CartEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Cart already exists for this customer',
  })
  create(
    @Body() createCartDto: CreateCartDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CartEntity> {
    return this.cartsService.create({
      ...createCartDto,
      customerId: user.id,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cart based on user role' })
  @ApiResponse({
    status: 200,
    description: 'Cart or list of carts',
    type: [CartEntity],
  })
  findAll(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CartEntity | CartEntity[]> {
    if (user.role === Role.CUSTOMER) {
      return this.cartsService.findByCustomer(user.id);
    } else {
      return this.cartsService.findAll();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart found', type: CartEntity })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your cart' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CartEntity> {
    return this.cartsService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart updated successfully',
    type: CartEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your cart' })
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CartEntity> {
    return this.cartsService.update(id, updateCartDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a cart by ID' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart removed successfully',
    type: CartEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your cart' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CartEntity> {
    return this.cartsService.remove(id, user.id);
  }

  @Delete('clear')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear all items from user cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart cleared successfully',
    type: CartEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  clearCart(@CurrentUser() user: AuthenticatedUser): Promise<CartEntity> {
    return this.cartsService.clearCart(user.id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemEntity } from './entities/cart-item.entity';

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a product to cart' })
  @ApiResponse({
    status: 201,
    description: 'Product added to cart successfully',
    type: CartItemEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Product quantity updated in cart',
    type: CartItemEntity,
  })
  create(
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemEntity> {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items or items by cart' })
  @ApiQuery({
    name: 'cartId',
    required: false,
    description: 'Filter cart items by cart ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of cart items',
    type: [CartItemEntity],
  })
  findAll(@Query('cartId') cartId?: string): Promise<CartItemEntity[]> {
    if (cartId) {
      return this.cartItemsService.findByCart(cartId);
    }
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart item found',
    type: CartItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  findOne(@Param('id') id: string): Promise<CartItemEntity> {
    return this.cartItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart item' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart item updated successfully',
    type: CartItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItemEntity> {
    return this.cartItemsService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a cart item by ID' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart item removed successfully',
    type: CartItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  remove(@Param('id') id: string): Promise<CartItemEntity> {
    return this.cartItemsService.remove(id);
  }

  @Delete('cart/:cartId/product/:productId')
  @ApiOperation({ summary: 'Remove a cart item by cart and product IDs' })
  @ApiParam({ name: 'cartId', description: 'Cart ID' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart item removed successfully',
    type: CartItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeByCartAndProduct(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ): Promise<CartItemEntity> {
    return this.cartItemsService.removeByCartAndProduct(cartId, productId);
  }
}

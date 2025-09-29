import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemEntity } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItemEntity> {

    const existingCartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: createCartItemDto.cartId,
          productId: createCartItemDto.productId,
        },
      },
    });

    if (existingCartItem) {

      return this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + createCartItemDto.quantity,
        },
        include: {
          cart: true,
          product: true,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: createCartItemDto,
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async findAll(): Promise<CartItemEntity[]> {
    return this.prisma.cartItem.findMany({
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async findOne(id: string): Promise<CartItemEntity> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    return cartItem;
  }

  async findByCart(cartId: string): Promise<CartItemEntity[]> {
    return this.prisma.cartItem.findMany({
      where: { cartId },
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async update(
    id: string,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItemEntity> {
    const cartItem = await this.findOne(id);

    return this.prisma.cartItem.update({
      where: { id },
      data: updateCartItemDto,
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async remove(id: string): Promise<CartItemEntity> {
    const cartItem = await this.findOne(id);

    return this.prisma.cartItem.delete({
      where: { id },
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async removeByCartAndProduct(
    cartId: string,
    productId: string,
  ): Promise<CartItemEntity> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: { id: cartItem.id },
      include: {
        cart: true,
        product: true,
      },
    });
  }
}

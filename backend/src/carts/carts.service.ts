import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { Role } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto): Promise<CartEntity> {

    const existingCart = await this.prisma.cart.findUnique({
      where: { customerId: createCartDto.customerId },
    });

    if (existingCart) {
      throw new ConflictException('Cart already exists for this customer');
    }

    return this.prisma.cart.create({
      data: createCartDto,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<CartEntity[]> {
    return this.prisma.cart.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findOne(id: string, user?: AuthenticatedUser): Promise<CartEntity> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    if (user && user.role === Role.CUSTOMER && cart.customerId !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para ver este carrinho',
      );
    }

    return cart;
  }

  async findByCustomer(customerId: string): Promise<CartEntity> {
    const cart = await this.prisma.cart.findUnique({
      where: { customerId },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException(`Cart for customer ${customerId} not found`);
    }

    return cart;
  }

  async update(
    id: string,
    updateCartDto: UpdateCartDto,
    userId: string,
  ): Promise<CartEntity> {
    const cart = await this.findOne(id);

    if (cart.customerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para editar este carrinho',
      );
    }

    return this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string): Promise<CartEntity> {
    const cart = await this.findOne(id);

    if (cart.customerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir este carrinho',
      );
    }

    return this.prisma.cart.delete({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async clearCart(customerId: string): Promise<CartEntity> {
    const cart = await this.findByCustomer(customerId);

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return this.findOne(cart.id);
  }
}

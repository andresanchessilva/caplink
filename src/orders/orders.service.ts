import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { Role } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.prisma.order.create({
      data: createOrderDto,
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

  async findAll(): Promise<OrderEntity[]> {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, user?: AuthenticatedUser): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
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

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (user) {
      if (user.role === Role.CUSTOMER && order.customerId !== user.id) {
        throw new ForbiddenException(
          'Você não tem permissão para ver este pedido',
        );
      }

      if (user.role === Role.SELLER) {

        const hasSellerProducts = order.items.some(
          (item) => item.product.sellerId === user.id,
        );
        if (!hasSellerProducts) {
          throw new ForbiddenException(
            'Você não tem permissão para ver este pedido',
          );
        }
      }
    }

    return order;
  }

  async findByCustomer(customerId: string): Promise<OrderEntity[]> {
    return this.prisma.order.findMany({
      where: { customerId },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBySeller(sellerId: string): Promise<OrderEntity[]> {
    return this.prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              sellerId: sellerId,
            },
          },
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
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

  async remove(id: string): Promise<OrderEntity> {
    const order = await this.findOne(id);

    return this.prisma.order.delete({
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
}

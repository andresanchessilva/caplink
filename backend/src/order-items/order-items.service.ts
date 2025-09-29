import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemEntity } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItemEntity> {
    return this.prisma.orderItem.create({
      data: createOrderItemDto,
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findAll(): Promise<OrderItemEntity[]> {
    return this.prisma.orderItem.findMany({
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findOne(id: string): Promise<OrderItemEntity> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });

    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    return orderItem;
  }

  async findByOrder(orderId: string): Promise<OrderItemEntity[]> {
    return this.prisma.orderItem.findMany({
      where: { orderId },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItemEntity> {
    const orderItem = await this.findOne(id);

    return this.prisma.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
      include: {
        order: true,
        product: true,
      },
    });
  }

  async remove(id: string): Promise<OrderItemEntity> {
    const orderItem = await this.findOne(id);

    return this.prisma.orderItem.delete({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });
  }
}

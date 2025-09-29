import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { CreateOrderItemDto } from '../order-items/dto/create-order-item.dto';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  async checkout(customerId: string): Promise<any> {

    const cart = await this.prisma.cart.findUnique({
      where: { customerId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Carrinho está vazio');
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price.toNumber() * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        customerId,
        total,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const orderItems = await Promise.all(
      cart.items.map(async (cartItem) => {
        const orderItem = await this.prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
          },
          include: {
            product: true,
          },
        });

        await this.prisma.product.update({
          where: { id: cartItem.productId },
          data: {
            totalSold: {
              increment: cartItem.quantity,
            },
          },
        });

        return orderItem;
      }),
    );

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return {
      order: {
        ...order,
        items: orderItems,
      },
      message: 'Compra finalizada com sucesso!',
    };
  }
}

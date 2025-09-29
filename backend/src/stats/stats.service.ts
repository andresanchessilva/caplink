import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface SellerStats {
  totalProductsSold: number;
  totalRevenue: number;
  totalProductsRegistered: number;
  bestSellingProduct: {
    id: string;
    name: string;
    totalSold: number;
    revenue: number;
  } | null;
}

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getSellerStats(sellerId: string): Promise<SellerStats> {

    const sellerProducts = await this.prisma.product.findMany({
      where: { sellerId },
      include: {
        orderItems: true,
      },
    });

    const totalProductsSold = sellerProducts.reduce(
      (total, product) => total + product.totalSold,
      0,
    );

    const totalRevenue = sellerProducts.reduce((total, product) => {
      const productRevenue = product.orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price.toNumber(),
        0,
      );
      return total + productRevenue;
    }, 0);

    const totalProductsRegistered = sellerProducts.length;

    const bestSellingProduct =
      sellerProducts.length > 0
        ? sellerProducts.reduce(
            (best, product) => {
              const productRevenue = product.orderItems.reduce(
                (sum, item) => sum + item.quantity * item.price.toNumber(),
                0,
              );

              if (product.totalSold > best.totalSold) {
                return {
                  id: product.id,
                  name: product.name,
                  totalSold: product.totalSold,
                  revenue: productRevenue,
                };
              }
              return best;
            },
            {
              id: sellerProducts[0].id,
              name: sellerProducts[0].name,
              totalSold: sellerProducts[0].totalSold,
              revenue: sellerProducts[0].orderItems.reduce(
                (sum, item) => sum + item.quantity * item.price.toNumber(),
                0,
              ),
            },
          )
        : null;

    return {
      totalProductsSold,
      totalRevenue,
      totalProductsRegistered,
      bestSellingProduct,
    };
  }
}

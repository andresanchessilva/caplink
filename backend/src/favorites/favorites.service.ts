import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteEntity } from './entities/favorite.entity';

interface CreateFavoriteData {
  customerId: string;
  productId: string;
}

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createFavoriteData: CreateFavoriteData,
  ): Promise<FavoriteEntity> {

    const existingFavorite = await this.prisma.favorite.findUnique({
      where: {
        customerId_productId: {
          customerId: createFavoriteData.customerId,
          productId: createFavoriteData.productId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Product is already in favorites');
    }

    return this.prisma.favorite.create({
      data: createFavoriteData,
      include: {
        customer: true,
        product: true,
      },
    });
  }

  async findAll(): Promise<FavoriteEntity[]> {
    return this.prisma.favorite.findMany({
      include: {
        customer: true,
        product: true,
      },
    });
  }

  async findOne(id: string, userId?: string): Promise<FavoriteEntity> {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id },
      include: {
        customer: true,
        product: true,
      },
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    if (userId && favorite.customerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este favorito',
      );
    }

    return favorite;
  }

  async findByCustomer(customerId: string): Promise<FavoriteEntity[]> {
    return this.prisma.favorite.findMany({
      where: { customerId },
      include: {
        customer: true,
        product: true,
      },
    });
  }

  async update(
    id: string,
    updateFavoriteDto: UpdateFavoriteDto,
    userId?: string,
  ): Promise<FavoriteEntity> {
    await this.findOne(id, userId);

    return this.prisma.favorite.update({
      where: { id },
      data: updateFavoriteDto,
      include: {
        customer: true,
        product: true,
      },
    });
  }

  async remove(id: string, userId: string): Promise<FavoriteEntity> {
    const favorite = await this.findOne(id);

    if (favorite.customerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para remover este favorito',
      );
    }

    return this.prisma.favorite.delete({
      where: { id },
      include: {
        customer: true,
        product: true,
      },
    });
  }

  async removeByCustomerAndProduct(
    customerId: string,
    productId: string,
  ): Promise<FavoriteEntity> {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.prisma.favorite.delete({
      where: { id: favorite.id },
      include: {
        customer: true,
        product: true,
      },
    });
  }
}

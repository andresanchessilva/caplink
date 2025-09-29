import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto, sellerId: string) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        sellerId,
      },
    });
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<any>> {
    const {
      page = 1,
      limit = 10,
      search,
      minPrice,
      maxPrice,
      isActive,
    } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (isActive !== undefined) {
      where.isActive = isActive;
    } else {
      where.isActive = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          seller: true,
          cartItems: true,
          orderItems: true,
          favorites: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  async findBySeller(
    sellerId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<any>> {
    const {
      page = 1,
      limit = 10,
      search,
      minPrice,
      maxPrice,
      isActive,
    } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {
      sellerId,
    };

    if (isActive !== undefined) {
      where.isActive = isActive;
    } else {
      where.isActive = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          seller: true,
          cartItems: true,
          orderItems: true,
          favorites: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        seller: true,
        cartItems: true,
        orderItems: true,
        favorites: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    if (product.sellerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para editar este produto',
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    if (product.sellerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir este produto',
      );
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}

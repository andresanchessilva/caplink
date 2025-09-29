import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        cart: true,
        customerFavorites: true,
        customerOrders: true,
        sellerProducts: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        cart: true,
        customerFavorites: true,
        customerOrders: true,
        sellerProducts: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {

    return this.prisma.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  hardDelete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

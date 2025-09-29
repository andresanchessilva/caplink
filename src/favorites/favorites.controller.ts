import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a product to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Product added to favorites successfully',
    type: FavoriteEntity,
  })
  @ApiResponse({ status: 409, description: 'Product is already in favorites' })
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.create({
      productId: createFavoriteDto.productId,
      customerId: user.id,
    });
  }

  @Post(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a product to favorites by product ID' })
  @ApiParam({
    name: 'productId',
    description: 'Product ID to add to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Product added to favorites successfully',
    type: FavoriteEntity,
  })
  @ApiResponse({ status: 409, description: 'Product is already in favorites' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  addFavorite(
    @Param('productId') productId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.create({
      customerId: user.id,
      productId,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({
    status: 200,
    description: 'List of user favorites',
    type: [FavoriteEntity],
  })
  findAll(@CurrentUser() user: AuthenticatedUser): Promise<FavoriteEntity[]> {
    return this.favoritesService.findByCustomer(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a favorite by ID' })
  @ApiParam({ name: 'id', description: 'Favorite ID' })
  @ApiResponse({
    status: 200,
    description: 'Favorite found',
    type: FavoriteEntity,
  })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your favorite' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.findOne(id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a favorite' })
  @ApiParam({ name: 'id', description: 'Favorite ID' })
  @ApiResponse({
    status: 200,
    description: 'Favorite updated successfully',
    type: FavoriteEntity,
  })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your favorite' })
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.update(id, updateFavoriteDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a favorite by ID' })
  @ApiParam({ name: 'id', description: 'Favorite ID' })
  @ApiResponse({
    status: 200,
    description: 'Favorite removed successfully',
    type: FavoriteEntity,
  })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.remove(id, user.id);
  }

  @Delete('product/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a favorite by product ID' })
  @ApiParam({
    name: 'productId',
    description: 'Product ID to remove from favorites',
  })
  @ApiResponse({
    status: 200,
    description: 'Favorite removed successfully',
    type: FavoriteEntity,
  })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  removeFavorite(
    @Param('productId') productId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.removeByCustomerAndProduct(user.id, productId);
  }
}

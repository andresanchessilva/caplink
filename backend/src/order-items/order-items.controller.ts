import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemEntity } from './entities/order-item.entity';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a product to an order' })
  @ApiResponse({
    status: 201,
    description: 'Product added to order successfully',
    type: OrderItemEntity,
  })
  create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItemEntity> {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order items or items by order' })
  @ApiQuery({
    name: 'orderId',
    required: false,
    description: 'Filter order items by order ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of order items',
    type: [OrderItemEntity],
  })
  findAll(@Query('orderId') orderId?: string): Promise<OrderItemEntity[]> {
    if (orderId) {
      return this.orderItemsService.findByOrder(orderId);
    }
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order item ID' })
  @ApiResponse({
    status: 200,
    description: 'Order item found',
    type: OrderItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  findOne(@Param('id') id: string): Promise<OrderItemEntity> {
    return this.orderItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order item' })
  @ApiParam({ name: 'id', description: 'Order item ID' })
  @ApiResponse({
    status: 200,
    description: 'Order item updated successfully',
    type: OrderItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItemEntity> {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order item ID' })
  @ApiResponse({
    status: 200,
    description: 'Order item removed successfully',
    type: OrderItemEntity,
  })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  remove(@Param('id') id: string): Promise<OrderItemEntity> {
    return this.orderItemsService.remove(id);
  }
}

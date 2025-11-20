import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';
import { CreateOrderDto, CreateOrderResponseDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UserThrottlerGuard } from 'src/auth/guards/user-throttler.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, UserThrottlerGuard)
  @Post()
  createOrder(
    @Request() req: AuthenticatedRequest,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    return this.ordersService.createOrder(req.user.id, createOrderDto);
  }
}

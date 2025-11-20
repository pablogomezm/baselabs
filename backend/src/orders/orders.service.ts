import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto, CreateOrderResponseDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    console.log(userId);
    console.log(createOrderDto);
    const { sku, quantity } = createOrderDto;

    const product = await this.prisma.product.findUnique({
      where: { sku },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (quantity > product.stock) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${product.stock}`,
      );
    }

    const order = await this.prisma.$transaction(async (prisma) => {
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: { decrement: quantity } },
      });

      await prisma.userProduct.upsert({
        where: {
          userId_productId: {
            userId,
            productId: product.id,
          },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          userId,
          productId: product.id,
          quantity,
        },
      });

      const order = prisma.order.create({
        data: {
          userId,
          productId: product.id,
          quantity,
          totalPrice: product.price * quantity,
        },
      });
      return order;
    });

    return {
      orderNumber: order.orderNumber,
      sku,
      quantity,
      totalPrice: order.totalPrice,
    };
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserProduct } from 'prisma-client';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    console.log(userId);
    console.log(createOrderDto);
    const { sku, quantity } = createOrderDto;

    const product = await this.prismaService.product.findUnique({
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

    const userProduct: UserProduct = await this.prismaService.$transaction(
      async (prisma) => {
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: { decrement: quantity } },
        });

        const txUserProduct = await prisma.userProduct.upsert({
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
          include: {
            product: true,
          },
        });
        return txUserProduct;
      },
    );

    return userProduct;
  }
}

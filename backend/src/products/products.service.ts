import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductInfoDto } from './dto/product-stock.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProductInfo(sku: string): Promise<ProductInfoDto> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
      select: {
        sku: true,
        name: true,
        stock: true,
        price: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}

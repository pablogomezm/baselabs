import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'prisma-client';
import { PrismaService } from 'src/prisma.service';
import { ProductStockDto } from './dto/product-stock.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getStock(sku: string): Promise<ProductStockDto> {
    const product: Product | null = await this.prismaService.product.findUnique(
      {
        where: { sku },
      },
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      sku: product.sku,
      stock: product.stock,
    };
  }
}

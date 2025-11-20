import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductInfoDto } from './dto/product-stock.dto';
import { MyProductsDto } from './dto/my-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getProductInfo(sku: string): Promise<ProductInfoDto> {
    const product = await this.prismaService.product.findUnique({
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

  async myProducts(userId: string): Promise<MyProductsDto[]> {
    const userProducts = await this.prismaService.userProduct.findMany({
      where: { userId },
      select: {
        quantity: true,
        product: {
          select: {
            sku: true,
            name: true,
          },
        },
      },
    });

    const mappedUserProducts = userProducts.map((userProduct) => ({
      sku: userProduct.product.sku,
      name: userProduct.product.name,
      quantity: userProduct.quantity,
    }));
    return mappedUserProducts;
  }
}

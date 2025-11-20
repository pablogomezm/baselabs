import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductInfoDto } from './dto/product-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get(':sku')
  getProductInfo(@Param('sku') sku: string): Promise<ProductInfoDto> {
    return this.productService.getProductInfo(sku);
  }
}

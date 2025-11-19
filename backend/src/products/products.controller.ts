import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductStockDto } from './dto/product-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('stock/:sku')
  getStock(@Param('sku') sku: string): Promise<ProductStockDto> {
    return this.productService.getStock(sku);
  }
}

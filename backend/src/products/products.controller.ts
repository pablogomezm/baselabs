import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductStockDto } from './dto/product-stock.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';
import { MyProductsDto } from './dto/my-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('stock/:sku')
  getStock(@Param('sku') sku: string): Promise<ProductStockDto> {
    return this.productService.getStock(sku);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-products')
  myProducts(@Request() req: AuthenticatedRequest): Promise<MyProductsDto[]> {
    return this.productService.myProducts(req.user.id);
  }
}

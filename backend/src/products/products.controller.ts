import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductInfoDto } from './dto/product-stock.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';
import { MyProductsDto } from './dto/my-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-products')
  myProducts(@Request() req: AuthenticatedRequest): Promise<MyProductsDto[]> {
    return this.productService.myProducts(req.user.id);
  }

  @Get(':sku')
  getProductInfo(@Param('sku') sku: string): Promise<ProductInfoDto> {
    return this.productService.getProductInfo(sku);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import e from 'express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProductDto } from './DTO/product.create.dto';
import { ProductFilterDto } from './DTO/product.filter.dto';
import { UpdateProductDto } from './DTO/product.update.dto';
import { LoggerInterceptor } from './Interceptor/logger.interceptor';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get()
  @UseInterceptors(new LoggerInterceptor())
  getProducts(@Query() filterDto: ProductFilterDto): Promise<Product[]> {
    return this.productsService.getAllProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    if (user.role === 'SELLER') {
      return this.productsService.createProduct(createProductDto);
    } else {
      throw new BadRequestException(`Option not available for Buyers`);
    }
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    if (user.role === 'SELLER') {
      return this.productsService.updateProductById(id, updateProductDto);
    } else {
      throw new BadRequestException(`Option not available for Buyers`);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProductById(@Param('id') id: string, @GetUser() user: User) {
    if (user.role === 'SELLER') {
      return this.productsService.deleteProductById(id);
    } else {
      throw new BadRequestException(`Option not available for Buyers`);
    }
  }
}

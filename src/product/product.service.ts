import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductFilterDto } from './DTO/product.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './DTO/product.create.dto';
import { UpdateProductDto } from './DTO/product.update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  getAllProducts(filterDto: ProductFilterDto): Promise<Product[]> {
    return this.productRepository.getProducts(filterDto);
  }

  async getProductById(id: string): Promise<Product> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return found;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.createProduct(
      createProductDto,
    );
    return product;
  }

  async updateProductById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const found = await this.getProductById(id);

    return this.productRepository.updateProduct(found, updateProductDto);
  }

  async deleteProductById(id: string) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Product with id ${id} not found!!`);
    }
  }
}

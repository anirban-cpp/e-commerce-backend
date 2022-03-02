import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './DTO/product.create.dto';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';
import { ProductStatus } from './product.model';
import { ProductFilterDto } from './DTO/product.filter.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateProductDto } from './DTO/product.update.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, category, price } = createProductDto;
    const NewProduct = {
      id: uuid(),
      name,
      category,
      price,
      status: ProductStatus.AVAILABLE,
    };

    await this.save(NewProduct);
    return NewProduct;
  }

  async getProducts(filterDto: ProductFilterDto): Promise<Product[]> {
    const { category, price_start, price_end, status } = filterDto;

    const query = this.createQueryBuilder('product');

    if (category) {
      query.andWhere('product.category = :category', { category: category });
    }

    if (status) {
      query.andWhere('product.status = :status', { status: status });
    }

    if (price_start) {
      if (price_end) {
        query.andWhere(
          'product.price ::DECIMAL >= :price_start AND product.price ::DECIMAL <= :price_end',
          { price_start: price_start, price_end: price_end },
        );
      } else {
        throw new BadRequestException(
          `Price filter needs to have a range. Either provide only max price or provide a range`,
        );
      }
    }

    if (!price_start && price_end) {
      query.andWhere('product.price ::DECIMAL <= :price_end', {
        price_end: price_end,
      });
    }

    const products = await query.getMany();
    return products;
  }

  async updateProduct(
    product: Product,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, category, price, status } = updateProductDto;

    if (name) {
      product.name = name;
    }

    if (category) {
      product.category = category;
    }

    if (price) {
      product.price = price;
    }

    if (status) {
      product.status = status;
    }

    await this.save(product);

    return product;
  }
}

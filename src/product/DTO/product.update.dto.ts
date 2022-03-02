import {
  IsNotEmpty,
  IsNumberString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ProductStatus } from '../product.model';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  category: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  price: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  status: ProductStatus;
}

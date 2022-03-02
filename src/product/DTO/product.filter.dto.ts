import { ProductStatus } from '../product.model';
import { IsOptional, IsString, IsEnum, IsNumberString } from 'class-validator';

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumberString()
  price_start: string;

  @IsOptional()
  @IsNumberString()
  price_end: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}

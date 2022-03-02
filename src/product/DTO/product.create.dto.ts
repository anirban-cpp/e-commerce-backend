import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNumberString()
  price: string
}

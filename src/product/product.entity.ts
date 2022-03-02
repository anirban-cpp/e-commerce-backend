import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProductStatus } from './product.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  category: string;
  @Column()
  price: string;
  @Column()
  status: ProductStatus;
}

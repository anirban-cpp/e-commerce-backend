export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  status: ProductStatus;
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  FEW_LEFT = 'FEW_LEFT',
  SOLD = 'SOLD',
}

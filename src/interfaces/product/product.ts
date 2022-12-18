// Interfaces para el producto

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  inventary: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCreate = Omit<
  Product,
  "id" | "slug" | "createdAt" | "updatedAt"
>;

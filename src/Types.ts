export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
}

export type Token = string;

export interface Product {
  name: string;
  slug: string;
  price: number;
  inventary: number;
  description: string;
}

/*
 * type to: ./components/Icons/*
*/
export type IconType = {
  size: number;
  action: Function;
}

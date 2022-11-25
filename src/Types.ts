import {Context} from "server/trpc/context";
import {ZodType, ZodTypeAny} from "zod";

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

/*
 * types to Form
*/

export type SetInputForm = (name: string, value: string | number) => any;

export type InputForm = {
  label?: string; 
  name: string;
  value: string;
  statusForm: number;
  placeholder?: string;
  setInputForm: SetInputForm;
  validation: ZodType;
  alert: string;
}

export interface UseInputParamsHook {
  name: string;
  value: string | number;
  statusForm: number;
  setInputForm: SetInputForm;
  validation: ZodTypeAny;
}

export type QueryParams = {
  ctx: Context;
}

export type QueryErrorResponse = {
  error: boolean;
  message: string;
  data: any;
}

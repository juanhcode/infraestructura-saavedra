import { Product } from '../../product/interfaces/intergace';
export interface Supplier{
id : number;
name?:string;
adress?: string;
phoneNumber?:number;
products:Product[];
}

export interface SupplierResponse {
  ok: boolean
  msg?:string
  obj?: Supplier
}

export interface SuppliersResponse {
  ok: boolean,
  list?: Supplier[],
  msg?:string
}

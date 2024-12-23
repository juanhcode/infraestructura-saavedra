import { Customer } from '../../customer/interfaces/interface';
import { Product } from '../../product/interfaces/intergace';
export  interface Detail_Sale{
  id?:number;
  amount?:number;
  price?:number;
  Product?:Product;
}


export interface Sale{
  id?:number;
  name?: string;
  state?:string;
  createdAt?: Date;
  details?: Detail_Sale[]
  customer?: Customer | null;
  total_price:number
 }

 export interface SaleResponse{
   ok:boolean,
   obj?:Sale,
   msg?:string
 }

 export interface SalesResponse{
   ok:boolean,
   list?:Sale[],
   msg?:string
 }



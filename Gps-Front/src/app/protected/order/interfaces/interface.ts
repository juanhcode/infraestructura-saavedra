import { Customer } from "../../admin/customer/interfaces/interface";
import { Product } from "../../admin/product/interfaces/intergace";

export  interface Detail_Order{
  id?:number;
  amount?:number;
  price?:number;
  Product?:Product;
  Order?:Order
}


export interface Order{
  id?:number;
  name?: string;
  state?:string;
  createdAt?: Date;
  details?: Detail_Order[]
  Customer?: Customer ;
  total_price:number
 }

export interface OrderResponse{
  ok:boolean,
  obj?:Order,
  msg?:string
}


export interface OrdersResponse{
  ok:boolean,
  list?:Order[],
  msg?:string
}
export interface DetailsOrdersCountResponse{
  ok:boolean;
  count?:number;
  rows?: Detail_Order[];
  msg?:string;

}

export interface OrdersCountResponse{
  ok:boolean,
  count?:number,
  msg?:string

}

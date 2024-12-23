import { Employee } from '../../admin/employee/interfaces/interface';
import { Product } from '../../admin/product/interfaces/intergace';
import { Expense } from '../../admin/expense/interfaces/interface';

export  interface Detail_Manufacture_process{
  amount?:number;
  category?:string;
  nameProduct?:string;
  amountLost?:number | null;
  detailsManufactures?:Detail_Manufacture[]
}

export interface Detail_Manufacture{
  id?:number;
  amount?:number;
  amountLost?:number | null;
  amountAvalaible?:number;
  category?:string;
  Expense?:Expense;
  Product?:Product;
}

export interface Product_Avalaible{
  idProduct?:number;
  idDetailExpense?:number;
  nameExpense?:string;
  date?:Date;
  idExpense?:string;
  name?:string;
  amountAvalaible?:number
}

export interface Manufacture{
  id?:number;
  name?: string;
  description?:string;
  createdAt?: Date;
  details?: Detail_Manufacture[]
  employee?: Employee | null;
 }

 export interface ProductsExpenseAvalaibleResponse{
  ok:boolean;
  list?:Product_Avalaible[];
  msg?:string;
}

 export interface ManufactureResponse{
  ok:boolean,
  obj?:Manufacture,
  msg?:string
}

export interface ManufacturesResponse{
  ok:boolean,
  list?:Manufacture[],
  msg?:string
}

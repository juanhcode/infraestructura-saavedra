import { Product } from "../../product/interfaces/intergace";

export  interface Detail_Expense{
  id?:number;
  amount?:number;
  price?:number;
  use?:string;
  Product?:Product;

}
export interface Expense{
  id?:number | null;
  name?:string;
  total_price?:number;
  state?:string;
  createdAt?:Date;
  editExpense?:boolean;
  details?: Detail_Expense[];
}


export interface ExpenseResponse{
  ok:boolean,
  obj?:Expense,
  msg?:string
}

export interface ExpensesResponse{
  ok:boolean,
  list?:Expense[]
}

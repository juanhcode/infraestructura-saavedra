
export interface TotalSalesForMonths{
  month?: string;
  totalSales?:number;
}

export interface TotalProffistAndLoss{
  month?:string;
  proffits?:number;
  loss?:number;
}
export interface TotalSalesPerProduct{
  name?:string;
  totalSales?:number;
  month?:string;
}


export interface TotalProffistAndLossResponse{
  ok:boolean;
  list:TotalProffistAndLoss[];
}
export interface TotalSalesForMonthsResponse{
  ok?:boolean;
  list?:TotalSalesForMonths[]
}
  export interface TotalProductResponse{
    ok?:boolean;
    list?:TotalSalesPerProduct[]

}

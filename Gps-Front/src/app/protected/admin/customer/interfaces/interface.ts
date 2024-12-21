export interface Customer{
 id?:number,
 name?: string,
 surname?:string,
 adress?: string,
 phoneNumber?:number
}

export interface CustomerResponse{
  ok:boolean,
  obj?:Customer,
  msg?:string
}

export interface CustomersResponse{
  ok:boolean,
  list?:Customer[],
  msg?:string
}



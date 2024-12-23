
export interface Employee{
 id?:number;
 name?:string;
 surname?:string;
 phoneNumber ?:number;
 adress?:string;
 email ?:string;
 password ?:string;
 image?:string;
}

export interface EmployeeResponse {
  ok: boolean;
  msg?:string;
  obj?: Employee;
}

export interface EmployeesResponse {
  ok: boolean;
  list?: Employee[];
  msg?: string
}


import { AbstractControl, FormGroup } from '@angular/forms';
import { Supplier } from '../../supplier/interface/interface';
export interface Product {
  id?: number;
  name?: string;
  description?: string | null;
  amount?: number;
  price?: number;
  alterImg?: string | null;
  image?: string | null;
  images?: string;
  idCategory ?:number;
  amountMaked?:number;
  Supplier?: Supplier | null
}

export interface ProductFormControl extends FormGroup {
  value: Product;
  controls: {
    id:AbstractControl
    name: AbstractControl;
    description: AbstractControl;
    amount: AbstractControl;
    price: AbstractControl;
    alterImg: AbstractControl;
  }
}

export interface ProductResponse {
  ok: boolean
  msg?:string
  obj?: Product
}

export interface ProductsResponse {
  ok: boolean,
  list?: Product[],
  msg?:string
}



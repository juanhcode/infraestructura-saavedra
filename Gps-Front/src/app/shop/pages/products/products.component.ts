import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductService } from 'src/app/protected/admin/product/services/product.service';
import { Product } from '../../../protected/admin/product/interfaces/intergace';
import { environment } from 'src/environments/environment.prod';
import { MainClass } from '../../../../classes/mainClass';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls:['../../css/style.css']
})
export class ProductsComponent implements OnInit{
  @Input() btnShowMoreProducts:boolean = false;
  @Input() titleComponent:string= 'Productos';
  @Input() amountComponentsShow!:number;
  mainClass:MainClass= new MainClass();
  urlImage:string = environment.baseURLIMG;
  products:Product[] =[]
  product: Product | undefined;

  constructor(private authService: AuthService,private router:Router,private productService:ProductService) {

  }
  get user() {
    return this.authService.user;
  }


  ngOnInit(): void {
    this.productService.findProducts('').subscribe(
      (res)=>{
        if(res.ok===true){
        for (const product of res.list!) {
          this.product = {id:product.id,name:product.name,price:product.price,image:`${this.urlImage}/${this.mainClass.deleteDiatricos(product.name!)}/${product.image}`}
          this.products.push(this.product);
        }
          if(!this.amountComponentsShow){
            this.amountComponentsShow= this.products.length;
          }
        }
      }
    );

  }

  navigateUrlProducts(){
    if(Object.keys(this.user).length !== 0){
      this.router.navigateByUrl(`${this.user.rol}/productos`);
    }else{
      this.router.navigateByUrl(`productos`);
    }
  }
  navigateUrl(url: string,numero:number) {
    let productName = this.mainClass.changeSignImage(url);
    if(Object.keys(this.user).length !== 0){
      this.router.navigate([`/${this.user.rol}/producto/${productName}`],{queryParams: {numero}});
    }else{
      this.router.navigate([`/producto/${productName}`],{queryParams: { numero}});
    }
  }
}

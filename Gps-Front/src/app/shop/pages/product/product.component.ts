import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/protected/admin/product/services/product.service';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../../../protected/admin/product/interfaces/intergace';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OrderService } from 'src/app/protected/order/services/order.service';
import Swal from 'sweetalert2';
import { MainClass } from '../../../../classes/mainClass';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls:['../../css/style.css']
})
export class ProductComponent implements OnInit{
 amountProduct:number=0;
 product:Product | undefined = undefined;
 imagePrincipal!:string;
 mainClass:MainClass= new MainClass();
 imageUrl:string= environment.baseURLIMG;
 imagesSelected: string[] = [];
 id:number=0;
 name: string = this.activatedRoute.snapshot.paramMap.get('name') ?? '';
 constructor(private productService:ProductService,private orderService:OrderService,private authService:AuthService, private activatedRoute: ActivatedRoute,private router:Router){
 }
  ngOnInit(): void {
    const nameProduct =this.mainClass.changeSignName(this.name);

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['numero']){
         this.id= params['numero'];
      }
    });
    this.productService.findProduct(String(this.id),true).subscribe(product=>{
      if(product.ok===true){
        this.product =  {...product.obj};
        if(product.obj?.name  && product.obj?.images){
          const urlImage = `${this.imageUrl}/${this.mainClass.deleteDiatricos(product.obj.name)}`;
          const singleImageUrl = `${urlImage}/${product.obj.image}`;
          this.imagePrincipal = singleImageUrl;
          this.imagesSelected.push(singleImageUrl);
          const images = product.obj?.images.split(',');
          images.forEach(element =>{
            this.imagesSelected.push(`${urlImage}/${element}`);
          })
        }
      }
    })

  }


addCart(){
  if(Object.keys(this.authService.user).length !== 0){
    if(this.amountProduct < 1){
      Swal.fire('Error','Debes escoger un valor mayor a 0.','error');
      return;
    }else{
      if(this.orderService.order === undefined){
        const total_price = this.amountProduct * this.product?.price!;
        this.orderService.createOrder(total_price,[{amount:this.amountProduct,price:total_price,Product:{id:this.product?.id}}],Number(this.authService.user.uid!)).subscribe(
          resp=>{
            if(resp.ok === true){
              this.amountProduct= 0;
              Swal.fire('Agregado','El producto ha sido agregado al carrito de compras.','success');
            }
          }
        )
      }else{
        const price = this.amountProduct * this.product?.price!;
        this.orderService.updateDetailsOrder([{amount:this.amountProduct,price:price,Product:{id:this.product?.id}}]).subscribe(
          resp=>{
            if(resp.ok === true){
              this.amountProduct= 0;
              Swal.fire('Agregado','El producto ha sido agregado al carrito de compras.','success');
            }
          }
        )
      }
    }
  }else{
    this.router.navigateByUrl('auth/login');
  }
}
 getProduct(event:any){
  this.imagePrincipal = event.target.src;
 }
}

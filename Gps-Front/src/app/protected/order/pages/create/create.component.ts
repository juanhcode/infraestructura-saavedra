import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from '../../interfaces/interface';
import { Detail_Order } from 'src/app/protected/order/interfaces/interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from 'src/app/protected/order/services/order.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { SaleService } from 'src/app/protected/admin/sale/services/sale.service';
import { Detail_Sale } from '../../../admin/sale/interfaces/interface';
import { MainClass } from 'src/classes/mainClass';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../admin/css/style.css']
})
export class CreateComponent implements OnInit {
  viewName!: string;
  urlImage: string = environment.baseURLIMG;
  showCustomer!: boolean;
  mainClass:MainClass =new MainClass();
  order: Order | undefined = undefined;
  details_sale: Detail_Sale[] = [];
  details_Order: Detail_Order[] = [];
  miFormulario: FormGroup = this.fb.group({
    id: { value: '' },
    idCustomer: { value: '' },
    total_price: { value: '', disabled: true },
    date: { value: '', disabled: true },
    nameCustomer: { value: '', disabled: true },
    adressCustomer: { value: '', disabled: true },
    phoneNumberCustomer: { value: '', disabled: true }

  })
  constructor(private fb: FormBuilder, private saleService: SaleService, private orderService: OrderService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  downloadImage() {
    const link = document.createElement('a');
    link.href = 'assets/comprobante_img.jpg';
    link.download = 'comprobante_img.jpg';
    link.click();
  }

  confirmReceipt(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Estás seguro de confirmar este comprobante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(  '¡Confirmado!', 'El comprobante ha sido confirmado.', 'success');
      }
    });

  }

  ngOnInit() {
    this.showCustomer = this.authService.user.rol! === 'cliente' ? false : true;
    if (this.router.url.includes('ver')) {
      this.viewName = 'view'
      this.activatedRoute.params.pipe(switchMap(({ id }) => this.saleService.findSale(id)))
        .subscribe((order) => {
          this.miFormulario.get('id')?.setValue(order.obj?.id);
          this.miFormulario.get('total_price')?.setValue(order.obj?.total_price);
          this.miFormulario.get('date')?.setValue(order.obj?.createdAt);
          for (const detail of order.obj?.details!) {
            this.details_Order.push({ id: detail.id, price: detail.price, amount: detail.amount, Product: { id: detail.Product?.id, name: detail.Product?.name, image: `${this.urlImage}/${this.mainClass.deleteDiatricos(detail.Product?.name!)}/${detail.Product?.image}` } })
          }
        });
    } else if (this.router.url.includes('editar')) {
      this.viewName = 'update'
      this.activatedRoute.params.pipe(switchMap(({ id }) => this.orderService.findOrder(id)))
        .subscribe((order) => {
          this.miFormulario.get('id')?.setValue(order.obj?.id);
          this.miFormulario.get('idCustomer')?.setValue(order.obj?.Customer?.id);
          this.miFormulario.get('total_price')?.setValue(order.obj?.total_price);
          this.miFormulario.get('date')?.setValue(order.obj?.createdAt);
          this.miFormulario.get('nameCustomer')?.setValue(`${order.obj?.Customer?.name} ${order.obj?.Customer?.surname}`);
          this.miFormulario.get('adressCustomer')?.setValue(order.obj?.Customer?.adress);
          this.miFormulario.get('phoneNumberCustomer')?.setValue(order.obj?.Customer?.phoneNumber);
          for (const detail of order.obj?.details!) {
            this.details_Order.push({ id: detail.id, price: detail.price, amount: detail.amount, Product: { id: detail.Product?.id, name: detail.Product?.name, image: `${this.urlImage}/${this.mainClass.deleteDiatricos(detail.Product?.name!)}/${detail.Product?.image}` } })
          }
        });
    }
  }

  save() {
    this.details_Order.forEach(element => {
      this.details_sale.push({ amount: element.amount, price: element.price, Product: element.Product })
    })

    this.orderService.deleteOrder(this.miFormulario.get('id')?.value).subscribe(
      (resp) => {
        if (resp.ok === true) {
          this.saleService.createSale(Number(this.miFormulario.get('idCustomer')?.value), this.details_Order, 'Pagado', Number(this.miFormulario.get('total_price')?.value), true).subscribe(
            (resp) => {
              if (resp.ok === true) {
                Swal.fire('Confirmado', 'El pedido ha sido confirmado', 'success');
                this.router.navigateByUrl('administrador/pedidos');
              }
            });
        }
      }
    )
  }



  cancel() {
    this.router.navigateByUrl('administrador/pedidos');
  }
}

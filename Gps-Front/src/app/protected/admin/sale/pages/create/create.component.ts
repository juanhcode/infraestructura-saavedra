import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../customer/services/customer.service';
import { Customer } from '../../../customer/interfaces/interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Product } from '../../../product/interfaces/intergace';
import { ProductService } from '../../../product/services/product.service';
import { Detail_Sale } from '../../interfaces/interface';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { switchMap } from 'rxjs';
import { showButtons } from 'src/app/Components/interface';
import { MainClass } from 'src/classes/mainClass';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../css/style.css']
})
export class CreateComponent implements OnInit {

  details_sale: Detail_Sale[] = [];
  detail_sale?: Detail_Sale;
  pageSizeOptions = [3, 5];
  urlSale:string ='';
  mainClass:MainClass = new MainClass();
  showButtonTable:showButtons = {updateButton:true,deleteButton:true,viewButton:true};
  editProduct: boolean = false;
  showComponents: boolean = true;
  states: string[] = ['Pendiente', 'Pagado']
  viewName: string = "";
  customers: Customer[] = [];
  products: Product[] = [];
  dataSource = new MatTableDataSource<Detail_Sale>;
  productSelected: Product | undefined;
  customerSelected: Customer | undefined;
  listHeaderTableDetailSales = ['Nombre producto', 'Cantidad', 'Precio', 'Acciones'];
  propertyDetailSales = ['Product.name', 'amount', 'price', 'actions'];
  miFormulario: FormGroup = this.fb.group({
    idSale: [],
    nameCustomer: [''],
    adressCustomer: [{value:'',disabled:true}],
    phoneNumberCustomer: [{value:'',disabled:true}],
    nameProduct: ['',Validators.required],
    idProduct: [{value:'',disabled:true}],
    priceProduct: [{value:'',disabled:true}],
    amountProduct: ['', [Validators.required,Validators.pattern("^[0-9]+$")]],
    stateSale: ['', [Validators.required]],
    date: [],
    total_price: [{value:0,disabled:true}]

  });

  constructor(private fb: FormBuilder, private serviceSale: SaleService, private serviceCustomer: CustomerService,
    private serviceProduct: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    if(this.router.url.includes('pendientes')){
      this.urlSale = 'pendientes'
    }else{
      this.urlSale = "todas"
    }

    if (this.router.url.includes('crear')) {
      let date = new Date();
      this.miFormulario.get('date')?.setValue(this.dateFormat(date));
      this.miFormulario.get('date')?.disable();
      this.viewName = "create"
      this.dataSource.data = []
      return;
    }
    else if (this.router.url.includes('ver')) {
      this.viewName = "view"
      this.miFormulario.disable();
      this.showButtonTable =  {updateButton:false,deleteButton:false,viewButton:true};;
      this.showComponents = false;
    } else {
      this.viewName = "update"
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.serviceSale.findSale(id)))
      .subscribe((sale) => {
        if (sale.ok) {
          if (sale.obj?.customer) {
            this.customerSelected = sale.obj.customer;
            this.miFormulario.get('nameCustomer')?.setValue(`${sale.obj.customer.name} ${sale.obj.customer.surname}`);
            this.miFormulario.get('adressCustomer')?.setValue(sale.obj.customer.adress);
            this.miFormulario.get('phoneNumberCustomer')?.setValue(sale.obj.customer.phoneNumber);
          }
          this.details_sale = sale.obj?.details || [];
          this.miFormulario.get('idSale')?.setValue(sale.obj?.id);
          this.miFormulario.get('date')?.setValue(sale.obj?.createdAt);
          this.miFormulario.get('total_price')?.setValue(sale.obj?.total_price);
          this.miFormulario.get('stateSale')?.setValue(sale.obj?.state);
          this.dataSource.data = this.details_sale;

        }
      });
  }

  searchingCustomer() {
    this.serviceCustomer.findCustomers(this.miFormulario.get('nameCustomer')?.value.trim()).subscribe(customers => this.customers = customers.list ?? [])
    if (this.miFormulario.get('nameCustomer')?.value.trim() == '') {
      this.miFormulario.get('adressCustomer')?.reset('');
      this.miFormulario.get('phoneNumberCustomer')?.reset('');
      this.customerSelected = undefined;
    }
  }



  searchingProduct() {
    this.serviceProduct.findProducts(this.miFormulario.get('nameProduct')?.value.trim()).subscribe(products => this.products = products.list ?? [])
    if (this.miFormulario.get('nameProduct')?.value.trim() == '') {
      this.miFormulario.get('idProduct')?.reset('');
      this.miFormulario.get('priceProduct')?.reset('');
      this.productSelected = undefined;
    }
  }

  optionSelectedCustomer(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.customerSelected = undefined;
      return;
    }
    const customer: Customer = event.option.value;
    this.miFormulario.get('nameCustomer')?.setValue(customer.name);
    this.miFormulario.get('adressCustomer')?.setValue(customer.adress);
    this.miFormulario.get('phoneNumberCustomer')?.setValue(customer.phoneNumber);
    this.customerSelected = customer;

  }


  optionSelectedProduct(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.productSelected = undefined;
      return;
    }
    const product: Product = event.option.value;
    this.miFormulario.get('nameProduct')?.setValue(product.name);
    this.productSelected = product;
    this.miFormulario.get('idProduct')?.setValue(product.id);
    this.miFormulario.get('priceProduct')?.setValue(product.price);
  }

  updateProduct() {
    const index = this.details_sale.findIndex(detail => detail.Product?.id === this.detail_sale?.Product?.id);
    if (this.productSelected && this.miFormulario.get('amountProduct')?.value !== '') {
      if (index !== -1) {
        this.details_sale[index].price = this.miFormulario.get('amountProduct')?.value * this.productSelected.price!;
        this.details_sale[index].amount = this.miFormulario.get('amountProduct')?.value;
        this.details_sale[index].Product = this.productSelected;
        this.resetFieldsProduct();
        this.dataSource.data = this.details_sale;
        this.getTotalPrice();
        this.miFormulario.get('nameProduct')?.enable();
        Swal.fire('Actualización', 'El producto ha sido Editado.', 'success');
      }
    }

  }

  addProduct() {
    if (this.productSelected && this.miFormulario.get('amountProduct')?.value !== '') {
      const index = this.details_sale.findIndex(detail => detail.Product?.name === this.productSelected?.name);
      if (index === -1) {
        this.detail_sale = { price: this.miFormulario.get('amountProduct')?.value * this.productSelected.price!, amount: this.miFormulario.get('amountProduct')?.value, Product: this.productSelected }
        this.details_sale.push({ ...this.detail_sale });
        this.resetFieldsProduct();
        this.dataSource.data = this.details_sale;
        this.getTotalPrice();
        Swal.fire('Guardar', 'El producto ha sido Agregado.', 'success');
      } else {
        this.resetFieldsProduct();
        Swal.fire('Error', 'El producto ya ha sido agreagdo.', 'error');
      }
    } else {
      Swal.fire('Error', 'Debes seleccionar un producto y agregar su cantidad.', 'error');
    }

  }



  actionDetailSale(obj: any) {
    if (obj.event !== 'eliminar') {
      if(obj.event !=="ver"){
        this.editProduct = true;
        this.miFormulario.get('nameProduct')?.disable();
      }
      this.productSelected = obj.element.Product;
      this.detail_sale = obj.element;
      this.miFormulario.get('nameProduct')?.setValue(obj.element.Product.name);
      this.miFormulario.get('idProduct')?.setValue(obj.element.Product.id);
      this.miFormulario.get('priceProduct')?.setValue(obj.element.Product.price);
      this.miFormulario.get('amountProduct')?.setValue(obj.element.amount);
    } else {
      Swal.fire({
        title: 'Desea eliminar el producto?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.details_sale.findIndex(detail_product => detail_product.Product?.name === obj.element.Product.name);
          this.details_sale.splice(index, 1);
          Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
        } else if (result.isDenied) {
          Swal.fire('Atento', 'Los cambios no han sido sido guardados.', 'info')
        }
        this.dataSource.data = this.details_sale;
        this.getTotalPrice();
      });
    }
  }

  save() {
    if (this.miFormulario.get('stateSale')?.valid && this.details_sale.length > 0) {
      const { stateSale } = this.miFormulario.value;
      const idCustomer = this.customerSelected?.id ?? null;
      if (this.viewName === 'create') {
        this.serviceSale.createSale(idCustomer, this.details_sale, stateSale, this.miFormulario.get('total_price')?.value,false).subscribe((saleSuccess) => {
          if (saleSuccess.ok) {
            Swal.fire('Guardado', saleSuccess.msg, 'success');
            this.router.navigateByUrl(`administrador/venta/${this.urlSale}`);
          } else {
            Swal.fire('Error', saleSuccess.msg, 'error');
          }
        }
        );
      } else {
        const dateUpdate = new Date(Date.parse(this.miFormulario.get('date')?.value));
        if (this.isValidDate(dateUpdate)) {
          this.serviceSale.updateSale(this.miFormulario.get('idSale')?.value, idCustomer, this.details_sale, stateSale, this.miFormulario.get('total_price')?.value, dateUpdate)
            .subscribe(saleSuccess => {
              if (saleSuccess.ok) {
                Swal.fire('Guardado', saleSuccess.msg, 'success');
                this.router.navigateByUrl(`administrador/venta/${this.urlSale}`);
              } else {
                Swal.fire('Error', saleSuccess.msg, 'success');
              }
            })
        } else {
          Swal.fire('Error', 'la fecha que digitaste no corresponde a una fecha. \n Vuelve a intentarlo', 'success');
        }

      }
    }
  }

  dateFormat(date: Date): string {
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return `${day}/${month + 1}/${year}`;
  }

  resetFieldsProduct() {
    this.miFormulario.get('idProduct')?.reset('');
    this.miFormulario.get('priceProduct')?.reset('');
    this.miFormulario.get('nameProduct')?.reset('');
    this.miFormulario.get('amountProduct')?.reset('');
    this.miFormulario.get('nameProduct')?.enable();
    this.productSelected = undefined;
    this.editProduct = false;
  }

  getTotalPrice() {
    let total_price = 0;
    for (let index = 0; index < this.details_sale.length; index++) {
      total_price = total_price + this.details_sale[index].price!;

    }
    this.miFormulario.get('total_price')?.setValue(total_price);
  }
  cancel() {
    this.router.navigateByUrl(`administrador/venta/${this.urlSale}`);

  }

  isValidDate(date: any) {
    return date instanceof Date && !isNaN(Number(date));
  }

}

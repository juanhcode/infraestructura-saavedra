import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import { switchMap } from 'rxjs';
import { Product } from '../../../product/interfaces/intergace';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MainClass } from 'src/classes/mainClass';
import { ProductComponent } from '../../../../../Components/dialogs/product/product.component';
import { MatDialog } from '@angular/material/dialog';
import { showButtons } from 'src/app/Components/interface';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../css/style.css']
})
export class CreateComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    adress: [, [Validators.required]],
    phoneNumber: [, [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],

  })

  viewName: string = "";
  showButtonTable:showButtons = {updateButton:true,deleteButton:true,viewButton:true};
  validateField!: MainClass;
  showComponents: boolean = true;
  listHeaderTableProducts = ['Nombre', 'Cantidad', 'Precio', 'Acciones'];
  propertyProducts = ['name', 'amount', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>;
  product: Product = { id: undefined, name: '', description: null, amount: 0, price: 0, alterImg: null, image: null, idCategory: 1 };
  products: Product[] = [];
  pageSizeOptions = [3, 6, 12];


  constructor(private fb: FormBuilder, private service: SupplierService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    this.validateField = new MainClass();
  }

  ngOnInit(): void {
    if (this.router.url.includes('crear')) {
      this.viewName = "create"
      this.dataSource.data = []
      return;
    }
    if (this.router.url.includes('ver')) {
      this.viewName = "view"
      this.miFormulario.disable();
      this.showButtonTable = {updateButton:false,deleteButton:false,viewButton:true};;
      this.showComponents = false;
    } else {
      this.miFormulario.get('id')?.disable();
      this.viewName = "update"
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.service.findSupplier(id)))
      .subscribe((supplier) => {
        this.miFormulario.get('id')?.setValue(supplier.obj?.id);
        this.miFormulario.get('name')?.setValue(supplier.obj?.name);
        this.miFormulario.get('phoneNumber')?.setValue(supplier.obj?.phoneNumber);
        this.miFormulario.get('adress')?.setValue(supplier.obj?.adress);
        this.products = supplier.obj?.products ?? [];
        this.dataSource.data = this.products;
      });
  }

  guardar() {
    if (this.miFormulario.valid && this.products.length > 0) {
      const { name, adress, phoneNumber } = this.miFormulario.value;
      if (this.viewName === "create") {
        this.service.createSupplier(name, adress, phoneNumber, this.dataSource.data).subscribe(res => {
          if (res.ok) {
            Swal.fire('Guardado', res.msg, 'success');
            this.router.navigateByUrl('administrador/proveedor');
          } else {
            Swal.fire('Error', res.msg, 'error');
          }
        });
      } else {
        this.service.updateSupplier(name, adress, phoneNumber, this.dataSource.data, this.miFormulario.get('id')?.value).subscribe(res => {
          if (res.ok) {
            Swal.fire('Actualización', res.msg, 'success');
            this.router.navigateByUrl('administrador/proveedor');
          } else {
            Swal.fire('Error', res.msg, 'error');
          }
        });
      }
    }

  }

  cancelar() {
    this.miFormulario.reset();
    this.router.navigateByUrl('administrador/proveedor');
  }

  actionProduct(obj: any) {
    if (obj.event !== 'eliminar') {
      this.product.name = obj.element.name
      this.product.amount = obj.element.amount;
      this.product.price = obj.element.price;
      if (obj.event == 'editar') {
        this.openDialogProduct('Editar Producto', 'update', this.product);
      } else {
        this.openDialogProduct('Ver Producto', 'view', this.product);
      }
    } else {

      Swal.fire({
        title: 'Desea eliminar el producto?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.products.findIndex(supplierProduct => supplierProduct.name === obj.element.name);
          this.products.splice(index, 1);
          Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
        } else if (result.isDenied) {
          Swal.fire('Atención', 'Los cambios no han sido sido guardados.', 'info')
        }
        this.dataSource.data = this.products;
      })
    }
  }

  openDialogProduct(title: string, typeAction: string, product: any) {
    var _popup = this.dialog.open(ProductComponent, {
      width: '400px',
      data: {
        title: title,
        typeAction: typeAction,
        product: product,
        actionSave: false
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item.actionSave === true) {
        const index = this.products.findIndex(supplierProduct => supplierProduct.name === item.product.name);
        if (index !== -1) {
          this.products[index].name = item.product.name;
          this.products[index].amount = item.product.amount;
          this.products[index].price = item.product.price;
        } else {
          this.products.push({ ...product })
        }
        this.dataSource.data = this.products;
      }
    })
  }

  openDialog() {
    this.openDialogProduct('crear Producto', 'create', this.product);
  }

}

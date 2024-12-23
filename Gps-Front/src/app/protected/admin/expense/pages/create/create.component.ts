import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../../supplier/interface/interface';
import { SupplierService } from '../../../supplier/services/supplier.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Product } from '../../../product/interfaces/intergace';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductService } from '../../../product/services/product.service';
import { MainClass } from 'src/classes/mainClass';
import { Detail_Expense } from '../../interfaces/interface';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductComponent } from 'src/app/Components/dialogs/product/product.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailExpenseComponent } from 'src/app/Components/dialogs/detail-expense/detail-expense.component';
import { ExpenseService } from '../../services/expense.service';
import { switchMap } from 'rxjs';
import { showButtons } from '../../../../../Components/interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../css/style.css'],

})
export class CreateComponent implements OnInit {

  suppliers: Supplier[] = [];
  products: Product[] = [];
  productsSelected: Product[] = []
  productSelected: Product | undefined;
  pageSizeOptions = [4];
  pageSizeOptionsDetails = [5, 8];
  showComponentsExpeses:boolean =true;
  validateField!: MainClass;
  details_expense: Detail_Expense[] = [];
  detail_expense?: Detail_Expense;
  showButtonTable: showButtons = {updateButton:true,viewButton:true,deleteButton:true};
  viewName: string = "";
  showComponents: boolean = true;
  listHeaderTableDetailExpenses = ['Nombre producto', 'Cantidad', 'Precio', 'Acciones'];
  propertyDetailsExpenses = ['Product.name', 'amount', 'price', 'actions'];
  listHeaderTableProducts = ['Nombre', 'Cantidad', 'Precio', 'select'];
  propertyProducts = ['name', 'amount', 'price', 'select'];
  dataSourceProducts = new MatTableDataSource<Product>;
  dataSourceDetailsExpense = new MatTableDataSource<Detail_Expense>;
  selectionProducts = new SelectionModel<Product>(true, []);
  productsSuplier: Product[] = [];
  supplierSelected: Supplier | undefined;
  isEditable = true;
  updateStep2 = false;
  date = new Date(Date.now());
  miFormulario: FormGroup = this.fb.group({
    idExpense: [],
    nameSupplier: [''],
    nameProduct: [''],
    date: [{ value: MainClass.dateFormat(this.date), disabled: false }],
    total_price: [{ value: 0, disabled: true }]
  });

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this.fb.group({
    formArrayProductsSelected: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private serviceSupplier: SupplierService, private serviceProduct: ProductService,
    private router: Router, private dialog: MatDialog, private serviceExpense: ExpenseService, private activatedRoute: ActivatedRoute) {
    this.validateField = new MainClass();
  }
  ngOnInit(): void {

    if (this.router.url.includes('crear')) {
      this.miFormulario.get('date')?.disable();
      this.viewName = "create"
      this.dataSourceDetailsExpense.data = []
      return;
    } else if (this.router.url.includes('ver')) {
      this.viewName = "view"
      this.miFormulario.disable();
      this.showButtonTable = {updateButton:false,viewButton:true,deleteButton:false};
      this.showComponents = false;
      this.showComponentsExpeses=false;
    }
    else {
      this.viewName = "update"
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.serviceExpense.findExpense(id)))
      .subscribe((expense) => {
        if (expense.ok) {
          this.details_expense = expense.obj?.details ?? [];
          this.miFormulario.get('idExpense')?.setValue(expense.obj?.id);
          this.miFormulario.get('date')?.setValue(expense.obj?.createdAt);
          this.miFormulario.get('total_price')?.setValue(expense.obj?.total_price);
          this.dataSourceDetailsExpense.data = this.details_expense;
          if(expense.obj?.editExpense === false){
            if(this.viewName==='update'){
              this.showComponents= false;
              this.miFormulario.disable();
              Swal.fire('Atención', 'Este gasto no se puede editar.', 'info');
              this.showButtonTable = {updateButton:false,viewButton:true,deleteButton:false};
              this.showComponentsExpeses=false;
            }
          }
        }
      });
  }

  openDialogProduct() {
    var _popup = this.dialog.open(ProductComponent, {
      width: '400px',
      data: {
        title: 'Crear producto',
        typeAction: 'create',
        needService: true,
        Product: {},
        actionSave: false
      }
    });
    _popup.afterClosed().subscribe(async (item) => {
      if (item.actionSave === true) {
        await this.addProductToDetail(item.product);
      }
    })
  }

  async addProductToDetail(product: any) {
    const { value: amount } = await Swal.fire({
      title: 'Ingresa la cantidad comprada del producto',
      input: 'number',
      inputLabel: 'Cantidad',
      inputPlaceholder: 'Ingresa la cantidad'
    })
    if (amount) {
      this.detail_expense = { amount: amount, price: amount * product.price, Product: product,use:'disponible' };
      this.details_expense.push(this.detail_expense);
      this.getTotalPrice()
      this.dataSourceDetailsExpense.data = this.details_expense;
    }
  }
  openDialogDetail(title: string, typeAction: string, detailExpense: any) {
    var _popup = this.dialog.open(DetailExpenseComponent, {
      width: '700px',
      data: {
        title: title,
        typeAction: typeAction,
        detailExpense,
        actionSave: false
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item.actionSave === true) {
        const index = this.details_expense.findIndex(detailExpense => detailExpense.Product?.id === item.detailExpense.Product.id);
        if (index !== -1) {
          this.details_expense[index].amount = item.detailExpense.amount;
          this.details_expense[index].price = item.detailExpense.price;
        }
        this.getTotalPrice();
        this.dataSourceDetailsExpense.data = this.details_expense;

      }
    })
  }

  getUrlSupplier() {
    this.router.navigateByUrl('administrador/proveedor/crear')
  }
  searchingSupplier() {
    this.serviceSupplier.findSuppliers(this.miFormulario.get('nameSupplier')?.value.trim()).subscribe(suppliers => this.suppliers = suppliers.list ?? [])
    if (this.miFormulario.get('nameSupplier')?.value?.trim().length === 0) {
      this.supplierSelected = undefined;
    }
  }
  optionSelectedSupplier(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.supplierSelected = undefined;
      return;
    }
    const supplier: Supplier = event.option.value;
    this.miFormulario.get('nameSupplier')?.setValue(supplier.name);
    this.supplierSelected = supplier;
    this.serviceSupplier.findSupplier(String(supplier.id)).subscribe(resp => {
      this.productsSuplier = resp.obj?.products ?? [];
      this.dataSourceProducts.data = this.productsSuplier;
    })
  }

  getTotalPrice() {
    let total_price = 0;
    for (let index = 0; index < this.details_expense.length; index++) {
      total_price = total_price + this.details_expense[index].price!;

    }
    this.miFormulario.get('total_price')?.setValue(total_price);
  }

  addDetailExpense() {
    const formGroups = (this.secondFormGroup.controls['formArrayProductsSelected'] as FormArray).controls
    const repeatProducts = []
    for (let i = 0; i < formGroups.length; i++) {
      let repeatProduct = false;
      const formGroup = (formGroups[i] as FormGroup)
      const name = formGroup.get('name')?.value;
      const id = formGroup.get('id')?.value;
      const amount = formGroup.get('amount')?.value;
      const price = formGroup.get('price')?.value;
      const amountProduct = formGroup.get('amountProduct')?.value;
      this.detail_expense = { price: amount * price, amount: amount, Product: { id, name, amount: amountProduct, Supplier: this.supplierSelected, price },use:'disponible' };
      if (this.details_expense.length === 0) {
        this.details_expense.push(this.detail_expense);
        this.getTotalPrice();
      } else {
        for (let index = 0; index < this.details_expense.length; index++) {
          if (formGroups[i].get('id')?.value === this.details_expense[index].Product?.id) {
            repeatProducts.push(this.detail_expense);
            repeatProduct = true;
          }
        }
        if (repeatProduct == false) {
          this.details_expense.push(this.detail_expense);
          this.getTotalPrice();
        }
      }
    }
    if (repeatProducts.length > 0) {
      let message = `Los siguientes productos del proveedor ${this.supplierSelected?.name} ya han sido registrados: \n`
      for (let index = 0; index < repeatProducts.length; index++) {
        message += `Nombre producto: ${repeatProducts[index].Product?.name}. \n`
      }
      message += 'Si deseas editar el producto, editalo desde la tabla de detalles del gasto.'
      Swal.fire('Error', message, 'error');
    }
    this.dataSourceDetailsExpense.data = this.details_expense;
    this.resetStepper()
  }


  resetStepper() {
    this.resetFirstStep();
    this.miFormulario.get('nameSupplier')?.setValue('');
    this.supplierSelected = undefined;
    this.productsSelected = [];
    this.detail_expense = {};
    this.selectionProducts = new SelectionModel<Product>(true, []);
  }
  actionDetailExpense(obj: any) {
    if (obj.event !== 'eliminar') {
      this.detail_expense = obj.element;
      if (obj.event == 'editar') {
        this.openDialogDetail('Editar detalle del gasto', 'update', this.detail_expense);
      } else {
        this.openDialogDetail('Ver detalle del gasto', 'view', this.detail_expense);
      }
    } else {
      Swal.fire({
        title: 'Desea eliminar el producto?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.details_expense.findIndex(detail => detail.Product?.id === obj.element.Product.id);
          this.details_expense.splice(index, 1);
          Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
        } else if (result.isDenied) {
          Swal.fire('Atento', 'Los cambios no han sido sido guardados.', 'info')
        }
        this.dataSourceDetailsExpense.data = this.details_expense;
        this.getTotalPrice();
      });
    }
  }
  searchingProducts() {
    this.serviceProduct.findProductsWithoutSupplier(this.miFormulario.get('nameProduct')?.value.trim()).subscribe(products => this.products = products.list ?? [])
    if (this.miFormulario.get('nameProduct')?.value?.trim().length === 0) {
      this.productSelected = undefined;
    }
  }
  optionSelectedProduct(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.productSelected = undefined;
      return;
    }
    const product: Product = event.option.value;
    this.miFormulario.get('nameProduct')?.setValue(product.name);
    this.productSelected = product;
    (async () => {
      await this.addProductToDetail(this.productSelected);
    })()
    this.miFormulario.get('nameProduct')?.setValue('');
  }

  getElementsSelected(event: any) {
    this.productsSelected = event.selected;
    if (this.productsSelected.length > 0) {
      this.firstFormGroup.get('firstCtrl')?.setValue('siguiente');
    } else {
      this.firstFormGroup.get('firstCtrl')?.setValue('');
    }
  }

  buildForm() {
    this.updateStep2 = true;
    const controlArray = this.secondFormGroup.get('formArrayProductsSelected') as FormArray;
    for (const product of this.productsSelected) {
      controlArray.push(
        this.fb.group({
          id: new FormControl({ value: product.id, disabled: true }),
          name: new FormControl({ value: product.name, disabled: true }),
          amountProduct: new FormControl({ value: product.amount, disabled: true }),
          price: new FormControl({ value: product.price, disabled: true }),
          amount: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("^[0-9]+$")])
        })
      );
    }

  }

  formGroupProduct(i: number): FormGroup {
    return (this.secondFormGroup.controls['formArrayProductsSelected'] as FormArray).controls[i] as FormGroup;
  }
  resetFirstStep() {
    (this.secondFormGroup.controls['formArrayProductsSelected'] as FormArray).clear();
    this.updateStep2 = false;
  }

  changeStep(event: any) {
    if (event.selectedStep.state === 'step1') {
      this.resetFirstStep();
    } else if (event.selectedStep.state === 'step2') {
      this.buildForm();
    }
  }
  dateFormat(date: Date): string {
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return `${day}/${month + 1}/${year}`;
  }

  cancel() {
    this.miFormulario.reset();
    this.router.navigateByUrl('administrador/gasto');
  }

  isValidDate(date: any) {
    return date instanceof Date && !isNaN(Number(date));
  }
  save() {
    if (this.miFormulario.valid && this.details_expense.length > 0) {
      if (this.viewName === 'create') {
        this.serviceExpense.createExpense(this.details_expense, this.miFormulario.get('total_price')?.value).subscribe((expenseSuccess) => {
          if (expenseSuccess.ok) {
            Swal.fire('Guardado', expenseSuccess.msg, 'success');
            this.router.navigateByUrl('administrador/gasto');
          } else {
            Swal.fire('Error', expenseSuccess.msg, 'error');
          }
        }
        );
      } else {
        const dateUpdate = new Date(Date.parse(this.miFormulario.get('date')?.value));
        if (this.isValidDate(dateUpdate)) {
          this.serviceExpense.updateExpense(this.miFormulario.get('idExpense')?.value, this.details_expense, this.miFormulario.get('total_price')?.value, dateUpdate)
            .subscribe(expenseSuccess => {
              if (expenseSuccess.ok) {
                Swal.fire('Guardado', expenseSuccess.msg, 'success');
                this.router.navigateByUrl('administrador/gasto');
              } else {
                Swal.fire('Error', expenseSuccess.msg, 'success');
              }
            })
        } else {
          Swal.fire('Error', 'la fecha que digitaste no corresponde a una fecha. \n Vuelve a intentarlo', 'success');
        }
      }
    }
  }
}

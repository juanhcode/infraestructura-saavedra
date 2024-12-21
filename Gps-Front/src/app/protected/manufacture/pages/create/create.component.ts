import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/protected/admin/expense/interfaces/interface';
import { Router, ActivatedRoute } from '@angular/router';
import { MainClass } from '../../../../../classes/mainClass';
import { MatDialog } from '@angular/material/dialog';
import { DetailExpenseAvalaibleComponent } from '../../../../Components/dialogs/detail-expense-avalaible/detail-expense-avalaible.component';
import { Product_Avalaible, Detail_Manufacture, Detail_Manufacture_process } from '../../interface/interface';
import { ManufactureService } from '../../services/manufacture.service';
import { ValidateFields } from 'src/app/validations/validate-Fields';
import { DetailManufactureComponent } from '../../../../Components/dialogs/detail-manufacture/detail-manufacture.component';
import Swal from 'sweetalert2';
import { showButtons } from 'src/app/Components/interface';
import { Product } from '../../../admin/product/interfaces/intergace';
import { ProductService } from '../../../admin/product/services/product.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../admin/css/style.css']
})
export class CreateComponent implements OnInit {

  date = new Date(Date.now());
  showButtonTable: showButtons = { updateButton: true, deleteButton: false, viewButton: true };
  showButtonTableExpense: showButtons = { updateButton: false, viewButton: true, deleteButton: false }
  updateStep3 = false;
  product: Product | undefined = undefined;
  products: Product[] = [];
  pageSizeOptionsDetails = [5, 10];
  pageSizeOptions = [4];
  validateField!: MainClass;
  expensesSelected: Expense[] = [];
  productsExpensesSelected: Product_Avalaible[] = []
  viewName: string = "";
  details_Manufacture: Detail_Manufacture[] = [];
  detail_Manufacture: Detail_Manufacture | undefined = undefined;
  details_Manufactures_process: Detail_Manufacture_process[] = [];
  detail_Manufacture_proccess: Detail_Manufacture_process | undefined = undefined;
  dataSourceDetailsManufactures = new MatTableDataSource<Detail_Manufacture_process>;
  listHeaderTableDetailsManufactures = ['Nombre producto', 'Cantidad utilizada', 'Categoria', 'Acciones'];
  propertyDetailsManufactures = ['nameProduct', 'amount', 'category', 'actions'];
  listHeaderTableExpenses = ['Nombre ', 'Fecha', 'Uso', 'Acciones', 'select'];
  propertyExpenses = ['name', 'createdAt', 'state', 'actions', 'select'];
  dataSourceExpenses = new MatTableDataSource<Expense>;
  listHeaderTableProductsAvalaibles = ['Nombre del gasto ', 'Fecha', 'Nombre del producto', 'Cantidad disponible', 'select'];
  propertyProductsAvalaibles = ['nameExpense', 'date', 'name', 'amountAvalaible', 'select'];
  dataSourceProductsAvalaibles = new MatTableDataSource<Product_Avalaible>
  objShowComponents = {
    showActionsComponents: true,
    showlostComponents: false,
    showExpensesComponent: true,
    showPorductsMakedComponent: false,
    showDetailsManufacturesTable: false
  }
  selectionExpenses = new SelectionModel<Expense>(true, []);
  selectionProductsAvalaibles = new SelectionModel<Product_Avalaible>(true, []);
  firstFormGroup = this.fb.group({
    expensesSelected: [this.expensesSelected, Validators.required],
  });
  secondFormGroup = this.fb.group({
    productsSelected: [this.productsExpensesSelected, Validators.required],
  });
  thirdFormGroup = this.fb.group({
    formArrayProductsSelected: this.fb.array([], Validators.required)
  });
  formGroupProductLost = this.fb.group({
    formArrayProductsLosted: this.fb.array([], Validators.required)
  });
  formGroupProductManufacture = this.fb.group({
    formArrayProductsMaked: this.fb.array([], Validators.required)
  })
  miFormulario: FormGroup = this.fb.group({
    idManufacture: [{ value: '', disabled: true }],
    date: [{ value: MainClass.dateFormat(this.date), disabled: true }],
    nameEmployee: [{ value: '', disabled: true }],
    surnameEmployee: [{ value: '', disabled: true }]
  });
  constructor(private fb: FormBuilder, private manufactureService: ManufactureService, private router: Router,
    private productService: ProductService, private dialog: MatDialog, private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
    this.validateField = new MainClass();
  }
  ngOnInit(): void {
    if (this.router.url.includes('crear')) {
      this.getExpenses()
      this.miFormulario.get('date')?.disable();
      this.viewName = "create"
      return;
    }
    if (this.router.url.includes('ver')) {
      this.viewName = "view"
      this.showButtonTable = { updateButton: false, deleteButton: false, viewButton: true };
      this.objShowComponents.showExpensesComponent = false;
      this.objShowComponents.showActionsComponents = false;
    }
    if (this.router.url.includes('editar')) {
      this.viewName = "update"
      this.showButtonTable = { updateButton: true, deleteButton: false, viewButton: true };
      this.objShowComponents.showExpensesComponent = false;
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.manufactureService.findManufacture(id))).subscribe(
      (resp) => {
        if (resp.ok === true) {
          this.miFormulario.get('idManufacture')?.setValue(resp.obj?.id)
          this.miFormulario.get('date')?.setValue(resp.obj?.createdAt);
          this.miFormulario.get('nameEmployee')?.setValue(resp.obj?.employee?.name);
          this.miFormulario.get('surnameEmployee')?.setValue(resp.obj?.employee?.surname);
          resp.obj?.details?.forEach(detail => {
            if (detail.category === 'manufacture') {
              this.product = { id: detail.Product?.id, name: detail.Product?.name, amount: detail.Product?.amount, amountMaked: detail.amount };
              this.products.push(this.product);
              this.detail_Manufacture = {
                id: detail.id, amount: detail.amount, category: detail.category, amountLost: detail.amountLost, Expense: detail.Expense, Product: detail.Product
              }
              this.details_Manufacture.push(this.detail_Manufacture);
            } else if (detail.category === 'Producción') {
              this.detail_Manufacture = {
                id: detail.id, amount: detail.amount, amountAvalaible: detail.amountAvalaible ?? detail.amount,
                category: detail.category, amountLost: detail.amountLost, Expense: detail.Expense, Product: detail.Product
              }
              this.addDetailsManufactureProcess(this.detail_Manufacture);
            }
          })
          this.buildFormProduct();
          this.dataSourceDetailsManufactures.data = this.details_Manufactures_process;
          this.buildFormProductLosted();
          this.objShowComponents.showPorductsMakedComponent = true;
          this.objShowComponents.showlostComponents = true;
          this.objShowComponents.showDetailsManufacturesTable = true;
        }
      }
    )


  }

  addDetailsManufactureProcess(detailManufacture: Detail_Manufacture) {
    if (this.details_Manufactures_process.length > 0) {
      let elementRepeat = false;
      for (let index = 0; index < this.details_Manufactures_process.length; index++) {
        const element = this.details_Manufactures_process[index];
        if (element.nameProduct === detailManufacture.Product?.name) {
          element.amount! += detailManufacture.amount!;
          element.detailsManufactures?.push(detailManufacture);
          elementRepeat = true;
        }
      }
      if (elementRepeat == false) {
        this.detail_Manufacture_proccess = { amountLost: detailManufacture.amountLost ?? 0, amount: detailManufacture.amount, nameProduct: detailManufacture.Product?.name, category: detailManufacture.category, detailsManufactures: [detailManufacture] }
        this.details_Manufactures_process.push(this.detail_Manufacture_proccess);
      }
    } else {
      this.detail_Manufacture_proccess = { amountLost: detailManufacture.amountLost ?? 0, amount: detailManufacture.amount, nameProduct: detailManufacture.Product?.name, category: detailManufacture.category, detailsManufactures: [detailManufacture] }
      this.details_Manufactures_process.push(this.detail_Manufacture_proccess);
    }

  }

  addDetailsManufactures() {
    const formGroups = (this.thirdFormGroup.controls['formArrayProductsSelected'] as FormArray).controls
    for (let i = 0; i < formGroups.length; i++) {
      const formGroup = (formGroups[i] as FormGroup)
      const name = formGroup.get('name')?.value;
      const id = formGroup.get('id')?.value;
      const amount = formGroup.get('amount')?.value;
      const idExpense = formGroup.get('idExpense')?.value;
      const amountAvalaible = formGroup.get('amountAvalaible')?.value;
      const nameExpense = formGroup.get('nameExpense')?.value;
      const date = formGroup.get('date')?.value;
      this.detail_Manufacture = { amount: amount, amountAvalaible, Product: { id, name }, category: 'Producción', Expense: { id: idExpense, name: nameExpense, createdAt: date } };
      this.addDetailsManufactureProcess(this.detail_Manufacture)
    }
    this.productService.findProducts('').subscribe(resp => {
      if (resp.ok == true) {
        this.products = resp.list!;
        this.buildFormProduct();
        this.buildFormProductLosted();
        this.dataSourceDetailsManufactures.data = this.details_Manufactures_process;
        this.resetExpenseComponent()
        this.objShowComponents.showPorductsMakedComponent= true;
        this.objShowComponents.showDetailsManufacturesTable = true;
        this.objShowComponents.showlostComponents = true;
      }
    })

  }

  buildFormProduct() {
    const controlArray = this.formGroupProductManufacture.get('formArrayProductsMaked') as FormArray;
    for (const product of this.products) {
      controlArray.push(
        this.fb.group({
          idProduct: new FormControl({ value: product.id, disabled: true }),
          nameProduct: new FormControl({ value: product.name, disabled: true }),
          amount: new FormControl({ value: product.amount, disabled: true }),
          amountMaked: new FormControl({ value: product.amountMaked ?? '', disabled: product.amountMaked && this.viewName === 'view' ? true : false }, [Validators.required, Validators.pattern("^[0-9]+$")])
        }
        )
      );
    }
  }
  buildFormProductLosted() {
    const controlArray = this.formGroupProductLost.get('formArrayProductsLosted') as FormArray;
    for (const detailManufacture of this.details_Manufactures_process) {
      controlArray.push(
        this.fb.group({
          nameProduct: new FormControl({ value: detailManufacture.nameProduct, disabled: true }),
          amount: new FormControl({ value: detailManufacture.amount, disabled: true }),
          amountLost: new FormControl({ value: detailManufacture.amountLost ?? 0, disabled: this.viewName === 'view' ? true : false }, [Validators.required, Validators.pattern("^[0-9]+$")])
        }, {
          validators: ValidateFields.lessThanSign('amount', 'amountLost')
        })
      );
    }
  }
  resetExpenseComponent() {
    this.detail_Manufacture = undefined;
    this.objShowComponents.showExpensesComponent = false;
    this.productsExpensesSelected = [];
    this.resetSecondStep();
    this.selectionProductsAvalaibles = new SelectionModel<Product_Avalaible>(true, []);
    this.dataSourceProductsAvalaibles.data = [];

  }

  getExpensesSelected(event: any) {
    this.expensesSelected = event.selected;
    this.firstFormGroup.get('expensesSelected')?.setValue(this.expensesSelected);

  }

  openDialogDetail(title: string, typeAction: string, detailManufactureProccess: any) {
    var _popup = this.dialog.open(DetailManufactureComponent, {
      width: '800px',
      data: {
        title: title,
        typeAction: typeAction,
        detailManufactureProccess,
        actionSave: false
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item.actionSave === true) {
        this.objShowComponents.showlostComponents = false;
        for (let index = 0; index < this.details_Manufactures_process.length; index++) {
          const element = this.details_Manufactures_process[index];
          if (element.nameProduct === item.detailManufactureProccess.nameProduct) {
            this.details_Manufactures_process[index] = { ...item.detailManufactureProccess };
            const formGroup = (this.formGroupProductLost.get('formArrayProductsLosted') as FormArray).at(index) as FormGroup;
            formGroup.get('amount')?.setValue(item.detailManufactureProccess.amount);
          }

        }
        this.dataSourceDetailsManufactures.data = this.details_Manufactures_process;
        this.objShowComponents.showlostComponents = true;
      }
    })
  }

  actionDetailManufacture(obj: any) {
    if (obj.event !== 'eliminar') {
      this.detail_Manufacture = obj.element;
      if (obj.event == 'editar') {
        this.openDialogDetail('Editar detalle de la manufactura', 'update', this.detail_Manufacture);
      } else {
        this.openDialogDetail('Ver detalle del la manufactura', 'view', this.detail_Manufacture);
      }
    }
  }

  formGroupManufactureProductLost(i: number): FormGroup {
    return (this.formGroupProductLost.controls['formArrayProductsLosted'] as FormArray).controls[i] as FormGroup;
  }

  formGroupManufactureProductMaked(i: number): FormGroup {
    return (this.formGroupProductManufacture.controls['formArrayProductsMaked'] as FormArray).controls[i] as FormGroup;
  }

  formGroupProduct(i: number): FormGroup {
    return (this.thirdFormGroup.controls['formArrayProductsSelected'] as FormArray).controls[i] as FormGroup;
  }
  buildForm() {
    this.updateStep3 = true;
    const controlArray = this.thirdFormGroup.get('formArrayProductsSelected') as FormArray;
    for (const productAvalaible of this.productsExpensesSelected) {
      controlArray.push(
        this.fb.group({
          id: new FormControl({ value: productAvalaible.idProduct, disabled: true }),
          idExpense: new FormControl({ value: productAvalaible.idExpense, disabled: true }),
          nameExpense: new FormControl({ value: productAvalaible.nameExpense, disabled: true }),
          name: new FormControl({ value: productAvalaible.name, disabled: true }),
          date: new FormControl({ value: productAvalaible.date, disabled: true }),
          amountAvalaible: new FormControl({ value: productAvalaible.amountAvalaible, disabled: true }),
          amount: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("^[0-9]+$")])
        }, {
          validators: ValidateFields.lessThanSign('amountAvalaible', 'amount')
        })
      );
    }


  }

  resetDetailsManufacture() {
    this.objShowComponents.showDetailsManufacturesTable = false;
    this.objShowComponents.showlostComponents = false;
    this.objShowComponents.showExpensesComponent = true;
    this.selectionExpenses.clear();
    this.dataSourceDetailsManufactures.data = [];
    this.detail_Manufacture = undefined;
    this.resetSecondStep();
    this.productsExpensesSelected = [];
  }

  getProductsSelected(event: any) {
    this.productsExpensesSelected = event.selected;
    this.secondFormGroup.get('productsSelected')?.setValue(this.productsExpensesSelected);
  }

  resetSecondStep() {
    this.updateStep3 = false;
    (this.thirdFormGroup.controls['formArrayProductsSelected'] as FormArray).clear();
  }

  findeExpensesProductsAvalaibles() {
    let idsExpenses = '';
    for (let index = 0; index < this.expensesSelected.length; index++) {
      if (this.expensesSelected.length - 1 === index) {
        idsExpenses += `${this.expensesSelected[index].id}`
      } else {
        idsExpenses += `${this.expensesSelected[index].id},`
      }
    }
    this.manufactureService.findProductsExpenseAvalaible(idsExpenses).subscribe(
      resp => {
        if (resp.ok === true) {
          this.dataSourceProductsAvalaibles.data = resp.list!
        }
      }
    );
  }




  changeStep(event: any) {
    if (event.selectedStep.state === 'step1') {
      this.productsExpensesSelected = [];
      this.secondFormGroup.controls['productsSelected'].setValue(this.productsExpensesSelected)
      this.selectionProductsAvalaibles = new SelectionModel<Product_Avalaible>(true, []);
    } else if (event.selectedStep.state === 'step2') {
      this.resetSecondStep();
    } else if (event.selectedStep.state === 'step3') {
      this.buildForm();
    }
  }

  openDialogExpenseDetail(idExpense: string) {
    var _popup = this.dialog.open(DetailExpenseAvalaibleComponent, {
      width: '550px',
      data: {
        idExpense
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('empleado/manufactura');
  }

  getExpenses() {
    this.manufactureService.findExpenses().subscribe(
      resp => {
        if (resp.ok === true) {
          this.dataSourceExpenses.data = resp.list!;

        }
      }
    )
  }
  save() {
    if (this.formGroupProductLost.valid && this.formGroupProductManufacture.valid) {
      for (let index = 0; index < this.details_Manufactures_process.length; index++) {
        const element = this.details_Manufactures_process[index];
        const formGroup = (this.formGroupProductLost.get('formArrayProductsLosted') as FormArray).at(index) as FormGroup;
        const amountLost = formGroup.get('amountLost')?.value;
        for (let index = 0; index < element.detailsManufactures!.length; index++) {
          const detail = element.detailsManufactures![index];
          detail.amountLost = amountLost;
          this.details_Manufacture.push(detail);
        }
      }

      const formGroups = (this.formGroupProductManufacture.controls['formArrayProductsMaked'] as FormArray).controls
      for (let i = 0; i < formGroups.length; i++) {
        const formGroup = (formGroups[i] as FormGroup)
        const id = formGroup.get('idProduct')?.value;
        const name = formGroup.get('nameProduct')?.value;
        const amount = formGroup.get('amountMaked')?.value;
        const amountLost = null;
        this.detail_Manufacture = { amount, amountLost, category: 'manufacture', Product: { id, name }, Expense: { id: null } }
        const index = this.details_Manufacture.findIndex((object)=>{
          return object.Product?.id === this.detail_Manufacture?.Product?.id
        })
        if(index !== -1){
          this.details_Manufacture[index].amount = amount;
        }else{
          this.details_Manufacture.push(this.detail_Manufacture);
        }
      }
      if (this.viewName === "create") {
        this.manufactureService.createManufacture(this.details_Manufacture, Number(this.authService.user.uid)).subscribe(res => {
          if (res.ok === true) {
            Swal.fire('Guardado', res.msg, 'success');
           console.log(res.msg)
            this.router.navigateByUrl('empleado/manufactura');
          } else {
            Swal.fire('Error', res.msg, 'error');
            console.log(res.msg)
          }
        }
        );
      } else {
        this.manufactureService.updateManufacture(this.miFormulario.get('idManufacture')?.value, this.details_Manufacture, Number(this.authService.user.uid)).subscribe(
          (resp)=>{
            if(resp.ok===true){
              Swal.fire('Actaulizado', resp.msg, 'success');
              this.details_Manufacture=[];
              this.router.navigateByUrl('empleado/manufactura');
            }else {
              Swal.fire('Error', resp.msg, 'error');
            }
          }
        )
      }
    }


  }
  actionExpenseDetail(event: any) {
    this.openDialogExpenseDetail(event.element.id);
  }
}

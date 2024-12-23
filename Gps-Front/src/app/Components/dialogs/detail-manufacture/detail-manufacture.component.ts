import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from 'src/app/protected/admin/expense/interfaces/interface';
import { ValidateFields } from 'src/app/validations/validate-Fields';
import { MainClass } from 'src/classes/mainClass';
import { Detail_Manufacture } from '../../../protected/manufacture/interface/interface';

@Component({
  selector: 'app-detail-manufacture',
  templateUrl: './detail-manufacture.component.html',
  styleUrls: ['../css/style.css']
})
export class DetailManufactureComponent implements OnInit {
  inputData: any;
  detail_Manufacture_Production:Detail_Manufacture | undefined =undefined;
  details_Manufacture_production:Detail_Manufacture[]= [];
  editAmountManufacture:boolean=false;
  showButtonUpdate:boolean=true;
  showFieldButtonAmountManufacture:boolean=true;
  expenseForm:boolean =false;
  validateField!: MainClass;
  expenses: Expense[] = [];
  miFormulario: FormGroup = this.fb.group({
    nameProduct: [{ value: '', disabled: true }],
    category: [{ value: '', disabled: true }],
    amount: [{ value: '', disabled: true }],
  });
  expenseFormGroup = this.fb.group({
    formArrayExpense: this.fb.array([], Validators.required)
  });
  ProductManufactureFormGroup = this.fb.group({
    formArrayproduct: this.fb.array([], Validators.required)
  });
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DetailManufactureComponent>) {
    this.validateField = new MainClass();
  }
  ngOnInit(): void {
    this.inputData = this.data;
    const controlArray = this.expenseFormGroup.get('formArrayExpense') as FormArray;
    if(this.inputData.typeAction==='view'){
      this.showButtonUpdate=false;
    }
    for (const detailManufactureExpense of this.inputData.detailManufactureProccess.detailsManufactures) {
      this.expenses.push(detailManufactureExpense.Expense)
      controlArray.push(
        this.fb.group({
          nameExpense: new FormControl({ value: detailManufactureExpense.Expense.name, disabled: true }),
          dateExpense: new FormControl({ value: detailManufactureExpense.Expense.createdAt, disabled: true }),
        })
      );
    }
    this.expenseForm = true;
    this.miFormulario.get('nameProduct')?.setValue(this.inputData.detailManufactureProccess.nameProduct);
    this.miFormulario.get('category')?.setValue(this.inputData.detailManufactureProccess.category);
    this.miFormulario.get('amount')?.setValue(this.inputData.detailManufactureProccess.amount);

  }

  updateAmountManufacture(){
    (this.ProductManufactureFormGroup.controls['formArrayproduct'] as FormArray).clear();
    this.showFieldButtonAmountManufacture=false;
    this.editAmountManufacture=true;
    const controlArray = this.ProductManufactureFormGroup.get('formArrayproduct') as FormArray;
    for (const detailManufacture of this.inputData.detailManufactureProccess.detailsManufactures) {
      this.details_Manufacture_production.push(detailManufacture);
      controlArray.push(
        this.fb.group({
          id: new FormControl({ value: detailManufacture.id ?? null, disabled: true }),
          idProduct: new FormControl({ value: detailManufacture.Product.id, disabled: true }),
          idExpense: new FormControl({ value: detailManufacture.Expense.id, disabled: true }),
          date: new FormControl({ value: detailManufacture.Expense.createdAt, disabled: true }),
          nameExpense: new FormControl({ value: detailManufacture.Expense.name, disabled: true }),
          nameProduct: new FormControl({ value: detailManufacture.Product.name, disabled: true }),
          amountAvalaible: new FormControl({ value: detailManufacture.amountAvalaible, disabled: true }),
          amount: new FormControl({ value:  detailManufacture.amount, disabled: false }, [Validators.required, Validators.pattern("^[0-9]+$")])
        }, {
          validators: ValidateFields.lessThanSign('amountAvalaible', 'amount')
        })
      );
    }
  }
  close() {
    this.ref.close(this.inputData);
  }

  cancel(){
    this.resetFormdetail()
  }
  formGroupProductManufacture(i: number): FormGroup {
    return (this.ProductManufactureFormGroup.controls['formArrayproduct'] as FormArray).controls[i] as FormGroup;
  }
  saveAmountProduct(){
    this.details_Manufacture_production=[];
    const formGroups = (this.ProductManufactureFormGroup.controls['formArrayproduct'] as FormArray).controls
    let amountDetailsManufacture =0;
    for (let i = 0; i < formGroups.length; i++) {
      const formGroup = (formGroups[i] as FormGroup)
      const id = formGroup.get('id')?.value;
      const idProduct = formGroup.get('idProduct')?.value;
      const name = formGroup.get('nameProduct')?.value;
      const amount = formGroup.get('amount')?.value;
      const idExpense = formGroup.get('idExpense')?.value;
      const nameExpense = formGroup.get('nameExpense')?.value;
      const amountAvalaible = formGroup.get('amountAvalaible')?.value;
      const date = formGroup.get('date')?.value;
      amountDetailsManufacture += amount;
      this.detail_Manufacture_Production = {...(id!==null? {id}: {}), amount: amount, amountAvalaible, Product: { id:idProduct, name }, category: 'Producción', Expense: { id: idExpense, name: nameExpense, createdAt: date } };
      this.details_Manufacture_production.push(this.detail_Manufacture_Production!);
    }
    this.inputData.detailManufactureProccess.amount = amountDetailsManufacture;
    this.miFormulario.get('amount')?.setValue(this.inputData.detailManufactureProccess.amount);
    this.inputData.detailManufactureProccess.detailsManufactures = this.details_Manufacture_production;
    this.resetFormdetail();
  }

  resetFormdetail(){
    this.showFieldButtonAmountManufacture=true;
    this.editAmountManufacture=false;
    this.details_Manufacture_production=[];
  }
  save() {
    (this.ProductManufactureFormGroup.controls['formArrayproduct'] as FormArray).clear();
      this.inputData.actionSave = true;
      this.close();

  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainClass } from 'src/classes/mainClass';

@Component({
  selector: 'app-detail-expense',
  templateUrl: './detail-expense.component.html',
  styleUrls: ['../css/style.css']
})
export class DetailExpenseComponent {
  inputData: any;
  validateField!: MainClass;
  miFormulario: FormGroup = this.fb.group({
    nameSupplier: [{value:'',disabled:true}],
    adressSupplier: [{value:'',disabled:true}],
    phoneNumberSupplier:[{value:'',disabled:true}],
    nameProduct:[{value:'',disabled:true}],
    amountProduct:[{value:'',disabled:true}],
    priceProduct:[{value:'',disabled:true}],
    amount: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
    price: [{value:'',disabled:true}],
  });
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DetailExpenseComponent>) {
    this.validateField = new MainClass();
  }
  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.typeAction == 'view') {
      this.miFormulario.disable();
    }
    if (this.inputData.typeAction == 'view' || this.inputData.typeAction == 'update') {
      if(this.inputData.detailExpense.Product.Supplier){
      this.miFormulario.get('nameSupplier')?.setValue(this.inputData.detailExpense.Product.Supplier.name);
      this.miFormulario.get('adressSupplier')?.setValue(this.inputData.detailExpense.Product.Supplier.adress);
      this.miFormulario.get('phoneNumberSupplier')?.setValue(this.inputData.detailExpense.Product.Supplier.phoneNumber);
      }
      this.miFormulario.get('nameProduct')?.setValue(this.inputData.detailExpense.Product.name);
      this.miFormulario.get('amountProduct')?.setValue(this.inputData.detailExpense.Product.amount);
      this.miFormulario.get('priceProduct')?.setValue(this.inputData.detailExpense.Product.price);
      this.miFormulario.get('price')?.setValue(this.inputData.detailExpense.price);
      this.miFormulario.get('amount')?.setValue(this.inputData.detailExpense.amount);
    }
  }
  close() {
    this.ref.close(this.inputData);
  }

  changePrice(){
    const { amount } = this.miFormulario.value;
    this.miFormulario.get('price')?.setValue(this.inputData.detailExpense.Product.price * amount);
  }
  save() {
    if (this.miFormulario.valid) {
      const { amount } = this.miFormulario.value;
      this.inputData.detailExpense.amount = amount;
      this.inputData.detailExpense.price =  this.miFormulario.get('price')?.value;
      this.inputData.actionSave = true;
      this.close();
    }
  }
}

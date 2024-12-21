import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainClass } from 'src/classes/mainClass';
import { ProductService } from '../../../protected/admin/product/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../css/style.css']
})
export class ProductComponent implements OnInit {

  inputData: any;
  validateField!: MainClass;
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    amount: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
    price: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
  });
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ProductComponent>,
    private service: ProductService) {
    this.validateField = new MainClass();
  }
  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.typeAction == "create") {
      return;
    }
    if (this.inputData.typeAction == 'view') {
      this.miFormulario.disable();
    }
    if (this.inputData.typeAction == 'view' || this.inputData.typeAction == 'update') {
      this.miFormulario.get('name')?.setValue(this.inputData.product.name);
      this.miFormulario.get('amount')?.setValue(this.inputData.product.amount);
      this.miFormulario.get('price')?.setValue(this.inputData.product.price);
    }
  }
  close() {
    this.ref.close(this.inputData);
  }

  save() {

    if (this.miFormulario.valid) {
      const { name, price, amount } = this.miFormulario.value;
      if (this.inputData.needService) {
        const formProduct = document.forms.namedItem('formProduct');
        const formData = new FormData(formProduct || undefined);
        formData.append('idCategory', '1');
        this.service.createProduct(formData).subscribe((resp)=>{
          if(resp.ok){
            this.inputData.product = resp.obj;
            this.inputData.actionSave = true;
            this.close();
          }else{
            Swal.fire('Error',resp.msg,'error');
          }
        })
      } else {
        this.inputData.product.name = name;
        this.inputData.product.amount = amount;
        this.inputData.product.price = price;
        this.inputData.actionSave = true;
      this.close();
      }

    }
  }
}

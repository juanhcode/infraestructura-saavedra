import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/protected/admin/customer/services/customer.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainClass } from '../../../../classes/mainClass';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../css/style.css']
})
export class CustomerComponent implements OnInit {

  inputData: any;
  editColor: boolean = false;
  createColor: boolean = false;
  verColor: boolean = false;
  validateField!: MainClass;
  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    surname: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    adress: ['', [Validators.required]],
    phoneNumber: [, [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],

  });

  constructor(private fb: FormBuilder, private service: CustomerService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<CustomerComponent>) {
    this.validateField = new MainClass();

  }
  ngOnInit(): void {
    this.inputData = this.data;

    if (this.inputData.typeAction === "create") {
      this.createColor = true;
      return;
    }
    if (this.inputData.typeAction === 'view') {
      this.verColor = true;
      this.miFormulario.disable();
    } if (this.inputData.typeAction === 'update') {
      this.editColor = true;
    }
    if (this.inputData.typeAction === 'view' || this.inputData.typeAction === 'update') {
      this.service.findCustomer(this.inputData.id).subscribe(customerSuccess => {
        if (customerSuccess.ok) {
          this.miFormulario.get('name')?.setValue(customerSuccess.obj?.name);
          this.miFormulario.get('surname')?.setValue(customerSuccess.obj?.surname);
          this.miFormulario.get('phoneNumber')?.setValue(customerSuccess.obj?.phoneNumber);
          this.miFormulario.get('adress')?.setValue(customerSuccess.obj?.adress);
        }else{
          Swal.fire('Error',customerSuccess.msg,'error');
        }
      });
    }
  }

  close() {
    this.ref.close();
  }

  save() {
    if (this.inputData.typeAction === 'update') {

      if (this.miFormulario.valid) {
        const { name, surname, adress, phoneNumber } = this.miFormulario.value;
        this.service.updateCustomer(name, surname, phoneNumber, adress, this.inputData.id).subscribe(customerSuccess => {
          if (customerSuccess.ok) {
            Swal.fire('Actualización', customerSuccess.msg, 'success');
            this.close()
          } else {
            Swal.fire('Error', customerSuccess.msg, 'error');
          }
        });
      }
    } else if (this.inputData.typeAction === 'create') {
      const { name, surname, adress, phoneNumber } = this.miFormulario.value;

      this.service.createCustomer(name, surname, phoneNumber, adress).subscribe(customerSuccess => {
        if (customerSuccess.ok) {
          Swal.fire('Guardado', customerSuccess.msg, 'success');
          this.close()
        } else {
          Swal.fire('Error', customerSuccess.msg, 'error');
        }
      });
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';
import { MainClass } from 'src/classes/mainClass';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['../css/style.css']
})
export class ImageComponent implements OnInit {
  inputData: any;
  selectedSingleFile: File | null = null;
  showIMageSelect:boolean = true;
  miFormulario: FormGroup = this.fb.group({
    alterImg: [''],
  });
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ProductComponent>) { }
  ngOnInit(): void {
    this.inputData = this.data;
    this.selectedSingleFile= this.data.selectedSingleFile;
    this.miFormulario.get('alterImg')?.setValue(this.data.img);
  }

  close() {
    this.ref.close(this.inputData);
  }
  GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    if(file){
      this.selectedSingleFile= file;
      MainClass.GetFileOnLoad(event,this.showIMageSelect,this.miFormulario);
    }
  }
  save(){
    this.inputData.selectedSingleFile = this.selectedSingleFile;
    this.inputData.save = true;
    this.inputData.img= this.miFormulario.get('alterImg')?.value;
    this.close();
  }
}

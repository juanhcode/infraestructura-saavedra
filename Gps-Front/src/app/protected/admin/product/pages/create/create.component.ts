import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductFormControl } from '../../interfaces/intergace';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { MainClass } from 'src/classes/mainClass';
import { environment } from 'src/environments/environment.prod';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../css/style.css']
})

export class CreateComponent implements OnInit {

  selectedSingleFile: File | null = null;
  selectedMultipleFiles: File[] = [];
  imageUrl:string= environment.baseURLIMG;
  viewName!: string;
  mainClass!: MainClass;
  showButtons: boolean = true;
  showIMageSelect: boolean = true;
  imagesSelected: string[] = []
  miFormulario: ProductFormControl = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    amount: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
    price: [, [Validators.required, Validators.pattern("^[0-9]+$")]],
    alterImg: [''],
    imagesSelected:[,[Validators.required]],
    imageSelected:[,[Validators.required]]
  }) as ProductFormControl;;
  constructor(private fb: FormBuilder, private service: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.mainClass = new MainClass();
  }

  ngOnInit(): void {

    this.showIMageSelect = true;
    if (this.router.url.includes('crear')) {
      this.viewName = "create"
      return;
    }
    if (this.router.url.includes('ver')) {

      this.viewName = "view"
      this.miFormulario.disable();
      this.showButtons = false;
    } else {
      this.viewName = "update"
    }

    this.activatedRoute.params.pipe(switchMap(({ id }) => this.service.findProduct(id,true)))
      .subscribe((product) => {
        this.miFormulario.get('id')?.setValue(product.obj?.id);
        this.miFormulario.get('name')?.setValue(product.obj?.name);
        this.miFormulario.get('description')?.setValue(product.obj?.description);
        this.miFormulario.get('price')?.setValue(product.obj?.price);
        this.miFormulario.get('amount')?.setValue(product.obj?.amount);
        if(product.obj?.name  && product.obj?.images){
          const urlImage = `${this.imageUrl}/${this.mainClass.deleteDiatricos(product.obj.name)}`;
          const singleImageUrl = `${urlImage}/${product.obj.image}`;
          this.miFormulario.get('alterImg')?.setValue(singleImageUrl);
          const images = product.obj?.images.split(',');
          images.forEach(element =>{
            this.imagesSelected.push(`${urlImage}/${element}`);
          });
          this.miFormulario.get('imageSelected')?.setValue(true);
          this.miFormulario.get('imagesSelected')?.setValue(true);
        }

      });
  }


  guardar() {
    if (this.miFormulario.valid) {
      const formProduct = document.forms.namedItem('formProduct');
      const formData = new FormData(formProduct || undefined);
      formData.append('idCategory', '2');
      if (this.selectedSingleFile !== null) {
        formData.append('singleFile', this.selectedSingleFile);
      }
      if (this.selectedMultipleFiles.length > 0) {
        for (const file of this.selectedMultipleFiles) {
          formData.append('multipleFiles', file);
        }
      }
      if (this.viewName === "update") {
        this.service.updateProduct(formData, this.miFormulario.get("id")?.value).subscribe(
          (res) => {
            if (res.ok) {
              Swal.fire('Actualización', res.msg, 'success');
              this.router.navigateByUrl('administrador/producto');
            } else {
              Swal.fire('Error', res.msg, 'error');
            }
          }
        )
      } else {
        this.service.createProduct(formData).subscribe(
          (res) => {
            if (res.ok) {
              Swal.fire('Guardado', res.msg, 'success');
              this.router.navigateByUrl('administrador/producto');
            } else {
              Swal.fire('Error', res.msg, 'error');
            }

          }
        );
      }
    }

  }

  cancelar() {
    this.miFormulario.reset();
    this.router.navigateByUrl('administrador/producto');
  }

  GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    if(file){
      this.selectedSingleFile= file;
      MainClass.GetFileOnLoad(event,this.showIMageSelect,this.miFormulario);
      this.miFormulario.get('imageSelected')?.setValue(true);
    }

  }

  GetFilesOnLoad(event: any){
    const files = event.target.files;
    this.imagesSelected= [];
    if(files){
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        const element = files[index]
        reader.readAsDataURL(element);
        reader.onload = (event: any) => {
         this.imagesSelected.push(event.target.result);
        }
      }
      this.selectedMultipleFiles = files;
      this.miFormulario.get('imagesSelected')?.setValue(true);
    }
  }




}

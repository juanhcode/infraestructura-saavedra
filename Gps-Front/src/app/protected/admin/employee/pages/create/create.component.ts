import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ValidateFields } from 'src/app/validations/validate-Fields';
import { MainClass } from '../../../../../../classes/mainClass';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../css/style.css']
})
export class CreateComponent implements OnInit {

  typePassword: string = 'password'
  hidePassword = true;
  showIMageSelect: boolean = true;
  selectedSingleFile: File | null = null;
  hideConfirmPassword = true;
  imageUrl:string= `${environment.baseURLIMG}/employees`;
  viewName!: string;
  validateField!: MainClass;
  showComponents: boolean = true;
  miFormulario: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.pattern("^[0-9]+$"),Validators.minLength(7), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    surname: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    adress: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
    email: ['', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    alterImg: ['']
  },
    { validators: ValidateFields.mustMath('password', 'confirmPassword') }
  );
  constructor(private fb: FormBuilder, private service: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.validateField = new MainClass();
  }

  ngOnInit(): void {
    if (this.router.url.includes('crear')) {
      this.viewName = "create"
      return;
    }
    if (this.router.url.includes('ver')) {
      this.viewName = "view"
      this.miFormulario.disable();
      this.showComponents = false;
    } else {
      this.miFormulario.get('id')?.disable();
      this.viewName = "update"
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.service.findEmployee(id)))
      .subscribe((employee) => {
        this.miFormulario.get('id')?.setValue(employee.obj?.id);
        this.miFormulario.get('name')?.setValue(employee.obj?.name);
        this.miFormulario.get('surname')?.setValue(employee.obj?.surname);
        this.miFormulario.get('phoneNumber')?.setValue(employee.obj?.phoneNumber);
        this.miFormulario.get('adress')?.setValue(employee.obj?.adress);
        this.miFormulario.get('email')?.setValue(employee.obj?.email);
        if(employee.obj?.image ){
          const urlImage = `${this.imageUrl}/${employee.obj.image}`;
          this.miFormulario.get('alterImg')?.setValue(urlImage);
        }
      });
  }


  guardar() {
    if (this.miFormulario.valid) {
      const formEmployee = document.forms.namedItem('formEmployee');
      const formData = new FormData(formEmployee || undefined);
      formData.append('idRole', '3');
      if (this.selectedSingleFile) {
        formData.append('file', this.selectedSingleFile);
      }
      if (this.viewName === "update") {
        this.service.updateEmployee(this.miFormulario.controls['id'].value, formData).subscribe(
          (res) => {
            if (res.ok) {
              Swal.fire('Actualización', res.msg, 'success');
              this.router.navigateByUrl('administrador/empleado');
            } else {
              Swal.fire('Error', res.msg, 'error');
            }
          }
        )
      } else {
        this.service.createEmployee(formData).subscribe(
          (res) => {
            if (res.ok) {
              Swal.fire('Guardado', res.msg, 'success');
              this.router.navigateByUrl('administrador/empleado');
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
    this.router.navigateByUrl('administrador/empleado');
  }

  GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    if(file){
      this.selectedSingleFile= file;
      MainClass.GetFileOnLoad(event,this.showIMageSelect,this.miFormulario);
    }
  }


}

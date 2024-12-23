import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageComponent } from 'src/app/Components/dialogs/image/image.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ValidateFields } from 'src/app/validations/validate-Fields';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls:['../../css/style.css']
})
export class ProfileMainComponent implements OnInit {

  selectedSingleFile: File | null = null;
  showComponents:boolean=false;
  viewName:string= 'update';
  imageUrl:string= `${environment.baseURLIMG}/profiles`;
  showButtonEdit:boolean=true;
  miFormulario: FormGroup = this.fb.group({
    name: ['', ],
    surname: [''],
    adress: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
    email: ['' ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    alterImg: ['']
  },
    { validators: ValidateFields.mustMath('password', 'confirmPassword') }
  );
  constructor(private fb:FormBuilder,private router:Router,private service:AuthService,private userService:ProfileService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.service.user.rol ==="empleado"){
      this.showButtonEdit = false;
    }
    this.viewName= "update";
    this.miFormulario.disable();
    this.getAtributtesFormUser();

  }


  getAtributtesFormUser(){
    this.miFormulario.get('name')?.setValue(this.user.name);
    this.miFormulario.get('surname')?.setValue(this.user.surname);
    this.miFormulario.get('phoneNumber')?.setValue(this.user.phoneNumber);
    this.miFormulario.get('adress')?.setValue(this.user.adress);
    this.miFormulario.get('email')?.setValue(this.user.email);
    if(this.user.image !==null){
      const urlImage = `${this.imageUrl}/${this.user.image}`;
      this.miFormulario.get('alterImg')?.setValue(urlImage);
    }
  }
  get user(){
    return this.service.user;
  }
  save(){
    if (this.miFormulario.valid) {
      const formUser = document.forms.namedItem('formUser');
      const formData = new FormData(formUser || undefined);
      formData.append('rol', this.user.rol! );
      formData.append('name',this.miFormulario.get('name')?.value);
      if (this.selectedSingleFile) {
        formData.append('file', this.selectedSingleFile);
      }
        this.userService.updateUser(this.user.uid!,formData).subscribe(
          (res) => {
            if (res.ok) {
              Swal.fire('Guardado', res.msg, 'success');
             this.service.logout();
             this.router.navigateByUrl('/auth');
            } else {
              Swal.fire('Error', res.msg, 'error');
            }

          }
        );

    }
  }

  cancel(){
    this.miFormulario.reset()
    this.miFormulario.get('alterImg')?.setValue('');
    this.getAtributtesFormUser()
    this.miFormulario.disable();
    this.showButtonEdit=true;
    this.showComponents=false;
  }

  openDialogProduct() {
    var _popup = this.dialog.open(ImageComponent, {
      width: '400px',
      data: {
        img: this.miFormulario.get('alterImg')?.value,
        selectedSingleFile:null,
        save:false,
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item.save === true) {
        this.selectedSingleFile= item.selectedSingleFile;
        this.miFormulario.get('alterImg')?.setValue(item.img);
      }
    })
  }
  changeImage(){
    if(this.showComponents===true){
      this.openDialogProduct();
    }

  }

  edit(){
    this.miFormulario.enable();
    this.miFormulario.get('email')?.disable();
    this.miFormulario.get('name')?.disable();
    this.miFormulario.get('surname')?.disable();
    this.showButtonEdit=false;
    this.showComponents=true;
  }
}

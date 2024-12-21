import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateFields } from 'src/app/validations/validate-Fields';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    surname: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    adress: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
    email: ['', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: ValidateFields.mustMath('password', 'confirmPassword')
  }

  )

  constructor(private fb: FormBuilder, private router: Router, private service: AuthService) {
  }

  noValidField(field: string): boolean {
    return ValidateFields.invalidField(this.miFormulario, field) || false
  }
  errorMsgField(field: string, namefield: string): string {
    return ValidateFields.errorMsg(this.noValidField(field), this.miFormulario, field, namefield);
  }

  openTermsModal() {
    Swal.fire({
      title: 'Términos y Condiciones',
      html: `
      <div style="max-height: 400px; overflow-y: auto;">
        <p>1. Introducción</p>
        <p>Al registrarte en nuestro sitio web Café Rosita, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo, por favor, no completes el registro.</p>
        <p>2. Requisitos de registro</p>
        <p>Debes ser mayor de 18 años para registrarte.</p>
        <p>Es necesario proporcionar información válida y actualizada, como tu nombre completo, dirección de correo electrónico y contraseña.</p>
        <p>Mantén tus credenciales seguras. No nos hacemos responsables de accesos no autorizados a tu cuenta por compartir tu contraseña con terceros.</p>
        <p>3. Uso de datos personales</p>
        <p>Los datos proporcionados serán tratados según nuestra Política de Privacidad.</p>
        <p>Usaremos tus datos para gestionar tu cuenta, procesar tus pedidos, y enviarte información promocional, si así lo autorizas.</p>
        <p>4. Responsabilidad del usuario</p>
        <p>Al registrarte, te comprometes a:</p>
        <ul>
          <li>No usar el sitio para actividades ilegales.</li>
          <li>Proporcionar información verdadera y mantenerla actualizada.</li>
          <li>No crear múltiples cuentas con fines fraudulentos.</li>
        </ul>
        <p>5. Derechos de la plataforma</p>
        <p>Podemos suspender o cancelar tu cuenta si violas estos términos o detectamos actividades sospechosas.</p>
        <p>Nos reservamos el derecho de realizar cambios en estos términos sin previo aviso. Cualquier cambio será publicado en nuestro sitio web.</p>
        <p>6. Propiedad intelectual</p>
        <p>Todo el contenido de Café Rosita es propiedad exclusiva de la empresa. Está prohibido el uso no autorizado.</p>
        <p>7. Resolución de conflictos</p>
        <p>Cualquier disputa relacionada con el uso del sitio web será resuelta conforme a las leyes de [tu país].</p>
        <p>8. Contacto</p>
        <p>Si tienes dudas, contáctanos en cafedecamporosita@gmail.com o al teléfono 3187957182 - 3004873227.</p>
      </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Aceptado', 'Has aceptado los términos y condiciones.', 'success');
      } else {
        Swal.fire('Cancelado', 'No has aceptado los términos y condiciones.', 'error');
      }
    });
  }

  registrar() {
    if (this.miFormulario.valid) {
      const { name, surname, adress, phoneNumber, email, password } = this.miFormulario.value
      this.service.registro(name, surname, email, password, phoneNumber, adress).subscribe((res) => {
        if (res.ok===true) {
          this.router.navigateByUrl(`${res.rol}/inicio`);
          Swal.fire('El usuario ha iniciado sesión', 'Creado Satisfactoriamente', 'success');
        }else{
          Swal.fire('Error', 'Se presento un error. contactese con el administrador', 'error');
        }
      });
    }
  }

}

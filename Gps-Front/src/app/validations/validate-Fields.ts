import { FormControl, FormGroup } from "@angular/forms";

export class ValidateFields {

  public static errorsField(form: FormGroup, field: string, nameField: string) {
    let error: string = ''
    if (form.get(field)?.errors!['required'] === true) {
      error = `${nameField} debe ser obligatorio.`
    }
    else if (form.get(field)!.errors!['pattern'] && field === 'email') {
      error = `${nameField} debe ser un correo electroníco.`
    }
    else if (form.get(field)!.errors!['pattern']) {
      if (form.get(field)!.errors!['pattern']!['requiredPattern'] == '^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ.-]+$') {
        error = `${nameField} solo debe tener letras alfabéticas.`
      }
      else if (form.get(field)!.errors!['pattern']!['requiredPattern'] === "^[0-9]+$") {
        error = `${nameField} solo debe tener numeros.`
      }

    } else if (form.get(field)!.errors!['minlength'] ) {
      error = `${nameField} debe tener como minimo ${form.get(field)!.errors!['minlength']!["requiredLength"]} digitos.`
    }
    else if (form.get(field)!.errors!['maxlength']) {
      error = `${nameField} debe tener como maximo ${form.get(field)!.errors!['maxlength']!["requiredLength"]} digitos.`
    }else if(form.get(field)!.errors!['mustMath']){
      error= `Las contraseñas no coinciden.`
    }else if(form.get(field)!.errors!['lessThanSign']){
      error= `El valor que ingresaste debe ser menor o igual a la cantidad disponible.`
    }

    return error;
  }

  public static errorMsg(noValidField: boolean, form: FormGroup, field: string, nameField: string) {
    let errorMsg: string = '';
    if (noValidField) {
      errorMsg = this.errorsField(form, field, nameField);
    }
    return errorMsg
  }

  public static invalidField(form: FormGroup, field: string) {
    return form.get(field)?.errors && (form.get(field)?.touched || form.get(field)?.dirty)
  }


  static mustMath(pass1Name: string, pass2Name: string) {
    return (form: FormControl) => {
      const control = form.get(pass1Name);
      const matchingControl = form.get(pass2Name);

      if (matchingControl?.errors && !matchingControl.errors['mustMath']) {
        return
      }

      if (control?.value !== matchingControl?.value) {
        return matchingControl?.setErrors({ mustMath: true });
      } else {
        return matchingControl?.setErrors(null);
      }
    }

  }

  static lessThanSign(pass1Name: string, pass2Name: string) {
    return (form: FormControl) => {
      const control = form.get(pass1Name);
      const matchingControl = form.get(pass2Name);

      if (matchingControl?.errors && !matchingControl.errors['lessThanSign']) {
        return
      }

      if (control?.value < matchingControl?.value) {
        return matchingControl?.setErrors({ lessThanSign: true });
      } else {
        return matchingControl?.setErrors(null);
      }
    }

  }
}

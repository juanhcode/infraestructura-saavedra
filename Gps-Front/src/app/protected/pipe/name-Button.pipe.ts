import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NameButton'
})

export class NameButtonPipe implements PipeTransform{
  transform(value: string):string {
    if(value==='create'){
      return 'Guardar'
    }
      return 'Actualizar'

  }

}

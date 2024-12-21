import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
 name: 'HeaderTable'
})

export class HeaderTable implements PipeTransform{
  transform(value: string,):string {
    if(value==='select'){
      return '';
    }
    return value;

  }


}

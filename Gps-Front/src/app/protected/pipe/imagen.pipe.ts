import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(value: string ): string {
    if (value !== '') {
      return value ;
    }
    return 'assets/no-image.png'


  }

}

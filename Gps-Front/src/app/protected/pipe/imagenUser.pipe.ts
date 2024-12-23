import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: 'imagenUser'
})
export class ImagenUserPipe implements PipeTransform {
  transform(value: string ): string {
    if (value !== '') {
      return value ;
    }
    return 'assets/user.png'


  }

}
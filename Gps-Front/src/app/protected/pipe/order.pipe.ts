import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Order'
})

export class OrderPipe implements PipeTransform{
  transform(value: number):string {
    if(value===0){
      return 'notifications'
    }
      return 'notifications_active'

  }

}

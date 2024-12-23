import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls:['../../css/style.css']
})
export class ProductHistoryComponent {
 @Input() showButtonMore:boolean= true;
 @Input() title:string= 'Nuestras historia';
 showMoreInformation:boolean = false;
}

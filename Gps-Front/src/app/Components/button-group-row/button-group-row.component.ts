import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { showButtons } from '../interface';

@Component({
  selector: 'app-button-group-row',
  templateUrl: './button-group-row.component.html',
  styleUrls:['./button-group-row.component.css']
})
export class ButtonGroupRowComponent implements OnInit{

  @Input() nameUrl:string="";
  @Input() showButtons:showButtons={updateButton:true,deleteButton:true,viewButton:true};
  @Input() id:number=0;
  @Input() useUrl!:boolean;
  @Output() catchAction:EventEmitter<string> = new EventEmitter<string>();

  typeOfSale: string = this.route.snapshot.paramMap.get('venta') || '';
  constructor(private router:Router,private service:AuthService, private route: ActivatedRoute) { }
  ngOnInit(): void {

  }

  action(action:string):void{
    if(this.useUrl){
      if( this.router.url.includes('todas') || this.router.url.includes('pendientes')){
        this.router.navigateByUrl(`${this.service.user.rol}/${this.nameUrl}/${action}/${this.id}`);
      }else{
        this.router.navigateByUrl(`${this.service.user.rol}/${this.nameUrl}/${action}/${this.id}`);
      }
    }else{
      this.catchAction.emit(action);
    }
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerComponent } from '../../../../../Components/dialogs/customer/customer.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
  ]
})
export class CreateComponent implements OnInit {

  id: string= this.route.snapshot.paramMap.get('id') ?? '';
  clickEvent = new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    if (this.router.url.includes('crear')) {
      this.openDialogCustomer("Crear Cliente","create",this.id);

    }
    if (this.router.url.includes('ver')) {
      this.openDialogCustomer("Ver Cliente", "view",this.id);

    } if(this.router.url.includes('editar')) {
      this.openDialogCustomer("Editar Cliente", "update",this.id);

    }
  }

  openDialogCustomer(title:string,typeAction:string,id:string){
    var _popup=this.dialog.open(CustomerComponent,{
      width: '400px',
      data:{
        title:title,
        typeAction:typeAction,
        id:id
      }
    });
    _popup.afterClosed().subscribe(item=>{
      this.clickEvent.emit()
      this.router.navigateByUrl('administrador/cliente');
    })
  }

}

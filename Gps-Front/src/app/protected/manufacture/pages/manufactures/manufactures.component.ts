import { Component } from '@angular/core';
import { ManufactureService } from '../../services/manufacture.service';
import { MatTableDataSource } from '@angular/material/table';
import { Manufacture } from '../../interface/interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { showButtons } from 'src/app/Components/interface';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-manufactures',
  templateUrl: './manufactures.component.html',
  styles: [
  ]
})
export class ManufacturesComponent {
  showButtonAddCrud:boolean=false;
  showButtonsTableManufacture:showButtons={updateButton:false,deleteButton:false,viewButton:true};
  listHeaderTableManufactures=['Codigo','Nombre','Fecha','Acciones'];
  propertyManufactures =['id','name','createdAt','actions'];
  dataSource= new MatTableDataSource<Manufacture>;
  constructor(private service:ManufactureService,private authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.user.rol==='empleado'){
      this.showButtonAddCrud= true;
      this.showButtonsTableManufacture={updateButton:true,deleteButton:true,viewButton:true};
    }
    this.getManufactures('');
  }


  onActive(component:any){
    const child: DeleteComponent = component;
    child.clickEvent.subscribe(() => {
      this.getManufactures('');
    });
  }

  getManufactures(search:any){
    this.service.findManufactures(search).subscribe(res=>{
      if(res.ok){
        this.dataSource.data = res.list|| [];
      }
    });
  }

  onChangesSearchManufacture(search:any){
    this.getManufactures(search.date);
  }
}

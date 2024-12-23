import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../interface/interface';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['../../../css/style.css']
})
export class SupliersComponent implements OnInit{

  listHeaderTableSuppliers=['Codigo','Nombre','Dirección','Telefono','Acciones'];
  propertySuppliers= ['id','name','adress','phoneNumber','actions'];
  dataSource= new MatTableDataSource<Supplier>;
  constructor(private service:SupplierService) { }

  ngOnInit(): void {
    this.getSuppliers('');
  }


  onActive(component:any){
    const child: DeleteComponent = component;
    child.clickEvent.subscribe(() => {
      this.getSuppliers('');
    });
  }

  getSuppliers(search:string){
    this.service.findSuppliers(search).subscribe(res=>{
      if(res.ok){
        this.dataSource.data = res.list?? [];
      }else{
        Swal.fire('Error',res.msg,'error');
      }
    });
  }

  onChangesSearchSupplier(search:any){
    this.getSuppliers(search.name);
  }
}

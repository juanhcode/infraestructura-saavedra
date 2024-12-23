import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../interfaces/interface';
import { showButtons } from 'src/app/Components/interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent {
  showButtonsTableOrder:showButtons={updateButton:true,deleteButton:false,viewButton:false};
  listHeaderTableOrders=['Codigo','Nombre Cliente','Fecha','Total precio','Acciones'];
  propertyOrders =['id','User.name.surname','createdAt','total_price','actions'];
  dataSource= new MatTableDataSource<Order>;
  constructor(private service:OrderService) { }

  ngOnInit(): void {
    this.getOrders('');
  }


  onActive(component:any){
    if(component.isDelete){
      this.getOrders('');
    }
  }

  getOrders(search:any){
    this.service.findOrders(search,['pagado'],undefined).subscribe(res=>{
      if(res.ok){
        this.dataSource.data = res.list|| [];
      }
    });
  }

  onChangesSearchOrder(search:any){
    this.getOrders(search.date);
  }
}

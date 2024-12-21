import { Component } from '@angular/core';
import { Sale } from '../../interfaces/interface';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from '../../services/sale.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [
  ]
})
export class SalesComponent {
  listHeaderTableProducts = ['Codigo','Cliente', 'estado', 'Fecha', 'Precio', 'Acciones'];
  propertyProducts = ['id','User.name.surname', 'state', 'createdAt', 'total_price', 'actions'];
  dataSource = new MatTableDataSource<Sale>;
  searchKindSale?: string | null;

  constructor(private service: SaleService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getSalesbynameCustomer({name:'',date:''});
  }

  onActive(component: any) {
    const child: DeleteComponent = component;
    child.clickEvent.subscribe(() => {
      this.getSalesbynameCustomer({name:'',date:''});
    });
  }

  getSalesbynameCustomer(search: any) {
    this.activatedRoute.params.pipe(switchMap(({ venta }) => this.service.findSales(search,venta))).subscribe(res=>{
      if(res.ok){
        this.dataSource.data = res.list|| [];
      }
    })
      ;
  }
  onChangesSearchSale(search: any) {
    this.getSalesbynameCustomer(search);
   }
}

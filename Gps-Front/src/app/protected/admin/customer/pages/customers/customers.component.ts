import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces/interface';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../../../css/style.css']
})
export class CustomersComponent implements OnInit {


  listHeaderTableCustomers = ['Código', 'Nombre', 'Apellido', 'Dirección', 'Telefono', 'Acciones'];
  propertyCustomers = ['id', 'name', 'surname', 'adress', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Customer>;
  constructor(private service: CustomerService) {
  }
  ngOnInit(): void {
    this.getCustomers('');
  }
  getCustomers(search: string) {
    this.service.findCustomers(search).subscribe(res => {
      if (res.ok) {
        this.dataSource.data = res.list ?? [];
      }else{
        Swal.fire('Error',res.msg,'error');
      }
    });
  }

  onChangesSearchCustomer(search: any) {
    this.getCustomers(search.name);
  }

  onActive(component: any) {
    const child : CreateComponent  | DeleteComponent= component;
    child.clickEvent.subscribe(()=>{
      this.getCustomers('');
    })
  }

}





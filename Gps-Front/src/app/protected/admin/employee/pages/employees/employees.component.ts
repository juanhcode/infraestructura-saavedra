import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/interface';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [
  ]
})
export class EmployeesComponent implements OnInit {

  listHeaderTableEmployees = ['identificación', 'Nombre', 'apellido', 'Telefono', 'Dirección', 'Acciones'];
  propertyEmployees = ['id', 'name', 'surname', 'phoneNumber', 'adress', 'actions'];
  dataSource = new MatTableDataSource<Employee>;
  constructor(private service: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees('');
  }

  onActive(component: any) {
    const child :  DeleteComponent= component;
    child.clickEvent.subscribe(()=>{
      this.getEmployees('');
    });
  }

  getEmployees(search: string) {
    this.service.findEmployees(search).subscribe(res => {
      if (res.ok) {
        this.dataSource.data = res.list ?? [];
      } else {
        Swal.fire('Error', res.msg, 'error')
      }
    });
  }

  onChangesSearchProduct(search: any) {
    this.getEmployees(search.name);
  }

}

import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent implements OnInit {


  clickEvent = new EventEmitter();
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
  constructor(private router: Router, private service: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Desea eliminar el empleado?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEmployee(this.id).subscribe(
          (EmployeeDeleted) => {
            if (EmployeeDeleted.ok) {
              this.clickEvent.emit();
              Swal.fire('Eliminado', EmployeeDeleted.msg, 'success');
            } else {
              Swal.fire('Error', EmployeeDeleted.msg, 'error')
            }
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Atención', 'Los cambios no han sido sido guardados.', 'info')
      }
      this.router.navigateByUrl('administrador/empleado')
    })
  }

}

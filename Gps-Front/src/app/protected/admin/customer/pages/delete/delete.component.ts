import { Component, EventEmitter, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent implements OnInit {

  clickEvent = new EventEmitter();
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
  constructor(private router: Router, private service: CustomerService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    Swal.fire({
      title: 'Desea eliminar el cliente?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCustomer(this.id).subscribe(
          (resp) => {
            if (resp.ok) {
              this.clickEvent.emit()
              Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
            }
          }
        );
      } else if (result.isDenied) {

        Swal.fire('Atención', 'Los cambios no han sido guardados.', 'info')
      }
      this.router.navigateByUrl('administrador/cliente')
    })
  }

}

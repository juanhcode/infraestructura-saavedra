import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufactureService } from '../../services/manufacture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent {
  clickEvent = new EventEmitter();
  id: string = this.route.snapshot.paramMap.get('id') || '0';
  constructor(private router: Router, private service: ManufactureService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    Swal.fire({
      title: 'Desea eliminar el la manufactura?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteManufacture(this.id).subscribe(
          (resp) => {
            if (resp.ok) {
              this.clickEvent.emit();
              Swal.fire('Eliminado', resp.msg, 'success');
            }else{
              Swal.fire('Error', resp.msg, 'error');
            }
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Atención', 'Los cambios no han sido sido guardados.', 'info')
        this.router.navigateByUrl('empleado/manufactura');
      }

    })
  }
}

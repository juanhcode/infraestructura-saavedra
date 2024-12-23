import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent implements OnInit{

  clickEvent = new EventEmitter();
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
  constructor(private router: Router, private service: SupplierService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Desea eliminar el proveedor?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteSupplier(this.id).subscribe(
          (resp) => {
            if (resp.ok) {
              this.clickEvent.emit();
              Swal.fire('Eliminado', resp.msg, 'success');
            }else{
              Swal.fire('Error', resp.msg, 'success');
            }
          }
        );

      } else if (result.isDenied) {
        Swal.fire('Atención', 'Los cambios no han sido sido guardados.', 'info')
      }
      this.router.navigateByUrl('administrador/proveedor')
    })
  }
}

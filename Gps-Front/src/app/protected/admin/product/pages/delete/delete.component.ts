import { Component, EventEmitter, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent implements OnInit {
  clickEvent = new EventEmitter();
  id: string = this.route.snapshot.paramMap.get('id') ?? '';
  constructor(private router: Router, private service: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Desea eliminar el producto?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteProduct(this.id).subscribe(
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
      }
      this.router.navigateByUrl('administrador/producto')
    })
  }

}

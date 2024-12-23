import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent {
  clickEvent = new EventEmitter();
  urlSale:string = '';
  id: string = this.route.snapshot.paramMap.get('id') || '0';
  constructor(private router: Router, private service: SaleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.router.url.includes('pendientes')){
      this.urlSale = 'pendientes'
    }else{
      this.urlSale = "todas"
    }
    Swal.fire({
      title: 'Desea eliminar la venta?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteSale(this.id).subscribe(
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
      this.router.navigateByUrl(`administrador/venta/${this.urlSale}`)
    })
  }
}

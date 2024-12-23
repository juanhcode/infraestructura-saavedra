import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/intergace';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  listHeaderTableProducts = ['Codigo', 'Nombre', 'Cantidad(g)', 'Precio', 'Acciones'];
  propertyProducts = ['id', 'name', 'amount', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>;
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.getProducts('');
  }


  onActive(component: any) {
    const child: DeleteComponent = component;
    child.clickEvent.subscribe(() => {
      this.getProducts('');
    });
  }

  getProducts(search: string) {
    this.service.findProducts(search).subscribe(res => {
      if (res.ok) {
        this.dataSource.data = res.list ?? [];
      }else{
        Swal.fire('Error',res.msg,'error');
      }
    });
  }

  onChangesSearchProduct(search: any) {
    this.getProducts(search.name);
  }
}

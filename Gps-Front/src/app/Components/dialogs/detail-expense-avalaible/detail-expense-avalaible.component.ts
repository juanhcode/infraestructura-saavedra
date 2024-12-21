import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product_Avalaible } from 'src/app/protected/manufacture/interface/interface';
import { ManufactureService } from '../../../protected/manufacture/services/manufacture.service';
import { showButtons } from '../../interface';

@Component({
  selector: 'app-detail-expense-avalaible',
  templateUrl: './detail-expense-avalaible.component.html',
  styleUrls:['../css/style.css']
})
export class DetailExpenseAvalaibleComponent implements OnInit {

  inputData:any;
  showButtonsTable:showButtons={viewButton:true,updateButton:false,deleteButton:false};
  listHeaderTableProducts = ['Condigo', 'Nombre', 'Cantidad disponible',];
  propertyProducts = ['idProduct', 'name', 'amountAvalaible'];
  dataSource = new MatTableDataSource<Product_Avalaible>;
  pageSizeOptions = [3, 5];
  constructor(private service:ManufactureService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DetailExpenseAvalaibleComponent>) {
  }
  ngOnInit(): void {
    this.inputData = this.data;
    this.service.findProductsExpenseAvalaible(this.inputData.idExpense).subscribe(
      resp=>{
        if(resp.ok==true){
          this.dataSource.data = resp.list!;
        }
      })
  }

  close() {
    this.ref.close();
  }
}

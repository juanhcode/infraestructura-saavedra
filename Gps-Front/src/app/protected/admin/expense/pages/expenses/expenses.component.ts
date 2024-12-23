import { Component, OnInit } from '@angular/core';
import { Expense } from '../../interfaces/interface';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseService } from '../../services/expense.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: [
  ],
})
export class ExpensesComponent implements OnInit {
  listHeaderTableExpenses = ['Codigo', 'Nombre', 'Fecha', 'Total precio', 'Acciones'];
  propertyExpenses = ['id', 'name', 'createdAt', 'total_price', 'actions'];
  dataSource = new MatTableDataSource<Expense>;
  constructor(private service: ExpenseService) { }

  ngOnInit(): void {
    this.getExpenses('');
  }


  onActive(component: any) {
    const child: DeleteComponent = component;
    child.clickEvent.subscribe(() => {
      this.getExpenses('');
    });
  }

  getExpenses(search: any) {
    this.service.findExpenses(search).subscribe(res => {
      if (res.ok) {
        this.dataSource.data = res.list || [];
      }
    });
  }

  onChangesSearchExpense(search: any) {
    this.getExpenses(search.date);
  }
}

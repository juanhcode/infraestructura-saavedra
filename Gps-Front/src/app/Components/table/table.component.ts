import { AfterViewInit, Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainClass } from '../../../classes/mainClass';
import { SelectionModel } from '@angular/cdk/collections';
import { showButtons } from '../interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  @Input() propertyColumns: string[] = [];
  epa:string[]=['epa','epa']
  @Input() headerColumnsName:string[]=[];
  @Input() useUrl!:boolean;
  @Input() showButtonsTable:showButtons= {deleteButton:true,updateButton:true,viewButton:true};
  @Input() nameComponent:string='';
  @Input() valueSearchTable:string='';
  @Input() data = new MatTableDataSource<any>;
  @Input() pageSizeOptions!:Array<number>;
  @Input() selection = new SelectionModel<any>(true, []);
  @Output() action: EventEmitter<object> = new EventEmitter<object>();
  @Output() getElementsSelected: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('allPaginator',{read: MatPaginator}) allPaginator!: MatPaginator;
  constructor(){

  }
  ngAfterViewInit(): void {
    this.allPaginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.allPaginator._intl.getRangeLabel = MainClass.getRangeLabel.bind(this);
    this.data.paginator = this.allPaginator;
  }

  typeAction(event:string,element:any){
    const obj={event,element}
    this.action.emit(obj);
  }

  getValue(element:any,column:string):any{
  let spliteColumProperties = column.split('.');
  if(spliteColumProperties.length===2){
    return element[spliteColumProperties[0]][spliteColumProperties[1]];
  }else if(spliteColumProperties.length>2){
    if(element[spliteColumProperties[0]] !== null){
      return `${element[spliteColumProperties[0]][spliteColumProperties[1]]} ${element[spliteColumProperties[0]][spliteColumProperties[2]]}` ;
    }else{
      return 'no hay cliente';
    }
  }
  return element[column];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.data.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  toggleAllNoRows(){
    this.getElementsSelected.emit(this.selection);
  }

  getSelected(event:any){
    this.getElementsSelected.emit(this.selection);
    event.stopPropagation();
  }
}

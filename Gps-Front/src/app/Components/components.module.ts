import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonGroupRowComponent } from './button-group-row/button-group-row.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { CrudComponent } from './crud/crud.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerComponent } from './dialogs/customer/customer.component';
import { ProductComponent } from './dialogs/product/product.component';
import { NameButtonPipe } from '../protected/pipe/name-Button.pipe';
import { OrderPipe } from '../protected/pipe/order.pipe';
import { HeaderTable } from '../protected/pipe/headerTable.pipe';
import { DetailExpenseComponent } from './dialogs/detail-expense/detail-expense.component';
import { ImagenPipe } from '../protected/pipe/imagen.pipe';
import { ImageComponent } from './dialogs/image/image.component';
import { ImagenUserPipe } from '../protected/pipe/imagenUser.pipe';
import { DetailExpenseAvalaibleComponent } from './dialogs/detail-expense-avalaible/detail-expense-avalaible.component';
import { DetailManufactureComponent } from './dialogs/detail-manufacture/detail-manufacture.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    NavComponent,
    SidebarComponent,
    ButtonGroupRowComponent,
    BreadCrumbComponent,
    CrudComponent,
    TableComponent,
    CustomerComponent,
    ProductComponent,
    NameButtonPipe,
    OrderPipe,
    HeaderTable,
    ImagenPipe,
    DetailExpenseComponent,
    ImageComponent,
    ImagenUserPipe,
    DetailExpenseAvalaibleComponent,
    DetailManufactureComponent,
    FooterComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [
    NavComponent,
    SidebarComponent,
    ButtonGroupRowComponent,
    BreadCrumbComponent,
    CrudComponent,
    TableComponent,
    NameButtonPipe,
    FooterComponent,
    ImagenPipe,
    ImagenUserPipe
  ]
})
export class ComponentsModule { }

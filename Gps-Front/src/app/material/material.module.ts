import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    MatNativeDateModule
  ],
  exports: [
    MatSidenavModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatToolbarModule,
    MatStepperModule,
    MatBadgeModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatListModule
  ]

})
export class MaterialModule { }

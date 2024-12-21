import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchObject } from 'src/app/Components/crud/interface/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { showButtons } from '../interface';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  @Input() showButtonAdd:boolean=true;
  @Input() searchName: string = '';
  @Input() propertyColumns: string[] = [];
  @Input() showButtonsTableCrud:showButtons={updateButton:true,deleteButton:true,viewButton:true};
  @Input() headerColumnsName: string[] = []
  @Input() dataTable: MatTableDataSource<any>;
  @Input() showSearchDate: boolean = false;
  @Input() showSearchFieldName:boolean = true;
  @Input() nameComponent: string = "";
  @Output() valueSearch = new EventEmitter<SearchObject>();
  pageSizeOptions = [5, 10, 15, 20];
  miFormulario: FormGroup = this.fb.group({
    name: [''],
    date: []
  });

  constructor(private router: Router, private fb: FormBuilder,private service:AuthService) {
    this.dataTable = new MatTableDataSource(new Array());
    
  }


  ngOnInit(): void {

  }

  add() {
    this.router.navigateByUrl(`${this.service.user.rol}/${this.nameComponent}/crear`)
  }

  downloadPdf() {
    console.log('presionar 1');

    // Create a new PDF document.
    const doc = new jsPDF();

    // Add content to the PDF.
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.text(`Reporte ${this.nameComponent}s Café Rosita`,93,20);
    doc.setFontSize(12);
    doc.text(
      `Este documento presenta un reporte detallado de ${this.nameComponent}s.`,
      80,
      35,
    );

    // Create a table using jspdf-autotable.
    const headers = [this.headerColumnsName.slice(0, -1)];
    let valueDataTable = this.dataTable.data.map((value) => {
      let addDataTableValues = [];
      for (let prop in value) {
        addDataTableValues.push(value[prop]);
      }
      return addDataTableValues;
    });

    autoTable(doc, {
      head: headers,
      body: valueDataTable,
      startY: 60,
      headStyles: {
        fillColor: [22, 160, 133],  // Color de fondo (RGB)
        textColor: [255, 255, 255], // Color del texto (blanco)
        fontStyle: 'bold',          // Texto en negritas
      },
      
      // Estilo para el cuerpo
      bodyStyles: {
        fillColor: [240, 240, 240],  // Color de fondo para las filas
        textColor: [0, 0, 0],        // Color del texto (negro)
      },
      
      // Estilo alternativo para filas (striped rows)
      alternateRowStyles: {
        fillColor: [255, 255, 255],  // Fondo blanco para las filas alternas
      },
      
      // Estilo de los bordes
      tableLineColor: [0, 0, 0],     // Color de los bordes de la tabla
      tableLineWidth: 0.1,  
    });
    // Add image to the PDF.
    const logo = new Image();
    logo.src = '/assets//logo_cafe_rosita.png';
    
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 17, 10, 57, 35);
      doc.save('Reporte.pdf');
    };
    logo.onerror = () => {
      console.error('Error al cargar la imagen');
    };
  }

  onChangesSearch() {
    if (this.isValidDate(this.miFormulario.get('date')?.value)) {
      this.valueSearch.emit({ name: this.miFormulario.get('name')?.value, date: this.miFormulario.get('date')?.value });
    } else {
      this.miFormulario.get('date')?.setValue('');
      this.valueSearch.emit({ name: this.miFormulario.get('name')?.value, date: this.miFormulario.get('date')?.value });
    }
  }

  isValidDate(date: any) {
    return date instanceof Date && !isNaN(Number(date));
  }





}

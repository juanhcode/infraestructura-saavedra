import { FormGroup } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { Moment } from "moment";
import { ValidateFields } from "src/app/validations/validate-Fields";

export class MainClass {

  constructor() {

  }

   deleteDiatricos(text:string) {
    let textWithOutSpace = this.deleteSpace(text);
    let textWithOutSign = this.changeSignImage(textWithOutSpace);
    return textWithOutSign.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }

  deleteSpace(text:string){
    
    return text.replace(/\s+/g,"");
  }

  changeSignName(text:string){
   return  text.replace(/-/g, "/");
  }

  changeSignImage(text:string){
    return text.replace(/\//g, "-");
  }

  chosenYearHandler(date:any,normalizedYear: Moment) {
    const ctrlValue = date.value;
    ctrlValue?.year(normalizedYear.year());
    date.setValue(ctrlValue);
  }

  chosenMonthHandler(date:any,normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = date.value;
    ctrlValue?.month(normalizedMonth.month());
    date.setValue(ctrlValue);
    datepicker.close();
  }

  noValidField(field: string, form: FormGroup): boolean {
    return ValidateFields.invalidField(form, field) || false
  }
  errorMsgField(field: string, namefield: string, form: FormGroup): string {
    return ValidateFields.errorMsg(this.noValidField(field, form), form, field, namefield);
  }

  static getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

  static GetFileOnLoad(event: any, showIMageSelect: boolean, form: FormGroup) {
    const file = event.target.files[0];
    if (file) {
      if (file) {
        showIMageSelect = false;
        this.convertFile(file, form, showIMageSelect);

      }
    }
  }

  static dateFormat(date: Date): string {
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return `${day}/${month + 1}/${year}`;
  }
  static convertFile(file: any, form: FormGroup, showIMageSelect: boolean) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      form.controls['alterImg'].setValue(event.target.result);
      showIMageSelect = true;
    }
  }

}

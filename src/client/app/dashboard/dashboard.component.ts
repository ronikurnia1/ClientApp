import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare const fabric: any;
/**
 * This class represents the DashbosrdComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  model = new DataForm(new Date(2016, 11, 4), "Roni Kurniawan");
  submitted: boolean = false;

  picker: any;

  constructor(private elementRef: ElementRef) {
    //this.dateValue 
  }

  displayConfig(event: any) {
    // let config = JSON.parse(localStorage.getItem("appConfig")) || {};
    // let sections: any[] = config.navigations;
    // sections.forEach(itm => alert(itm.displayName));
  }

  ngAfterViewInit() {
    let datePicker = this.elementRef.nativeElement.querySelectorAll(".ms-DatePicker");
    for (var i = 0; i < datePicker.length; i++) {
      this.picker = new fabric['DatePicker'](datePicker[i]);
    }
    //this.picker.picker.set('select', [2016, 1, 20]);

    let buttons = this.elementRef.nativeElement.querySelectorAll(".ms-Button");
    for (var i = 0; i < buttons.length; i++) {
      new fabric['Button'](buttons[i]);
    }
  }


  onSubmit() {
    this.model.dateValue = this.picker.picker.get();
    this.submitted = true;
    console.log("DateValue:", this.model.dateValue);
    console.log("TestValue:", this.model.textValue);
  }


}


export class DataForm {
  constructor(public dateValue: Date, public textValue: string) { }
}

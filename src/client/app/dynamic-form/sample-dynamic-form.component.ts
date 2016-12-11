import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormDataService } from './form-data.service';
declare const fabric: any;


@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'sample-dynamic-form.component.html',
    styleUrls: ['sample-dynamic-form.component.css'],
    providers: [FormDataService]
})
export class SampleDynamicFormComponent implements AfterViewInit {
    title = 'Sample dynamic form works!';
    fields: any[];
    datePicker: any;
    
    constructor(private service: FormDataService, private elementRef: ElementRef) {
        this.fields = service.getFields({});
    }

    ngAfterViewInit() {

        let TextFieldElements = this.elementRef.nativeElement.querySelectorAll(".ms-TextField");
        for (var i = 0; i < TextFieldElements.length; i++) {
            new fabric['TextField'](TextFieldElements[i]);
        }

        let ButtonElements = this.elementRef.nativeElement.querySelectorAll(".ms-Button");
        for (var i = 0; i < ButtonElements.length; i++) {
            new fabric['Button'](ButtonElements[i], function () {
                // Insert Event Here
            });
        }

        let DropdownElements = this.elementRef.nativeElement.querySelectorAll('.ms-Dropdown');
        for (var i = 0; i < DropdownElements.length; ++i) {
            var Dropdown = new fabric['Dropdown'](DropdownElements[i]);
        }


        let datePicker = this.elementRef.nativeElement.querySelectorAll(".ms-DatePicker");
        for (var i = 0; i < datePicker.length; i++) {
            this.datePicker = new fabric['DatePicker'](datePicker[i]);
        }

    }
}
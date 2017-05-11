import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-input',
    template: ``
})
export class FormHiddenInputComponent extends FormField implements AfterViewInit {

    constructor(private viewContainer: ViewContainerRef) {
        super();
    }

    ngAfterViewInit() {
        // Textbox
        // let textFieldElements = this.viewContainer.element.nativeElement.querySelector(".ms-TextField");
        // new fabric["TextField"](textFieldElements);
    }


}
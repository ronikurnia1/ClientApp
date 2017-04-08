import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-input',
    template: `
<div class="ms-CheckBox ms-TextField" [formGroup]="group">
    <input type="checkbox" class="ms-CheckBox-input" [id]="field.key" [formControlName]="field.name">
    <label role="checkbox" class="ms-CheckBox-field" [class.is-checked]="field.value" [attr.aria-checked]="field.value">
        <span class="ms-Label">{{field.label}}</span>
    </label>
</div>
    `
})
export class FormCheckBoxComponent extends FormField implements AfterViewInit {

    constructor(private viewContainer: ViewContainerRef) {
        super();
    }

    ngAfterViewInit() {
        // Checkbox
        let rawCheckBox = this.viewContainer.element.nativeElement.querySelector(".ms-CheckBox");
        new fabric['CheckBox'](rawCheckBox);
    }


}
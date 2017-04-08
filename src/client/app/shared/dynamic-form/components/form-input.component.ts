import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-input',
    template: `
<div class="ms-TextField" [formGroup]="group">
    <label class="ms-Label" [class.is-required]="required" [attr.for]="field.key">{{field.label}}</label>
    <input [formControlName]="field.name" [id]="field.key" [attr.placeholder]="field.placeholder" class="ms-TextField-field">
</div>
<div *ngIf="invalid" class="ms-TextField-description">{{field.label}} is required</div>
    `
})
export class FormInputComponent extends FormField implements AfterViewInit {

    constructor(private viewContainer: ViewContainerRef) {
        super();
    }

    ngAfterViewInit() {
        // Textbox
        let textFieldElements = this.viewContainer.element.nativeElement.querySelector(".ms-TextField");
        new fabric["TextField"](textFieldElements);
    }


}
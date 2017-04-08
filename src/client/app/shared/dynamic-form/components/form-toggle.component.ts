import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-input',
    template: `
<div class="ms-Toggle ms-TextField" [formGroup]="group">
    <span class="ms-Toggle-description">{{field.label}}</span>
    <input type="checkbox" [id]="field.key" [formControlName]="field.name" class="ms-Toggle-input" />
    <label [attr.for]="field.key" class="ms-Toggle-field" [class.is-selected]="field.value">
        <span class="ms-Label ms-Label--off">Off</span>
        <span class="ms-Label ms-Label--on">On</span>
    </label>
</div>
    `
})
export class FormToggleComponent extends FormField implements AfterViewInit {

    constructor(private viewContainer: ViewContainerRef) {
        super();
    }

    ngAfterViewInit() {
        // Toggle
        let toggleElements = this.viewContainer.element.nativeElement.querySelector(".ms-Toggle");
        new fabric['Toggle'](toggleElements);
    }


}
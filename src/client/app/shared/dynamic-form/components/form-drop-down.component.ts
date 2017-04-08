import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-select',
    template: `
<div class="ms-Dropdown ms-TextField" [class.zero-margin-bottom]="invalid" tabindex="0" [formGroup]="group">
    <label class="ms-Label" [class.is-required]="required" [attr.for]="field.key">{{field.label}}</label>
    <i class="ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown"></i>
    <select class="ms-Dropdown-select" [id]="field.key" [formControlName]="field.name">
        <option value="">{{ field.placeholder }}</option>
        <option *ngFor="let opt of field.options" [value]="opt.key" [attr.selected]="opt.selected">{{opt.value}}</option>
    </select>
</div>
<div *ngIf="invalid" class="ms-TextField-description margin-bottom-8px">{{field.label}} is required</div>
    `
})
export class FormDropDownComponent extends FormField implements AfterViewInit {

    constructor(private viewContainer: ViewContainerRef) {
        super()
    }

    ngAfterViewInit() {
        // Dropdown
        let rawDropdown = this.viewContainer.element.nativeElement.querySelector(".ms-Dropdown");
        new fabric["Dropdown"](rawDropdown);
    }


}
import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-input',
    template: `
<div class="ms-ChoiceFieldGroup" [id]="field.key" role="radiogroup">
    <div class="ms-ChoiceFieldGroup-title ms-TextField">
        <label class="ms-Label" [class.is-required]="required">{{field.label}}</label>
    </div>
    <ul class="ms-ChoiceFieldGroup-list">
        <div *ngFor="let opt of field.options" class="ms-RadioButton">
            <input tabindex="-1" [value]="opt.key" type="radio" class="ms-RadioButton-input">
            <label role="radio" class="ms-RadioButton-field" tabindex="0" aria-checked="false" [attr.name]="field.key">
                <span class="ms-Label">{{opt.value}}</span>                    
            </label>
        </div>
    </ul>
</div>
    `
})
export class FormRadioButtonComponent extends FormField implements AfterViewInit {

    constructor(private viewContainer: ViewContainerRef) {
        super();
    }

    ngAfterViewInit() {
        // Radiobutton
        let choiceFieldGroupElements = this.viewContainer.element.nativeElement.querySelector(".ms-ChoiceFieldGroup");
        let choiceFiledGroup = new fabric['ChoiceFieldGroup'](choiceFieldGroupElements, (value: string) => {
            // console.log("Selected:", value);
            this.group.controls[this.field.name].setValue(value);
        });
        choiceFiledGroup.setValue(this.group.controls[this.field.name].value);
    }


}
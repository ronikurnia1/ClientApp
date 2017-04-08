import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";

@Component({
    selector: 'form-button',
    template: `
<div [formGroup]="group">
    <button [disabled]="field.disabled" type="submit" class="ms-Button ms-Button--primary">
        <span class="ms-Button-label">{{field.label}}</span>
    </button>
</div>
    `
})
export class FormButtonComponent extends FormField { }

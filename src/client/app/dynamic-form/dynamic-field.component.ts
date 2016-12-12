import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';

@Component({
    moduleId: module.id,
    selector: 'dynamic-field',
    templateUrl: 'dynamic-field.component.html',
    styleUrls: ['dynamic-field.component.css']
})
export class DynamicFieldComponent {
    @Input() field: FieldBase<any>;
    @Input() form: FormGroup;
    @Input() submitted: boolean;

    get invalid() {
        return (!this.form.controls[this.field.key].valid && !this.form.controls[this.field.key].pristine) || 
        (!this.form.controls[this.field.key].valid && this.submitted) || (!this.form.controls[this.field.key].valid && 
        this.form.controls[this.field.key].dirty)
    }
}

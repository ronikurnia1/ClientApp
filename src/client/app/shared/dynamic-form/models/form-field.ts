import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Field } from './field.interface';

export class FormField {
    field: Field;
    group: FormGroup;

    get required(): boolean {
        if (!this.field || !this.field.validation) return false;
        let requiredValidations = this.field.validation.some(v => v == Validators.required);
        return requiredValidations;
    }

    get invalid() {
        if (!this.group) return false;
        return (!this.group.controls[this.field.name].valid && !this.group.controls[this.field.name].pristine) || (!this.group.controls[this.field.name].valid &&
            this.group.controls[this.field.name].dirty)
    }


}

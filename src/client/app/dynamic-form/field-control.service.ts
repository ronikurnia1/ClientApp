import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase, IFieldBaseOption } from './field-base';

@Injectable()
export class FieldControlService {

    constructor() { }

    toControlGroup(fields: FieldBase<any>[]) {
        let group: IFieldBaseOption<any> = {};
        fields.forEach(field => {
            group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                : new FormControl(field.value || '');
        });
        return new FormGroup(group);
    }
}
import { Injectable } from '@angular/core';
import { FieldDropdown } from './field-dropdown';
import { FieldBase } from './field-base';
import { FieldTextbox } from './field-textbox';
import { FieldDatepicker } from './field-datepicker';

@Injectable()
export class FormDataService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getFields(dataModel: any) {
    let fields: FieldBase<any>[] = [
      new FieldTextbox({
        key: 'username',
        label: 'Name',
        required: false,
        value: dataModel.username,
        placeholder: 'Username',
        order: 1
      }),

      new FieldTextbox({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        value: dataModel.email,
        placeholder: 'Email',
        order: 2
      }),

      new FieldDropdown({
        key: 'gender',
        label: 'Gender',
        options: [
          { key: 'male', value: 'male' },
          { key: 'female', value: 'female' },
          { key: 'shemale', value: 'shemale' }
        ],
        value: dataModel.gender,
        order: 3
      }),

      new FieldDatepicker({
        key: 'birthdate',
        label: 'Birthdate',
        type: 'date',
        required: false,
        value: dataModel.birthdate,
        placeholder: 'Birthdate',
        order: 4
      }),
    ];
    return fields.sort((a, b) => a.order - b.order);
  }
}

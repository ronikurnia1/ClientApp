import { FieldBase, IFieldBaseOption } from './field-base';

export class FieldCheckbox extends FieldBase<boolean>{
  controlType = 'checkbox';

  constructor(options: IFieldBaseOption<boolean> = {}) {
    super(options);
    this.required = false;
  }
}



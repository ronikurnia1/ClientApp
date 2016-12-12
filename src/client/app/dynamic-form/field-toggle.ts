import { FieldBase, IFieldBaseOption } from './field-base';

export class FieldToggle extends FieldBase<boolean>{
  controlType = 'toggle';

  constructor(options: IFieldBaseOption<boolean> = {}) {
    super(options);
    this.required = false;
  }
}



import { FieldBase, IFieldBaseOption } from './field-base';

export class FieldRadiobutton extends FieldBase<string>{
  controlType = 'radiobutton';
  options: {key: string, value: string }[] = [];

  constructor(options: IFieldBaseOption<string> = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}



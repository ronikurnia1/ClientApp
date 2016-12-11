import { FieldBase, IFieldBaseOption } from './field-base';

export class FieldDatepicker extends FieldBase<string>{
  controlType = 'datepicker';
  type: string;

  constructor(options: IFieldBaseOption<string> = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}



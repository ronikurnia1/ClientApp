import { FieldBase, IFieldBaseOption } from './field-base';

export class FieldTextbox extends FieldBase<string>{
  controlType = 'textbox';
  type: string;

  constructor(options: IFieldBaseOption<string> = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}



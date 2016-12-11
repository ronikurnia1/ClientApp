
export class FieldBase<T>{
    value: T;
    key: string;
    label: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    order: number;
    controlType: string;
    placeholder: string;
    constructor(options: IFieldBaseOption<T> = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.readonly = !!options.readonly;
        this.disabled = !!options.disabled;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.placeholder = options.placeholder || '';
    }
}

export interface IFieldBaseOption<T> {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    readonly?: boolean,
    disabled?: boolean,
    order?: number,
    controlType?: string,
    placeholder?: string,
    [type: string]: any
}
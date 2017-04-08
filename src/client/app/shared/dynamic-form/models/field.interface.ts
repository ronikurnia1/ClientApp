import { ValidatorFn } from '@angular/forms';

export interface Field {
    key: string,
    name: string,
    type: string,
    label: string,
    order: number,
    value?: any
    disabled?: boolean,
    readonly?: boolean,
    options?: { key: string, value: string, selected: boolean }[],
    placeholder?: string,
    validation?: ValidatorFn[]
}

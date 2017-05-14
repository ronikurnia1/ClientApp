import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from './components/form-button.component';
import { FormInputComponent } from './components/form-input.component';
import { FormDropDownComponent } from './components/form-drop-down.component';
import { FormDatePickerComponent } from './components/form-date-picker.component';
import { FormCheckBoxComponent } from './components/form-check-box.component';
import { FormRadioButtonComponent } from './components/form-radio-button.component';
import { FormToggleComponent } from './components/form-toggle.component';
import { FormHiddenInputComponent } from './components/form-hidden-input.component';
import { FormPasswordComponent } from './components/form-password.component';

import { Field } from './models/field.interface';
import { FormField } from './models/form-field';

const components: { [type: string]: Type<FormField> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  dropdown: FormDropDownComponent,
  datepicker: FormDatePickerComponent,
  checkbox: FormCheckBoxComponent,
  radiobutton: FormRadioButtonComponent,
  toggle: FormToggleComponent,
  hiddenInput: FormHiddenInputComponent,
  password: FormPasswordComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements FormField, OnChanges, OnInit {
  @Input()
  field: Field;

  @Input()
  group: FormGroup;

  component: ComponentRef<FormField>;

  required: boolean;
  invalid: boolean;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.field.type]) {
      let supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.field.type}).
        Supported types: ${supportedTypes}`
      );
    }
    let component = this.resolver.resolveComponentFactory<FormField>(components[this.field.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}

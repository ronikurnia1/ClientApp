import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormButtonComponent } from './components/form-button.component';
import { FormInputComponent } from './components/form-input.component';
import { FormDropDownComponent } from './components/form-drop-down.component';
import { FormDatePickerComponent } from './components/form-date-picker.component';
import { FormCheckBoxComponent } from './components/form-check-box.component';
import { FormRadioButtonComponent } from './components/form-radio-button.component';
import { FormToggleComponent } from './components/form-toggle.component';
import { FormHiddenInputComponent } from './components/form-hidden-input.component';
import { FormPasswordComponent } from './components/form-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormDropDownComponent,
    FormDatePickerComponent,
    FormCheckBoxComponent,
    FormRadioButtonComponent,
    FormToggleComponent,
    FormHiddenInputComponent,
    FormPasswordComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormDropDownComponent,
    FormDatePickerComponent,
    FormCheckBoxComponent,
    FormRadioButtonComponent,
    FormToggleComponent,
    FormHiddenInputComponent,
    FormPasswordComponent
  ]
})
export class DynamicFormModule { }

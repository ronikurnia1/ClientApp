import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SampleDynamicFormComponent } from './sample-dynamic-form.component';
import { SampleDynamicFormRoutingModule } from './sample-dynamic-form-routing.module';
import { DynamicFieldComponent } from './dynamic-field.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { FieldControlService } from './field-control.service';
import { FormDataService } from './form-data.service';


@NgModule({
  imports: [CommonModule, SampleDynamicFormRoutingModule, ReactiveFormsModule],
  declarations: [SampleDynamicFormComponent, DynamicFormComponent, DynamicFieldComponent],
  exports: [SampleDynamicFormComponent, DynamicFormComponent, DynamicFieldComponent]
})
export class SampleDynamicFormModule { }

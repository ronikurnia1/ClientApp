import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormSampleComponent } from "./dynamic-form-sample.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DynamicFormSampleComponent}
    ])
  ],
  exports: [RouterModule]
})
export class DynamicFormSampleRoutingModule { }

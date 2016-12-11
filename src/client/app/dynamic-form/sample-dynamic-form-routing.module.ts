import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SampleDynamicFormComponent } from './sample-dynamic-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SampleDynamicFormComponent}
    ])
  ],
  exports: [RouterModule]
})
export class SampleDynamicFormRoutingModule { }

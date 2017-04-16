import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DynamicFormModule } from "../shared/dynamic-form/dynamic-form.module";

@NgModule({
  imports: [AdminRoutingModule, DynamicFormModule],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { DynamicFormModule } from "../../shared/dynamic-form/dynamic-form.module";

@NgModule({
  imports: [UserDetailsRoutingModule, CommonModule, FormsModule, DynamicFormModule],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent]
})
export class UserDetailsModule { }

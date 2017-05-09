import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccessGroupDetailsComponent } from './access-group-details.component';
import { AccessGroupDetailsRoutingModule } from './access-group-details-routing.module';
import { ThreeviewCheckboxComponent } from './threeview-checkbox/threeview-checkbox.component';

@NgModule({
  imports: [AccessGroupDetailsRoutingModule, CommonModule, FormsModule],
  declarations: [AccessGroupDetailsComponent, ThreeviewCheckboxComponent],
  exports: [AccessGroupDetailsComponent, ThreeviewCheckboxComponent]
})
export class AccessGroupDetailsModule { }

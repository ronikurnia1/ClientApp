import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessGroupComponent } from './access-group.component';
import { AccessGroupRoutingModule } from './access-group-routing.module';

@NgModule({
  imports: [AccessGroupRoutingModule, CommonModule],
  declarations: [AccessGroupComponent],
  exports: [AccessGroupComponent]
})
export class AccessGroupModule { }

import { NgModule } from '@angular/core';
import { ForbiddenComponent } from './forbidden.component';
import { ForbiddenRoutingModule } from './forbidden-routing.module';

@NgModule({
  imports: [ForbiddenRoutingModule],
  declarations: [ForbiddenComponent],
  exports: [ForbiddenComponent]
})
export class ForbiddenModule { }

import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [AdminRoutingModule],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }

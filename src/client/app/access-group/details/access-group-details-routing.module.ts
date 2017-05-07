import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessGroupDetailsComponent } from './access-group-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AccessGroupDetailsComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AccessGroupDetailsRoutingModule { }

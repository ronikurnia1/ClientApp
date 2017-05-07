import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessGroupComponent } from './access-group.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AccessGroupComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AccessGroupRoutingModule { }

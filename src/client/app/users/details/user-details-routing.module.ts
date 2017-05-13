import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: UserDetailsComponent}
    ])
  ],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }

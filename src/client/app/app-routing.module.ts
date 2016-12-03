import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthCheckerService } from './shared/auth-checker/index';


@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'admin', loadChildren: './app/admin/admin.module#AdminModule', canActivate: [AuthCheckerService] },
      { path: 'about', loadChildren: './app/about/about.module#AboutModule', canActivate: [AuthCheckerService] }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


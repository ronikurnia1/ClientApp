import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthCheckerService } from '../shared/auth-checker/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home', component: HomeComponent, canActivate: [AuthCheckerService],
        children: [
          { path: '', loadChildren: './app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthCheckerService] },
          { path: 'admin', loadChildren: './app/admin/admin.module#AdminModule', canActivate: [AuthCheckerService] },
          { path: 'about', loadChildren: './app/about/about.module#AboutModule', canActivate: [AuthCheckerService] },
          { path: 'transaction/reactive-dynamic-form', loadChildren: './app/reactive-dynamic-form/dynamic-form-sample.module#DynamicFormSampleModule', canActivate: [AuthCheckerService] },
          { path: 'transaction/a', loadChildren: './app/transactions/transaction-a/transaction-a.module#TransactionAModule', canActivate: [AuthCheckerService] },
          { path: 'transaction/b', loadChildren: './app/transactions/transaction-b/transaction-b.module#TransactionBModule', canActivate: [AuthCheckerService] },
          { path: 'transaction/c', loadChildren: './app/transactions/transaction-c/transaction-c.module#TransactionCModule', canActivate: [AuthCheckerService] },
          { path: 'transaction/dynamic-form', loadChildren: './app/dynamic-form/sample-dynamic-form.module#SampleDynamicFormModule', canActivate: [AuthCheckerService] },

          { path: 'settings/access-groups', loadChildren: './app/access-group/access-group.module#AccessGroupModule', canActivate: [AuthCheckerService] },
          { path: 'settings/access-groups/:id', loadChildren: './app/access-group/details/access-group-details.module#AccessGroupDetailsModule', canActivate: [AuthCheckerService] },

          { path: 'settings/users', loadChildren: './app/users/users.module#UsersModule', canActivate: [AuthCheckerService] },
          { path: 'settings/users/:id', loadChildren: './app/users/details/user-details.module#UserDetailsModule', canActivate: [AuthCheckerService] },

          { path: 'unauthorized', loadChildren: './app/unauthorized/unauthorized.module#UnauthorizedModule' },
          { path: 'page-not-found', loadChildren: './app/not-found/not-found.module#NotFoundModule' },
          { path: '**', redirectTo: 'page-not-found' }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

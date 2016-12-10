import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionAComponent } from './transaction-a.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TransactionAComponent}
    ])
  ],
  exports: [RouterModule]
})
export class TransactionARoutingModule { }

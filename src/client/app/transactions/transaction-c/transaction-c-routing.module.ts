import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionCComponent } from './transaction-c.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TransactionCComponent}
    ])
  ],
  exports: [RouterModule]
})
export class TransactionCRoutingModule { }

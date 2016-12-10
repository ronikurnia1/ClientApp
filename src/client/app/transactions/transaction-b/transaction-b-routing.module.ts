import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionBComponent } from './transaction-b.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TransactionBComponent}
    ])
  ],
  exports: [RouterModule]
})
export class TransactionBRoutingModule { }

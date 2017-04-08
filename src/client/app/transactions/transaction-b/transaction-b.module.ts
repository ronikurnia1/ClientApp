import { NgModule } from '@angular/core';
import { TransactionBComponent } from './transaction-b.component';
import { TransactionBRoutingModule } from './transaction-b-routing.module';

@NgModule({
  imports: [TransactionBRoutingModule],
  declarations: [TransactionBComponent],
  exports: [TransactionBComponent]
})
export class TransactionBModule { }

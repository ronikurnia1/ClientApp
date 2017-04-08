import { NgModule } from '@angular/core';
import { TransactionCComponent } from './transaction-c.component';
import { TransactionCRoutingModule } from './transaction-c-routing.module';

@NgModule({
  imports: [TransactionCRoutingModule],
  declarations: [TransactionCComponent],
  exports: [TransactionCComponent]
})
export class TransactionCModule { }

import { NgModule } from '@angular/core';
import { TransactionAComponent } from './transaction-a.component';
import { TransactionARoutingModule } from './transaction-a-routing.module';

@NgModule({
  imports: [TransactionARoutingModule],
  declarations: [TransactionAComponent],
  exports: [TransactionAComponent]
})
export class TransactionAModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionAComponent } from './transaction-a.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TransactionARoutingModule } from './transaction-a-routing.module';

@NgModule({
  imports: [CommonModule, Ng2SmartTableModule, TransactionARoutingModule],
  declarations: [TransactionAComponent],
  exports: [TransactionAComponent]
})
export class TransactionAModule {
  
}

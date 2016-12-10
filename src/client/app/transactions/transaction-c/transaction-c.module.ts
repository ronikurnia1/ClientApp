import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCComponent } from './transaction-c.component';
import { TransactionCRoutingModule } from './transaction-c-routing.module';

@NgModule({
  imports: [CommonModule, TransactionCRoutingModule],
  declarations: [TransactionCComponent],
  exports: [TransactionCComponent]
})
export class TransactionCModule { }

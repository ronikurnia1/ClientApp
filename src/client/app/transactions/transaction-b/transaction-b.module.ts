import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionBComponent } from './transaction-b.component';
import { TransactionBRoutingModule } from './transaction-b-routing.module';

@NgModule({
  imports: [CommonModule, TransactionBRoutingModule],
  declarations: [TransactionBComponent],
  exports: [TransactionBComponent]
})
export class TransactionBModule { }

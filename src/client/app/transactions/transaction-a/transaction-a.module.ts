import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionAComponent } from './transaction-a.component';
import { TransactionARoutingModule } from './transaction-a-routing.module';

@NgModule({
  imports: [CommonModule, TransactionARoutingModule],
  declarations: [TransactionAComponent],
  exports: [TransactionAComponent]
})
export class TransactionAModule { }

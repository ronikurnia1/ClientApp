import { Component } from '@angular/core';

/**
 * This class represents the TransactionBComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'transaction-b.component.html',
  styleUrls: ['transaction-b.component.css']
})
export class TransactionBComponent {

  displayConfig(event: any) {
    let config = JSON.parse(localStorage.getItem("appConfig")) || {};
    let sections: any[] = config.moduleGroups;
    sections.forEach(itm => alert(itm.displayName));
  }
}

import { Component } from '@angular/core';

/**
 * This class represents the TransactionAComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'transaction-c.component.html',
  styleUrls: ['transaction-c.component.css']
})
export class TransactionCComponent {

  displayConfig(event: any) {
    let config = JSON.parse(localStorage.getItem("appConfig")) || {};
    let sections: any[] = config.moduleGroups;
    sections.forEach(itm => alert(itm.displayName));
  }
}

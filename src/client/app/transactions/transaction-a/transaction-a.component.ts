import { Component } from '@angular/core';

/**
 * This class represents the TransactionAComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'transaction-a.component.html',
  styleUrls: ['transaction-a.component.css']
})
export class TransactionAComponent {

  displayConfig(event: any) {
    let config = JSON.parse(localStorage.getItem("appConfig")) || {};
    let sections: any[] = config.moduleGroups;
    sections.forEach(itm => alert(itm.displayName));
  }
}
